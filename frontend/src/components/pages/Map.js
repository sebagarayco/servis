// React
import React from "react";
import { Link } from "react-router-dom";
// Redux
import { connect, useSelector } from 'react-redux';
// Leaflet
import { icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from "react-leaflet";
// Bootstrap
import { Button } from 'react-bootstrap';
// Icons
import { FaFileContract } from "react-icons/fa";

export function Map({ category, coordinates }) {
	//const { auth, userdata, services } = useSelector(state => state);
	const auth = useSelector(state => state.auth);
	//const userdata = useSelector(state => state.userdata);
	const services = useSelector(state => state.services);
	const ICON = icon({ iconUrl: 'static/location-pin.png', iconSize: [32, 32], });
	const ICON_SELF = icon({ iconUrl: 'static/marker-icon.png' });

	// Set the initial coordinates based on props or user's location
	let coords;

	if (coordinates && coordinates.length === 2) {
		coords = [coordinates[0], coordinates[1]]; // Assuming coordinates is an array [longitude, latitude]
	} else if (auth.user.location.geometry.coordinates) {
		coords = [
			auth.user.location.geometry.coordinates[0],
			auth.user.location.geometry.coordinates[1]
		];
	} else {
		// Default coordinates if neither props nor user's location is available
		coords = [0, 0];
	}

	function MapView() {
		let map = useMap();
		map.setView(coords, map.getZoom());
		return null;
	}

	return (
		// TODO: Normalize locations
		console.log('Map and category: ', coords, category),
		<MapContainer center={coords} zoom={10} scrollWheelZoom={true} >
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker icon={ICON_SELF} position={coords}> </Marker>
			{category === "showAll" ? (
				services.services
					.filter((service) => service.user.id !== auth.user.id) // Filter out the user's own services
					.map((service, id) => (
						<Marker key={service.id} icon={ICON} position={[service.user.location.geometry.coordinates[0], service.user.location.geometry.coordinates[1]]}>
							<Tooltip >
								<div key={id}>
									<p>Click para abrir 👀</p>
								</div>
							</Tooltip>
							< br />
							<strong>Click to hire!</strong>
							<Popup >
								<div key={service.id}>
									<Link to={`/profile/${service.user.id}`}>
										{service.user.first_name} {service.user.last_name}
									</Link>
									<p>Total Services: { } </p>
								</div>
								<br />
								<Link to={'/hire'}>
								<Button className="btn btn-warning">
									<FaFileContract /> Hire
								</Button>
								</Link>
							</Popup>
						</Marker>
					))
			) : (
				services.services
					.filter((service) => service.subcategory.category === category && service.user.id !== auth.user.id) // Filter out the user's own services and selecting category
					.map((service, id) => (
						<Marker key={service.user.id} icon={ICON} position={[service.user.location.geometry.coordinates[0], service.user.location.geometry.coordinates[1]]}>
							<Tooltip key={id}>
								<div key={id}>
									Username: {service.user.username}<br />
									Name: {service.user.first_name} {service.user.last_name}<br />
									E-mail: {service.user.email}<br />
								</div>
								<br />
								<strong>Click to hire!</strong>
							</Tooltip>
							<Popup key={id}>
								<div key={service.id}>
									<Link to={`/profile/${service.user.id}`}>
										{service.user.first_name} {service.user.last_name}
									</Link>
								</div>
								<br />
								<Link to={'/hire'}>
								<Button className="btn btn-warning">
									<FaFileContract /> Hire
								</Button>
								</Link>
							</Popup>
						</Marker>
					)))
			}
			< MapView />
		</MapContainer >
	);
}

const mapStateToProps = function (state) {
	return {
		auth: state.auth,
		services: state.services,
		userdata: state.userdata,
	}
}

export default connect(mapStateToProps)(Map);