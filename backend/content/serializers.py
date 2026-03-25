from rest_framework import serializers
from .models import Service, Product, FAQ, Testimonial


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    submitted_by_username = serializers.SerializerMethodField()
    published_by_username = serializers.SerializerMethodField()
    rating = serializers.DecimalField(max_digits=3, decimal_places=1, coerce_to_string=False, required=False)
    reviews = serializers.IntegerField(required=False, default=0)
    order = serializers.IntegerField(required=False, default=0)
    is_active = serializers.BooleanField(required=False, default=True)
    is_published = serializers.BooleanField(required=False, default=False)
    description = serializers.CharField(required=False, allow_blank=True, default="")

    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['submitted_by', 'published_by', 'submitted_by_username', 'published_by_username']

    def get_submitted_by_username(self, obj):
        return obj.submitted_by.username if obj.submitted_by else None

    def get_published_by_username(self, obj):
        return obj.published_by.username if obj.published_by else None


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'
