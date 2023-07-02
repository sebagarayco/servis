# SERVIS

🇪🇸 Sistema de búsqueda y contratación de servicios para particulares.

🇺🇸 System to search and hire services for individuals.

## Funcionalidades

| 🇪🇸                                                | 🇺🇸                                       |
|-----------------------------------------------------|--------------------------------------------|
| Registro de usuario                                 | User registration                          |
| Autenticación y autorización                        | Authentication and authorization           |
| Ofrecer/buscar/contratar servicios                  | Offer/search/hire services                 |
| Búsqueda por categoría/subcategoría/geolocalización | Search by category/subcategory/geolocation |
| Valoración y opinión de cada proveedor              | Assesment and reviews of suppliers         |
| Proceso de pago (emulado)                           | Payment process (emulated)                 |

## Stack

- Python (Django, GEODjango)
- Javascript (Node, ReactJS)
- PostGIS
- API REST
- Knox
- Redux

+ Docker y deploy con Terraform/Ansible

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
3. `docker-compose up -d`
4. [http://localhost](http://localhost)

## Demo

Login/Registro

![loginregister](servis/images/loginregister.gif)

.. more to come!
