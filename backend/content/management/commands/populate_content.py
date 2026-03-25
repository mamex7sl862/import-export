from django.core.management.base import BaseCommand
from content.models import Service, Product, FAQ, Testimonial


class Command(BaseCommand):
    help = 'Populate content with default data'

    def handle(self, *args, **kwargs):
        self._services()
        self._products()
        self._faqs()
        self._testimonials()
        self.stdout.write(self.style.SUCCESS('Content populated successfully!'))

    def _services(self):
        if Service.objects.exists():
            self.stdout.write('Services already exist, skipping.')
            return
        services = [
            {'title': 'International Shipping', 'description': 'Reliable sea, air, and land freight solutions connecting you to over 50 countries worldwide with real-time tracking.', 'icon': 'Ship', 'features': ['Sea Freight', 'Air Freight', 'Land Transport', 'Express Delivery'], 'color': 'from-blue-500 to-cyan-500', 'order': 1},
            {'title': 'Customs Clearance', 'description': 'Expert handling of all customs documentation, tariff classification, and regulatory compliance to ensure smooth border crossings.', 'icon': 'FileCheck', 'features': ['Documentation', 'Tariff Classification', 'Duty Calculation', 'Compliance'], 'color': 'from-[#D4AF37] to-yellow-600', 'order': 2},
            {'title': 'Warehousing & Storage', 'description': 'Secure, climate-controlled storage facilities with inventory management and distribution services at strategic locations.', 'icon': 'Package', 'features': ['Climate Control', 'Inventory Management', 'Pick & Pack', 'Distribution'], 'color': 'from-purple-500 to-pink-500', 'order': 3},
            {'title': 'Cargo Insurance', 'description': 'Comprehensive insurance coverage protecting your shipments against loss, damage, and unforeseen circumstances during transit.', 'icon': 'Shield', 'features': ['Full Coverage', 'Claims Support', 'Risk Assessment', 'Quick Processing'], 'color': 'from-green-500 to-emerald-500', 'order': 4},
            {'title': 'Trade Consulting', 'description': 'Expert guidance on international trade regulations, market entry strategies, and business expansion opportunities.', 'icon': 'Globe2', 'features': ['Market Research', 'Regulatory Advice', 'Strategy Planning', 'Risk Management'], 'color': 'from-indigo-500 to-blue-600', 'order': 5},
            {'title': 'Door-to-Door Delivery', 'description': 'Complete logistics solution from pickup at origin to final delivery at destination with full tracking visibility.', 'icon': 'Truck', 'features': ['Pickup Service', 'Last Mile Delivery', 'Real-time Tracking', 'Signature Confirmation'], 'color': 'from-orange-500 to-red-500', 'order': 6},
        ]
        for s in services:
            Service.objects.create(**s)
        self.stdout.write(f'Created {len(services)} services.')

    def _products(self):
        if Product.objects.exists():
            self.stdout.write('Products already exist, skipping.')
            return
        products = [
            {'name': 'Smartphone Components', 'description': 'High-quality semiconductor and display components from Asia', 'image': '/smartphone-components-circuit-boards.jpg', 'category': 'import', 'type': 'Electronics', 'price': 'Starting from $5,000', 'rating': 4.8, 'reviews': 245, 'order': 1},
            {'name': 'Premium Fabrics', 'description': 'Cotton, silk, and synthetic fabrics from Indian mills', 'image': '/cotton-apparel-clothing-garments-fashion.jpg', 'category': 'import', 'type': 'Textiles', 'price': 'Starting from $2,000', 'rating': 4.7, 'reviews': 189, 'order': 2},
            {'name': 'Industrial Equipment', 'description': 'CNC machines and manufacturing equipment from Germany and Japan', 'image': '/industrial-machinery-equipment-factory.jpg', 'category': 'import', 'type': 'Machinery', 'price': 'Starting from $50,000', 'rating': 4.9, 'reviews': 156, 'order': 3},
            {'name': 'Chemical Compounds', 'description': 'Industrial chemicals and raw materials from certified suppliers', 'image': '/chemical-compounds-laboratory-containers.jpg', 'category': 'import', 'type': 'Chemicals', 'price': 'Starting from $3,000', 'rating': 4.6, 'reviews': 127, 'order': 4},
            {'name': 'Raw Metals', 'description': 'Aluminum, copper, and steel ingots from mines', 'image': '/global-trade-shipping-containers.jpg', 'category': 'import', 'type': 'Metals', 'price': 'Starting from $10,000', 'rating': 4.8, 'reviews': 198, 'order': 5},
            {'name': 'Plastic Resins', 'description': 'Virgin and recycled plastic pellets for manufacturing', 'image': '/logistics-warehouse-management.jpg', 'category': 'import', 'type': 'Plastics', 'price': 'Starting from $1,500', 'rating': 4.5, 'reviews': 134, 'order': 6},
            {'name': 'Organic Coffee Beans', 'description': 'Premium arabica and robusta coffee from certified plantations', 'image': '/organic-coffee-beans-roasted.jpg', 'category': 'export', 'type': 'Agriculture', 'price': 'Starting from $8,000', 'rating': 4.9, 'reviews': 312, 'order': 7},
            {'name': 'Artisan Handcrafted Items', 'description': 'Traditional wooden and ceramic crafts from local artisans', 'image': '/artisan-handicrafts-wooden-ceramic-items.jpg', 'category': 'export', 'type': 'Handicrafts', 'price': 'Starting from $1,000', 'rating': 4.7, 'reviews': 267, 'order': 8},
            {'name': 'Premium Spice Blends', 'description': 'Organic spices including turmeric, cardamom, and cinnamon', 'image': '/global-trade-shipping-containers.jpg', 'category': 'export', 'type': 'Spices', 'price': 'Starting from $2,500', 'rating': 4.8, 'reviews': 289, 'order': 9},
            {'name': 'Cotton Apparel', 'description': 'Ready-made clothing and garments for retail distribution', 'image': '/cotton-apparel-clothing-garments-fashion.jpg', 'category': 'export', 'type': 'Apparel', 'price': 'Starting from $3,000', 'rating': 4.6, 'reviews': 201, 'order': 10},
            {'name': 'Fresh Seafood', 'description': 'Frozen and chilled fish, shrimp, and shellfish with cold chain', 'image': '/fresh-seafood-fish-shrimp-cold-storage.jpg', 'category': 'export', 'type': 'Seafood', 'price': 'Starting from $15,000', 'rating': 4.9, 'reviews': 278, 'order': 11},
            {'name': 'Tropical Fruits', 'description': 'Mangoes, pineapples, and tropical fruits shipped fresh', 'image': '/asia-trade-ports-business.jpg', 'category': 'export', 'type': 'Agriculture', 'price': 'Starting from $5,000', 'rating': 4.7, 'reviews': 234, 'order': 12},
        ]
        for p in products:
            Product.objects.create(**p, is_published=True, is_active=True)
        self.stdout.write(f'Created {len(products)} products.')

    def _faqs(self):
        if FAQ.objects.exists():
            self.stdout.write('FAQs already exist, skipping.')
            return
        faqs = [
            {'question': 'How long does international shipping typically take?', 'answer': 'Standard ocean freight takes 15-30 days depending on routes. Air freight takes 3-7 days. Express services are available for time-sensitive shipments.', 'order': 1},
            {'question': 'What documents are required for export?', 'answer': 'Essential documents include commercial invoice, bill of lading, packing list, export license (if applicable), and certificates of origin. Our team handles all documentation.', 'order': 2},
            {'question': 'Do you handle customs clearance?', 'answer': 'Yes, we provide complete customs clearance services including documentation preparation, duty calculations, and coordination with customs authorities.', 'order': 3},
            {'question': 'What is your insurance coverage?', 'answer': 'All shipments include basic insurance coverage. Extended coverage options are available for high-value items, typically up to 110% of shipment value.', 'order': 4},
            {'question': 'Can I track my shipment in real-time?', 'answer': 'All shipments come with real-time tracking. You can monitor your cargo from warehouse to delivery with live updates, GPS tracking, and instant notifications.', 'order': 5},
            {'question': 'What are your payment terms?', 'answer': 'We offer flexible payment options including prepayment, payment on delivery, and credit terms for established partners. Monthly invoicing is available for regular shipments.', 'order': 6},
        ]
        for f in faqs:
            FAQ.objects.create(**f)
        self.stdout.write(f'Created {len(faqs)} FAQs.')

    def _testimonials(self):
        if Testimonial.objects.exists():
            self.stdout.write('Testimonials already exist, skipping.')
            return
        testimonials = [
            {'name': 'Abebe Bekele', 'company': 'Bekele Trading Co.', 'role': 'CEO', 'feedback': 'Excellent import/export service! Timely delivery and professional team. Highly recommend.', 'rating': 5, 'order': 1},
            {'name': 'Saba Desta', 'company': 'Desta Exports Ltd.', 'role': 'Operations Manager', 'feedback': 'Smooth process and great communication. They handled all our customs paperwork flawlessly.', 'rating': 5, 'order': 2},
            {'name': 'Kebede Alemu', 'company': 'Alemu Global', 'role': 'Director', 'feedback': 'Reliable and trustworthy import/export partner. Will work with them again for all our shipments.', 'rating': 5, 'order': 3},
            {'name': 'Hana Tadesse', 'company': 'Tadesse Industries', 'role': 'Procurement Head', 'feedback': 'Amazing support and prompt delivery. The real-time tracking feature is a game changer.', 'rating': 5, 'order': 4},
            {'name': 'Michael Rodriguez', 'company': 'Rodriguez Imports', 'role': 'Founder', 'feedback': 'Best logistics partner we have worked with. Competitive pricing and zero delays.', 'rating': 5, 'order': 5},
            {'name': 'Sarah Chen', 'company': 'Chen Global Trade', 'role': 'VP Logistics', 'feedback': 'Their customs clearance expertise saved us weeks of delays. Truly professional team.', 'rating': 5, 'order': 6},
        ]
        for t in testimonials:
            Testimonial.objects.create(**t)
        self.stdout.write(f'Created {len(testimonials)} testimonials.')
