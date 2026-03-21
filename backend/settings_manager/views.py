from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import SiteSettings
from .serializers import SiteSettingsSerializer


@api_view(['GET'])
def get_settings(request):
    settings = SiteSettings.get_settings()
    serializer = SiteSettingsSerializer(settings)
    return Response(serializer.data)


@api_view(['PATCH'])
def update_settings(request):
    # Simple token check
    auth = request.headers.get('Authorization', '')
    if not auth.startswith('Bearer '):
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

    settings = SiteSettings.get_settings()
    serializer = SiteSettingsSerializer(settings, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
