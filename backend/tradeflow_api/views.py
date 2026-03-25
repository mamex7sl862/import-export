from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET'])
def api_root(request, format=None):
    """
    API Root - Welcome endpoint with links to all available endpoints
    """
    return Response({
        'message': 'Welcome to TradeFlow API',
        'version': '1.0',
        'endpoints': {
            'blog': {
                'posts': request.build_absolute_uri('/api/blog/posts/'),
                'featured_posts': request.build_absolute_uri('/api/blog/posts/featured/'),
                'categories': request.build_absolute_uri('/api/blog/categories/'),
            },
            'quotes': {
                'list_create': request.build_absolute_uri('/api/quotes/'),
            },
            'contacts': {
                'messages': request.build_absolute_uri('/api/contacts/messages/'),
                'newsletter': request.build_absolute_uri('/api/contacts/newsletter/'),
            },
            'admin': request.build_absolute_uri('/admin/'),
        },
        'documentation': {
            'blog_posts': 'GET /api/blog/posts/ - List all blog posts',
            'blog_post_detail': 'GET /api/blog/posts/{slug}/ - Get single post',
            'featured_posts': 'GET /api/blog/posts/featured/ - Get featured posts',
            'categories': 'GET /api/blog/categories/ - List categories',
            'submit_quote': 'POST /api/quotes/ - Submit quote request',
            'submit_contact': 'POST /api/contacts/messages/ - Submit contact message',
            'subscribe_newsletter': 'POST /api/contacts/newsletter/ - Subscribe to newsletter',
        }
    })


from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
try:
    from staff.models import StaffProfile as _SP
except Exception:
    _SP = None


@api_view(['POST'])
def admin_login(request):
    """Custom admin panel login — returns role for RBAC"""
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user and user.is_active and (user.is_staff or user.is_superuser):
        token, _ = Token.objects.get_or_create(user=user)

        # Determine role
        role = "superadmin"
        if not user.is_superuser:
            try:
                role = user.staff_profile.role
            except Exception:
                role = "import_staff"

        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_staff': user.is_staff,
                'is_superuser': user.is_superuser,
                'role': role,
            }
        })
    return Response(
        {'error': 'Invalid credentials or account is inactive'},
        status=status.HTTP_401_UNAUTHORIZED
    )
