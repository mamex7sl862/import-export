"""
Django settings for tradeflow_api project.
"""

from pathlib import Path
import os
import dj_database_url
from decouple import config, Csv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY', default='django-insecure-qzs8ah_dw-4gd@48zwl&euu%cru_=&d1)dqok19)zod!p)3a&j')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default='False') == 'True'

ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1').split(',')

# Add Railway and Vercel domains
if os.environ.get('RAILWAY_ENVIRONMENT'):
    ALLOWED_HOSTS.append('.railway.app')
if os.environ.get('VERCEL'):
    ALLOWED_HOSTS.append('.vercel.app')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party apps
    'rest_framework',
    'corsheaders',
    'django_filters',
    
    # Local apps
    'blog',
    'quotes',
    'contacts',
    'settings_manager',
    'content',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add WhiteNoise
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CSRF exemption for API endpoints
CSRF_COOKIE_SECURE = False
CSRF_COOKIE_HTTPONLY = False
CSRF_USE_SESSIONS = False

ROOT_URLCONF = 'tradeflow_api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'tradeflow_api.wsgi.application'


# Database
# Use DATABASE_URL (production/Render) > MYSQL_HOST (local MySQL) > SQLite fallback
_database_url = config('DATABASE_URL', default='')
_mysql_host = config('MYSQL_HOST', default='')

if _database_url:
    DATABASES = {
        'default': dj_database_url.config(
            default=_database_url,
            conn_max_age=600,
        )
    }
elif _mysql_host:
    _mysql_options = {'charset': 'utf8mb4'}
    # Only require SSL in production (not local dev)
    if not DEBUG:
        _mysql_options['ssl'] = {'ssl-mode': 'REQUIRED'}
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': config('MYSQL_DATABASE', default='tradeflow'),
            'USER': config('MYSQL_USER', default='root'),
            'PASSWORD': config('MYSQL_PASSWORD', default=''),
            'HOST': _mysql_host,
            'PORT': config('MYSQL_PORT', default='3306'),
            'OPTIONS': _mysql_options,
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS Settings
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:5173,http://localhost:5174,http://localhost:3000'
).split(',')

# Always include the Vercel frontend
CORS_ALLOWED_ORIGINS += [
    'https://tradeflow-import-export.vercel.app',
]

# Add any extra frontend URL from env
_frontend_url = config('FRONTEND_URL', default='')
if _frontend_url:
    CORS_ALLOWED_ORIGINS.append(_frontend_url)

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    'DELETE', 'GET', 'OPTIONS', 'PATCH', 'POST', 'PUT',
]
CORS_ALLOW_HEADERS = [
    'accept', 'accept-encoding', 'authorization',
    'content-type', 'dnt', 'origin', 'user-agent',
    'x-csrftoken', 'x-requested-with',
]

# CSRF Settings
CSRF_TRUSTED_ORIGINS = CORS_ALLOWED_ORIGINS.copy()

# Add https versions for production
if not DEBUG:
    CSRF_TRUSTED_ORIGINS = [
        origin.replace('http://', 'https://') if origin.startswith('http://') else origin
        for origin in CSRF_TRUSTED_ORIGINS
    ]

# REST Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [],
}
