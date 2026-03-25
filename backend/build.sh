#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# Seed initial data (safe to run multiple times)
python manage.py populate_blog || true
python manage.py populate_content || true

# Create superadmin if not exists
python manage.py createsuperuser --noinput --username admin --email admin@tradeflow.com || true
