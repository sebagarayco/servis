#!/bin/sh

while ! nc -z $POSTGRES_HOST 5432 2> /dev/null; do
	echo "Waiting for postgres..."
	sleep 2
done

# Apply database migrations
echo "Apply database migrations"
python manage.py makemigrations servis --noinput || exit 1
python manage.py makemigrations users --noinput || exit 1
python manage.py migrate --noinput || exit 1


# Load fixtures & data
echo "Load fixtures & data"
python manage.py loaddata servis/fixtures/*.json || exit 1
#python manage.py shell_plus < scripts/LoadCategorias.txt

# Start server
echo "Starting server"
python manage.py runserver "0.0.0.0:8000"