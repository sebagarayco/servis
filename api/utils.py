import requests

def get_latitude_longitude(address, city, province, zip_code, country):
    base_url = "https://nominatim.openstreetmap.org/search"
    
    params = {
        "format": "json",
        "street": address,
        "city": city,
        "state": province,
        "country": country,
        "postalcode": zip_code
    }

    response = requests.get(base_url, params=params)
    data = response.json()
    # TODO: Handle comments
    print('Get Latitude/Longitude: ', data)

    if data and isinstance(data, list) and len(data) > 0:
        latitude = data[0].get("lat")
        longitude = data[0].get("lon")
        return latitude, longitude
    
    return None, None

def get_coordinate_details(latitude, longitude):
    base_url = "https://nominatim.openstreetmap.org/reverse"
    
    params = {
        "format": "json",
        "lat": latitude,
        "lon": longitude
    }

    response = requests.get(base_url, params=params)
    data = response.json()
    # TODO: Handle comments
    print('Get Coordinate details: ', data)

    if data and isinstance(data, dict):
        address = data.get("address")
        return address
    
    return None