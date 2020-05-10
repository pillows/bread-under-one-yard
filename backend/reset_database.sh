#!/bin/sh
rm db.sqlite3
touch db.sqlite3
rm -rf api/migrations

mkdir -p api/migrations
touch api/migrations/__init__.py

./manage.py migrate
./manage.py makemigrations

./manage.py convert_csv_to_db
