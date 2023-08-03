// React
import React from "react";
// Redux
import { connect, useSelector } from 'react-redux';
// Leaflet
import { icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from "react-leaflet";
// Bootstrap
import { Button } from 'react-bootstrap';

export function Map({ coords, category }) {
	const { userdata, services } = useSelector(state => state);
	const ICON = icon({ iconUrl: 'static/location-pin.png', iconSize: [32, 32], });
	const ICON_SELF = icon({ iconUrl: 'static/marker-icon.png' });

	function MapView() {
		let map = useMap();
		map.setView(coords, map.getZoom());
		return null;
	}

	return (
		<MapContainer center={coords} zoom={12} scrollWheelZoom={true} >
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker icon={ICON_SELF} position={coords}> </Marker>
			{services.services.filter(service => service.subcategory.category == category).map((service, id) => (
				<Marker key={id} icon={ICON} position={service.user.location.coordinates.reverse()}>
					<Tooltip>
						{userdata.users.filter(user => user.id == service.provider).map((user, id) => (
							<div key={id}>
								Username: {user.username}<br />
								Name: {user.first_name} {user.last_name}<br />
								E-mail: {user.email}<br />
								Services: {user.services.length}<br />
							</div>
						))}
						<br />
						<strong>Click to hire!</strong>
					</Tooltip>
					<Popup key={id}>
						{userdata.users.filter(user => user.id == service.provider).map((user, id) => (
							<div key={id}>
								Username: {user.username}<br />
								Name: {user.first_name} {user.last_name}<br />
								E-mail: {user.email}<br />
								Services: {user.services.length}<br />
							</div>
						))}
						<br />
						<Button>Contratar</Button>
					</Popup>
				</Marker>
			))}
			<MapView />
		</MapContainer>
	);
}

const mapStateToProps = function (state) {
	return {
		services: state.services,
		userdata: state.userdata,
	}
}

export default connect(mapStateToProps)(Map);