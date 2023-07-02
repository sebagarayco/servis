ifneq (,$(wildcard ./.env))
   include .env
   export
   ENV_FILE_PARAM = --env-file .env
endif

build:
	docker-compose up --build --remove-orphans

up:
	docker-compose up

down:
	docker-compose down

loadcategories:
	docker compose exec backend python manage.py shell_plus < scripts/LoadCategorias.txt

shellplus:
	docker compose exec backend python3 manage.py shell_plus

migrate:
	docker compose exec backend python3 manage.py migrate --noinput

makemigrations:
	docker compose exec backend python3 manage.py makemigrations

superuser:
	docker compose exec backend python3 manage.py createsuperuser

down-v:
	docker compose down -v

volume:
	docker volume inspect servis_postgres_data
