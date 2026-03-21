from django.db import models


class SiteSettings(models.Model):
    # Company Info
    company_name = models.CharField(max_length=200, default='TradeFlow')
    company_tagline = models.CharField(max_length=300, default='Global Trade, Simplified.')
    company_description = models.TextField(default='Expert Import-Export solutions connecting your business to the world\'s most lucrative markets.')
    company_email = models.EmailField(default='hello@tradehub.com')
    company_phone = models.CharField(max_length=50, default='+251 991 001 124')
    company_address = models.CharField(max_length=300, default='123 Trade Street, New York, NY 10001')

    # Hero Section
    hero_badge_text = models.CharField(max_length=200, default='TRUSTED BY 2,000+ GLOBAL ENTERPRISES')
    hero_title = models.CharField(max_length=200, default='Global Trade,')
    hero_title_highlight = models.CharField(max_length=200, default='Simplified.')
    hero_subtitle = models.TextField(default='Expert Import-Export solutions connecting your business to the world\'s most lucrative markets.')

    # Stats
    stat_years = models.CharField(max_length=20, default='15+')
    stat_countries = models.CharField(max_length=20, default='50+')
    stat_shipments = models.CharField(max_length=20, default='10K+')

    # About Page
    about_title = models.CharField(max_length=200, default='Your Trusted Partner in Global Commerce')
    about_description = models.TextField(default='For over two decades, we\'ve been eliminating the complexity of international trade, helping businesses expand globally with confidence.')
    about_story = models.TextField(default='TradeFlow was founded with a simple mission: make international trade accessible to businesses of all sizes.')

    # Contact Info
    contact_email = models.EmailField(default='info@globalexports.com')
    contact_phone = models.CharField(max_length=50, default='+2519 11867911')
    contact_address = models.CharField(max_length=300, default='123 Trade Street, New York, NY 10001')
    working_hours = models.CharField(max_length=200, default='Mon-Fri, 9 AM - 6 PM')

    # Social Media
    facebook_url = models.URLField(blank=True, default='https://facebook.com')
    twitter_url = models.URLField(blank=True, default='https://twitter.com')
    linkedin_url = models.URLField(blank=True, default='https://linkedin.com')
    instagram_url = models.URLField(blank=True, default='https://instagram.com')

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site Settings'
        verbose_name_plural = 'Site Settings'

    def __str__(self):
        return f'Site Settings (updated {self.updated_at})'

    @classmethod
    def get_settings(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj
