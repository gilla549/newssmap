console.log('hi');
// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var map = L.map('map').setView([7.188101, 30.058594], 5.4);

// Add base layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png', {
  maxZoom: 12
}).addTo(map);

// Initialize Carto
var client = new carto.Client({
  apiKey: 'apikey',
  username: 'gilla549'
});

// Initialze source data
var CampSource = new carto.source.Dataset ('camp_points_final');

// Create style for the data
var CampStyle = new carto.style.CartoCSS(`
#layer {
  marker-width: 15;
  marker-fill: #ffcd00;
  marker-fill-opacity: 0.8;
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 0;
}
`);

// Add style to the data
var CampLayer = new carto.layer.Layer(CampSource, CampStyle);

//new layer 
var IncidentSource = new carto.source.Dataset ('ssudan_incident_reports');

var IncidentStyle = new carto.style.CartoCSS (`
#layer {
  marker-width: 10;
  marker-fill: #f54d42;
  marker-fill-opacity: 0.7;
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
}
`);

//style
var IncidentLayer = new carto.layer.Layer(IncidentSource, IncidentStyle);

// Add the data to the map as a layer
client.addLayers([IncidentLayer,CampLayer]);
client.getLeafletLayer().addTo(map);

map.setZoom(6);