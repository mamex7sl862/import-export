#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate
python manage.py populate_blog
python manage.py createsuperuser --noinput --username admin --email admin@tradeflow.com || true
