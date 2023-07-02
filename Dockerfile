FROM python:3.9
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

EXPOSE 8000

WORKDIR /app

# install psycopg2 dependencies
RUN apt-get update \
	&& apt-get -y install netcat-traditional gcc postgresql graphviz-dev \
	&& apt-get clean

# Setup GDAL
RUN apt-get update &&\
	apt-get install -y binutils libproj-dev gdal-bin python3-gdal 

# upgrade pip version
RUN pip install --upgrade pip

# copy requirements to the image
COPY requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

HEALTHCHECK --interval=1m --timeout=5s --retries=2 --start-period=10s \
	CMD wget -qO- http://localhost:8000/health/ || exit 1

ENTRYPOINT ["/app/servis/entrypoint.sh"]
