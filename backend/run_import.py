import pymysql

conn = pymysql.connect(host='localhost', user='root', password='', database='tradeflow', charset='utf8mb4')
cursor = conn.cursor()

# Disable FK checks to allow clean import
cursor.execute("SET FOREIGN_KEY_CHECKS=0;")

# Clear existing data
tables = [
    'authtoken_token','staff_staffprofile','content_product','content_service',
    'content_testimonial','content_faq','blog_blogpost','blog_category',
    'contacts_contactmessage','contacts_newsletter','quotes_quoterequest',
    'settings_manager_sitesettings','django_admin_log','django_session',
    'auth_user_groups','auth_user_user_permissions','auth_group_permissions',
    'auth_permission','auth_group','auth_user','django_content_type','django_migrations'
]
for t in tables:
    cursor.execute(f"DELETE FROM `{t}`;")
    print(f"Cleared {t}")

conn.commit()
print("All tables cleared, ready for import.")
cursor.execute("SET FOREIGN_KEY_CHECKS=1;")
conn.close()
