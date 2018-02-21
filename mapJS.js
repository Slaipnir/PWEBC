window.onload = function () {
	var map = L.map('map').setView([48.858376, 2.294442],12);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
}



