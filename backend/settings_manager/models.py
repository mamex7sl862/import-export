from django.db import models


class SiteSettings(models.Model):
    # ── Company Info ──────────────────────────────────────────────────────────
    company_name = models.CharField(max_length=200, default='TradeFlow')
    company_tagline = models.CharField(max_length=300, default='Global Trade, Simplified.')
    company_description = models.TextField(default='Expert Import-Export solutions connecting your business to the world\'s most lucrative markets.')
    company_email = models.CharField(max_length=200, default='hello@tradehub.com')
    company_phone = models.CharField(max_length=50, default='+251 991 001 124')
    company_address = models.CharField(max_length=300, default='Addis Ababa, Ethiopia')

    # ── Hero Section ──────────────────────────────────────────────────────────
    hero_badge_text = models.CharField(max_length=200, default='TRUSTED BY 2,000+ GLOBAL ENTERPRISES')
    hero_title = models.CharField(max_length=200, default='Global Trade,')
    hero_title_highlight = models.CharField(max_length=200, default='Simplified.')
    hero_subtitle = models.TextField(default='Expert Import-Export solutions connecting your business to the world\'s most lucrative markets.')
    hero_cta_primary = models.CharField(max_length=100, default='Request a Quote')
    hero_cta_secondary = models.CharField(max_length=100, default='Our Products')

    # ── Stats ─────────────────────────────────────────────────────────────────
    stat_years = models.CharField(max_length=20, default='15+')
    stat_years_label = models.CharField(max_length=50, default='Years Experience')
    stat_countries = models.CharField(max_length=20, default='50+')
    stat_countries_label = models.CharField(max_length=50, default='Countries Served')
    stat_shipments = models.CharField(max_length=20, default='10K+')
    stat_shipments_label = models.CharField(max_length=50, default='Shipments Delivered')
    stat_success_rate = models.CharField(max_length=20, default='99.8%')
    stat_success_label = models.CharField(max_length=50, default='Success Rate')

    # ── About Page ────────────────────────────────────────────────────────────
    about_title = models.CharField(max_length=200, default='Your Trusted Partner in Global Commerce')
    about_description = models.TextField(default='For over two decades, we\'ve been eliminating the complexity of international trade, helping businesses expand globally with confidence.')
    about_story = models.TextField(default='TradeFlow was founded with a simple mission: make international trade accessible to businesses of all sizes.')
    about_commitment = models.TextField(default='We\'re committed to transparency, reliability, and building long-term partnerships that drive mutual success.')
    about_founded_text = models.CharField(max_length=200, default='Trusted by Fortune 500 Companies')
    about_founded_sub = models.CharField(max_length=200, default='Delivering excellence in global trade since 2004')
    about_story_image = models.CharField(max_length=500, default='/global-trade-shipping-containers.jpg')

    # ── About Values ──────────────────────────────────────────────────────────
    value1_title = models.CharField(max_length=100, default='Customer First')
    value1_desc = models.TextField(default='Your success is our priority. We tailor solutions to meet your unique needs.')
    value2_title = models.CharField(max_length=100, default='Integrity')
    value2_desc = models.TextField(default='Transparent operations and ethical practices in every transaction.')
    value3_title = models.CharField(max_length=100, default='Innovation')
    value3_desc = models.TextField(default='Leveraging technology to streamline global trade operations.')
    value4_title = models.CharField(max_length=100, default='Excellence')
    value4_desc = models.TextField(default='Committed to delivering exceptional service quality every time.')

    # ── About Milestones ──────────────────────────────────────────────────────
    milestone1_year = models.CharField(max_length=20, default='2004')
    milestone1_title = models.CharField(max_length=100, default='Company Founded')
    milestone1_desc = models.TextField(default='Started with a vision to simplify global trade')
    milestone2_year = models.CharField(max_length=20, default='2010')
    milestone2_title = models.CharField(max_length=100, default='Global Expansion')
    milestone2_desc = models.TextField(default='Extended services to 50+ countries')
    milestone3_year = models.CharField(max_length=20, default='2015')
    milestone3_title = models.CharField(max_length=100, default='Technology Integration')
    milestone3_desc = models.TextField(default='Launched real-time tracking platform')
    milestone4_year = models.CharField(max_length=20, default='2020')
    milestone4_title = models.CharField(max_length=100, default='Industry Leader')
    milestone4_desc = models.TextField(default='Recognized as top logistics provider')
    milestone5_year = models.CharField(max_length=20, default='2024')
    milestone5_title = models.CharField(max_length=100, default='Sustainable Future')
    milestone5_desc = models.TextField(default='Committed to eco-friendly operations')

    # ── About Features (Why Choose Us) ────────────────────────────────────────
    feature1_title = models.CharField(max_length=100, default='Global Network')
    feature1_desc = models.TextField(default='Strategic partnerships across 150+ countries for seamless operations')
    feature2_title = models.CharField(max_length=100, default='Compliance Expertise')
    feature2_desc = models.TextField(default='ISO certified with full regulatory compliance in all markets')
    feature3_title = models.CharField(max_length=100, default='Growth Partner')
    feature3_desc = models.TextField(default='Scalable solutions that grow with your business needs')
    feature4_title = models.CharField(max_length=100, default='Dedicated Support')
    feature4_desc = models.TextField(default='24/7 expert assistance from your personal trade specialists')

    # ── About CTA ─────────────────────────────────────────────────────────────
    about_cta_title = models.CharField(max_length=200, default='Ready to Go Global?')
    about_cta_subtitle = models.TextField(default="Let's discuss how we can help your business expand into new markets with confidence and ease.")
    about_cta_primary = models.CharField(max_length=100, default='Schedule Consultation')
    about_cta_secondary = models.CharField(max_length=100, default='View Services')
    about_values_title = models.CharField(max_length=200, default='Our Core Values')
    about_values_subtitle = models.TextField(default='The principles that guide everything we do')
    about_journey_title = models.CharField(max_length=200, default='Our Journey')
    about_journey_subtitle = models.TextField(default='Key milestones in our growth story')

    # ── Services Section ──────────────────────────────────────────────────────
    services_title = models.CharField(max_length=200, default='Our Services')
    services_subtitle = models.TextField(default='Comprehensive import-export solutions designed to streamline your global trade operations')

    # ── Products Section ──────────────────────────────────────────────────────
    products_title = models.CharField(max_length=200, default='Premium Import Solutions')
    products_subtitle = models.TextField(default='Discover our curated selection of high-quality products from trusted global suppliers')
    products_badge = models.CharField(max_length=100, default='PRODUCT CATALOG')

    # ── Quote Form Section ────────────────────────────────────────────────────
    quote_title = models.CharField(max_length=200, default='Request a Custom Quote')
    quote_subtitle = models.TextField(default='Get a personalized shipping quote tailored to your specific needs. Our logistics experts will analyze your requirements and provide competitive pricing within 24 hours.')
    quote_badge = models.CharField(max_length=100, default='Get Started')

    # ── Contact Info ──────────────────────────────────────────────────────────
    contact_email = models.CharField(max_length=200, default='info@globalexports.com')
    contact_phone = models.CharField(max_length=50, default='+251 991 001 124')
    contact_address = models.CharField(max_length=300, default='Addis Ababa, Ethiopia')
    working_hours = models.CharField(max_length=200, default='Mon-Fri, 9 AM - 6 PM')
    working_hours_sat = models.CharField(max_length=100, default='10 AM - 4 PM')

    # ── Page Headers ─────────────────────────────────────────────────────────
    about_page_badge = models.CharField(max_length=100, default='Our Story')
    about_page_title = models.CharField(max_length=200, default='About Us')
    about_page_subtitle = models.TextField(default='At TradeFlow, we specialize in connecting businesses across the globe. With years of experience in import and export, we pride ourselves on delivering reliable, efficient, and transparent services.')

    services_page_badge = models.CharField(max_length=100, default='Our Offerings')
    services_page_title = models.CharField(max_length=200, default='Services & Products')
    services_page_subtitle = models.TextField(default='We provide comprehensive import and export solutions tailored to your business needs. From seamless international shipping to customs clearance, we ensure your goods reach their destination safely.')

    contact_page_badge = models.CharField(max_length=100, default='Contact Us')
    contact_page_title = models.CharField(max_length=200, default='Get in Touch')
    contact_page_subtitle = models.TextField(default="We're here to help with your import and export needs. Reach out to our team and we'll get back to you within 24 hours.")

    blog_page_badge = models.CharField(max_length=100, default='Insights & Updates')
    blog_page_title = models.CharField(max_length=200, default='Our Blog')
    blog_page_subtitle = models.TextField(default='Stay updated with the latest insights, trends, and tips in global trade and logistics. Our blog covers everything from import/export regulations to industry news.')

    # ── Footer ────────────────────────────────────────────────────────────────
    footer_tagline = models.TextField(default='Your trusted partner in global logistics. Connecting businesses worldwide with seamless import-export solutions.')

    # ── Social Media ──────────────────────────────────────────────────────────
    facebook_url = models.CharField(max_length=300, blank=True, default='https://facebook.com')
    twitter_url = models.CharField(max_length=300, blank=True, default='https://twitter.com')
    linkedin_url = models.CharField(max_length=300, blank=True, default='https://linkedin.com')
    instagram_url = models.CharField(max_length=300, blank=True, default='https://instagram.com')

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
