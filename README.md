# 🤝 SERVIS 

Sistema de búsqueda y contratación de servicios para particulares.

## Funcionalidades

- Registro de usuario 
- Autenticación y autorización
- Ofrecer/buscar/contratar servicios 
- Búsqueda por categoría/subcategoría/geolocalización
- Valoración y opinión de cada proveedor 
- Proceso de pago (emulado)

## Stack

- Python (Django, GEODjango)
- Javascript (Node, ReactJS)
- PostGIS
- API REST
- Knox
- Redux
+ Docker y CI/CD con Terraform/Ansible/GitHub Actions

## Desarrollo

1. Instalar [Docker](https://docs.docker.com/engine/install/) y [docker-compose](https://docs.docker.com/compose/install/)
2. Crear archivo `.env` con:
   ```
   SECRET_KEY="<CHANGE_ME>"
   POSTGRES_USER=<CHANGE_ME>
   POSTGRES_PASSWORD=<CHANGE_ME>
   POSTGRES_DB=<CHANGE_ME>
   POSTGRES_HOST=servis-db
   POSTGRES_PORT=5432	
   ```
3. `docker-compose up -d` o `make build`
4. [http://localhost](http://localhost)

## Demo

Login/Registro

![loginregister](servis/images/loginregister.gif)

.. more to come!
