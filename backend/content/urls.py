from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet, ProductViewSet, FAQViewSet, TestimonialViewSet

router = DefaultRouter()
router.register('services', ServiceViewSet, basename='service')
router.register('products', ProductViewSet, basename='product')
router.register('faqs', FAQViewSet, basename='faq')
router.register('testimonials', TestimonialViewSet, basename='testimonial')

urlpatterns = router.urls
