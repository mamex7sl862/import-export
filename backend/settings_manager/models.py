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

    # ── Trust Bar (Home) ──────────────────────────────────────────────────────
    trust_bar_badge = models.TextField(default='TRUSTED BY INDUSTRY LEADERS')
    trust_bar_title = models.TextField(default='Certified & Compliant Across All Major Trade Corridors')
    trust_bar_statement = models.TextField(default='Our certifications ensure your cargo moves safely, legally, and efficiently through every checkpoint, customs office, and border crossing worldwide.')
    cert1_name = models.TextField(default='ISO 9001:2015')
    cert2_name = models.TextField(default='AEO Certified')
    cert3_name = models.TextField(default='IATA Member')
    cert4_name = models.TextField(default='C-TPAT Verified')
    cert5_name = models.TextField(default='5-Star Rating')
    cert6_name = models.TextField(default='FMC Licensed')

    # ── Featured Services (Home) ──────────────────────────────────────────────
    featured_services_badge = models.TextField(default='CORE SERVICES')
    featured_services_title = models.TextField(default='Everything You Need for Global Trade Success')
    featured_services_subtitle = models.TextField(default='From initial planning to final delivery, our comprehensive suite of services ensures your international trade operations run seamlessly.')
    fs1_title = models.TextField(default='Global Logistics')
    fs1_desc = models.TextField(default='End-to-end supply chain management with real-time tracking across air, sea, and land transportation networks.')
    fs1_f1 = models.TextField(default='Multi-modal shipping')
    fs1_f2 = models.TextField(default='Real-time tracking')
    fs1_f3 = models.TextField(default='Global network')
    fs2_title = models.TextField(default='Customs Clearance')
    fs2_desc = models.TextField(default='Expert documentation and regulatory compliance services to ensure smooth passage through international borders.')
    fs2_f1 = models.TextField(default='Expert documentation')
    fs2_f2 = models.TextField(default='Regulatory compliance')
    fs2_f3 = models.TextField(default='Fast processing')
    fs3_title = models.TextField(default='Supply Chain Management')
    fs3_desc = models.TextField(default='Strategic optimization and analytics to maximize efficiency, reduce costs, and improve delivery performance.')
    fs3_f1 = models.TextField(default='Cost optimization')
    fs3_f2 = models.TextField(default='Performance analytics')
    fs3_f3 = models.TextField(default='Strategic planning')

    # ── Home About Section ────────────────────────────────────────────────────
    home_about_badge = models.TextField(default='Your Global Trade Partner')
    home_about_section_title = models.TextField(default='For Modern Business')
    home_about_inner_title = models.TextField(default='Turning Trade Complexity Into Your Competitive Edge')
    home_about_highlight1 = models.TextField(default='ISO 9001 & 14001 Certified Operations')
    home_about_highlight2 = models.TextField(default='AEO & C-TPAT Trusted Partner Status')
    home_about_highlight3 = models.TextField(default='Real-time Shipment Tracking & Visibility')
    home_about_highlight4 = models.TextField(default='Customs Clearance in 150+ Countries')
    home_about_feat1_title = models.TextField(default='Compliance Excellence')
    home_about_feat1_desc = models.TextField(default='Navigate regulations across 150+ countries with confidence')
    home_about_feat2_title = models.TextField(default='Growth Focused')
    home_about_feat2_desc = models.TextField(default='Scale operations without operational bottlenecks')
    home_about_feat3_title = models.TextField(default='24/7 Support')
    home_about_feat3_desc = models.TextField(default='Expert guidance from dedicated trade specialists')
    home_about_cta_title = models.TextField(default='Ready to Expand Your Global Reach?')
    home_about_cta_subtitle = models.TextField(default='Join hundreds of companies who trust us to handle their international trade operations.')
    home_about_cta_btn = models.TextField(default='Get Started Today')

    # ── Impact Stats Quote ────────────────────────────────────────────────────
    impact_quote = models.TextField(default='"Every shipment represents a business dream, a market opportunity, and economic growth. We\'re proud to be the bridge that makes global commerce possible."')
    impact_quote_author = models.TextField(default='— TradeFlow Leadership Team')

    # ── Testimonials Section ──────────────────────────────────────────────────
    testimonial_badge = models.TextField(default='CLIENT SUCCESS STORIES')
    testimonial_title = models.TextField(default='Trusted by Global Leaders')
    testimonial_subtitle = models.TextField(default='See what our enterprise clients say about their experience')

    # ── Blog Page ─────────────────────────────────────────────────────────────
    blog_hero_badge = models.TextField(default='Insights & Resources')
    blog_hero_title = models.TextField(default='Trade Intelligence & Industry Insights')
    blog_hero_subtitle = models.TextField(default='Expert perspectives on global trade, logistics innovation, and market trends')
    blog_cta_title = models.TextField(default='Ready to Optimize Your Trade Operations?')
    blog_cta_subtitle = models.TextField(default="Let our experts help you navigate global commerce with confidence")

    # ── Contact Page Extra ────────────────────────────────────────────────────
    contact_hours_weekday = models.TextField(default='9 AM - 6 PM')
    contact_hours_sat = models.TextField(default='10 AM - 4 PM')
    contact_hours_sun = models.TextField(default='Closed')
    contact_stat1_title = models.TextField(default='50+ Countries')
    contact_stat1_desc = models.TextField(default='Served worldwide')
    contact_stat2_title = models.TextField(default='24/7 Support')
    contact_stat2_desc = models.TextField(default='Always here to help')
    contact_stat3_title = models.TextField(default='Expert Team')
    contact_stat3_desc = models.TextField(default='10+ years experience')

    # ── Footer ────────────────────────────────────────────────────────────────
    footer_tagline = models.TextField(default='Your trusted partner in global logistics. Connecting businesses worldwide with seamless import-export solutions.')

    # ── Social Media ──────────────────────────────────────────────────────────
    facebook_url = models.CharField(max_length=300, blank=True, default='https://facebook.com')
    twitter_url = models.CharField(max_length=300, blank=True, default='https://twitter.com')
    linkedin_url = models.CharField(max_length=300, blank=True, default='https://linkedin.com')
    instagram_url = models.CharField(max_length=300, blank=True, default='https://instagram.com')

    # ── Google Map ────────────────────────────────────────────────────────────
    google_map_url = models.TextField(default='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.304185416782!2d38.7469643!3d9.0301872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8530b1f5c7b1%3A0x4b7b63e0718f6a6f!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1701532145678!5m2!1sen!2sus')

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
