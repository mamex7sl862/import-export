from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Service, Product, FAQ, Testimonial
from .serializers import ServiceSerializer, ProductSerializer, FAQSerializer, TestimonialSerializer


def get_user_role(user):
    """Return the role string for a user, or None if anonymous."""
    if not user or not user.is_authenticated:
        return None
    if user.is_superuser:
        return 'superadmin'
    try:
        return user.staff_profile.role
    except Exception:
        return 'import_staff'


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return super().get_permissions()

    def get_queryset(self):
        if self.request.user and self.request.user.is_staff:
            return Service.objects.all()
        return Service.objects.filter(is_active=True)


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return super().get_permissions()

    def get_queryset(self):
        user = self.request.user
        role = get_user_role(user)

        # Public / frontend — only published & active
        if not role:
            qs = Product.objects.filter(is_active=True, is_published=True)
        # Import staff — only their category (all statuses so they can see their submissions)
        elif role == 'import_staff':
            qs = Product.objects.filter(category='import')
        # Export staff — only their category
        elif role == 'export_staff':
            qs = Product.objects.filter(category='export')
        # Import manager — import products (all statuses)
        elif role == 'import_manager':
            qs = Product.objects.filter(category='import')
        # Export manager — export products (all statuses)
        elif role == 'export_manager':
            qs = Product.objects.filter(category='export')
        # Superadmin — everything
        else:
            qs = Product.objects.all()

        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category=category)
        return qs

    def perform_create(self, serializer):
        user = self.request.user
        role = get_user_role(user)

        # Determine category lock for staff
        if role == 'import_staff':
            serializer.save(category='import', submitted_by=user, is_published=False)
        elif role == 'export_staff':
            serializer.save(category='export', submitted_by=user, is_published=False)
        else:
            # Managers and superadmin can set category freely
            serializer.save(submitted_by=user)

    def perform_update(self, serializer):
        user = self.request.user
        role = get_user_role(user)

        # Staff cannot change category or publish status
        if role in ('import_staff', 'export_staff'):
            serializer.save(is_published=serializer.instance.is_published,
                            published_by=serializer.instance.published_by)
        else:
            # Manager publishing: record who published
            data = serializer.validated_data
            if data.get('is_published') and not serializer.instance.is_published:
                serializer.save(published_by=user)
            elif not data.get('is_published', True):
                serializer.save(published_by=None)
            else:
                serializer.save()

    def create(self, request, *args, **kwargs):
        user = request.user
        role = get_user_role(user)

        # Staff can only create in their category
        if role == 'import_staff' and request.data.get('category') == 'export':
            return Response({'error': 'Import staff can only add import products.'}, status=403)
        if role == 'export_staff' and request.data.get('category') == 'import':
            return Response({'error': 'Export staff can only add export products.'}, status=403)

        # Import manager can only manage import products
        if role == 'import_manager' and request.data.get('category') == 'export':
            return Response({'error': 'Import managers can only manage import products.'}, status=403)
        if role == 'export_manager' and request.data.get('category') == 'import':
            return Response({'error': 'Export managers can only manage export products.'}, status=403)

        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        user = request.user
        role = get_user_role(user)
        instance = self.get_object()

        # Staff cannot publish
        if role in ('import_staff', 'export_staff') and 'is_published' in request.data:
            return Response({'error': 'Staff cannot publish products. Submit for manager review.'}, status=403)

        # Manager can only publish their category
        if role == 'import_manager' and instance.category == 'export':
            return Response({'error': 'Import managers can only manage import products.'}, status=403)
        if role == 'export_manager' and instance.category == 'import':
            return Response({'error': 'Export managers can only manage export products.'}, status=403)

        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        user = request.user
        role = get_user_role(user)
        instance = self.get_object()

        # Staff can only delete their own unpublished submissions
        if role in ('import_staff', 'export_staff'):
            if instance.submitted_by != user:
                return Response({'error': 'You can only delete your own submissions.'}, status=403)
            if instance.is_published:
                return Response({'error': 'Cannot delete a published product.'}, status=403)

        return super().destroy(request, *args, **kwargs)


class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return super().get_permissions()

    def get_queryset(self):
        if self.request.user and self.request.user.is_staff:
            return FAQ.objects.all()
        return FAQ.objects.filter(is_active=True)


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return super().get_permissions()

    def get_queryset(self):
        if self.request.user and self.request.user.is_staff:
            return Testimonial.objects.all()
        return Testimonial.objects.filter(is_active=True)
