from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Service, Product, FAQ, Testimonial
from .serializers import ServiceSerializer, ProductSerializer, FAQSerializer, TestimonialSerializer


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
        qs = Product.objects.all() if (self.request.user and self.request.user.is_staff) else Product.objects.filter(is_active=True)
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category=category)
        return qs


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
