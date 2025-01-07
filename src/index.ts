import L from 'leaflet';
import './style.scss';

import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import marker from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (<any>L.Icon.Default.prototype)._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: marker2x,
	iconUrl: marker,
	shadowUrl: markerShadow,
});

window.onload = () => {
	let map: L.Map = L.map('map', { attributionControl: false }).setView(
		[50.364444, 7.605916],
		15
	);

	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
	}).addTo(map);

	L.marker([50.364444, 7.605916])
		.addTo(map)
		.bindPopup('Example Pin of the "Deutsches Eck"')
		.openPopup();
};
