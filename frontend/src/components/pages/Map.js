// React
import React from "react";
// Redux
import { connect, useSelector } from 'react-redux';
// Leaflet
import { icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from "react-leaflet";
// Bootstrap
import { Button } from 'react-bootstrap';
// Icons
import { FaFileContract } from "react-icons/fa";

export function Map({ category }) {
	const { auth, userdata, services } = useSelector(state => state);
	const ICON = icon({ iconUrl: 'static/location-pin.png', iconSize: [32, 32], });
	const ICON_SELF = icon({ iconUrl: 'static/marker-icon.png' });

	/* Setting the coordinates to the user's location 
	Switching values for Leaflet */
	const coords = [auth.user.location.geometry.coordinates[1], auth.user.location.geometry.coordinates[0]]

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
				services.services.map((service, id) => (
					<Marker key={id} icon={ICON} position={[service.user.location.geometry.coordinates[1], service.user.location.geometry.coordinates[0]]}>
						{userdata.users.filter(user => user.id !== auth.user.id).map((user, id) => (
							<Tooltip key={id} >
								<div key={id}>
									Username: {user.username}<br />
									Name: {user.first_name} {user.last_name}<br />
									E-mail: {user.email}<br />
									Services: {user.services.length}<br />
								</div>
							</Tooltip>
						))}
						<br />
						<strong>Click to hire!</strong>
						{userdata.users.filter(user => user.id !== auth.user.id).map((user, id) => (
							<Popup key={id} >
								<div key={id}>
									Username: {user.username}<br />
									Name: {user.first_name} {user.last_name}<br />
									E-mail: {user.email}<br />
									Services: {user.services.length}<br />
								</div>
								<br />
								<Button className="btn btn-warning">
									<FaFileContract /> Hire
								</Button>
							</Popup>
						))}
					</Marker>
				))
			) : (
				services.services
					.filter((service) => service.subcategory.category === category)
					.map((service, id) => (
						<Marker key={id} icon={ICON} position={[service.user.location.geometry.coordinates[1], service.user.location.geometry.coordinates[0]]}>
							{userdata.users.filter(user => user.id == service.provider).map((user, id) => (
								<Tooltip key={id}>
									<div key={id}>
										Username: {user.username}<br />
										Name: {user.first_name} {user.last_name}<br />
										E-mail: {user.email}<br />
										Services: {user.services.length}<br />
									</div>
									<br />
									<strong>Click to hire!</strong>
								</Tooltip>
							))}
							{userdata.users.filter(user => user.id == service.provider).map((user, id) => (
								<Popup key={id}>
									<div key={id}>
										Username: {user.username}<br />
										Name: {user.first_name} {user.last_name}<br />
										E-mail: {user.email}<br />
										Services: {user.services.length}<br />
									</div>
									<br />
									<Button className="btn btn-warning">
										<FaFileContract /> Hire
									</Button>
								</Popup>
							))}
						</Marker>
					)))}
			< MapView />
		</MapContainer>
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