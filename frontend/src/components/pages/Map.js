// React
import React from "react";
// Redux
import { connect, useSelector } from 'react-redux';
// Leaflet
import { icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from "react-leaflet";

export function Map({ coords, display_name, props }) {

	const { categories, userdata } = useSelector(state => state);

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
			{userdata.users.map((user, id) => (
				<Marker key={id} icon={ICON} position={user.location.coordinates.reverse()}>
					<Tooltip>
						Username: {user.username}<br />
						Name: {user.full_name}<br />
						E-mail: {user.email}<br />
						Location: {user.location.coordinates.reverse()}<br />
					</Tooltip>
					<Popup key={id} >
						Username: {user.username}<br />
						Name: {user.full_name}<br />
						E-mail: {user.email}<br />
						Location: {user.location.coordinates.reverse()}<br />
					</Popup>
				</Marker>
			))}
			<MapView />
		</MapContainer>
	);
}

const mapStateToProps = function (state) {
	return {
		categories: state.categories,
		userdata: state.userdata,
	}
}

export default connect(mapStateToProps)(Map);