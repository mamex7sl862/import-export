"""
URL configuration for tradeflow_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import api_root, admin_login
from django.http import JsonResponse

def home_view(request):
    """Root endpoint"""
    return JsonResponse({
        'service': 'TradeFlow API',
        'status': 'running',
        'version': '1.0.0',
        'message': 'Welcome to TradeFlow Import/Export API',
        'endpoints': {
            'api': '/api/',
            'admin': '/admin/',
            'blog': '/api/blog/posts/',
            'quotes': '/api/quotes/',
            'contacts': '/api/contacts/messages/',
        },
        'frontend': 'https://tradeflow-import-export.vercel.app',
        'documentation': 'Visit /api/ for detailed API documentation'
    })

# Customize admin site
admin.site.site_header = "TradeFlow Administration"
admin.site.site_title = "TradeFlow Admin Portal"
admin.site.index_title = "Welcome to TradeFlow Admin Dashboard"

urlpatterns = [
    path('', home_view, name='home'),
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/blog/', include('blog.urls')),
    path('api/quotes/', include('quotes.urls')),
    path('api/contacts/', include('contacts.urls')),
    path('api/admin-panel/login/', admin_login, name='admin-login'),
    path('api/settings/', include('settings_manager.urls')),
    path('api/content/', include('content.urls')),
]
