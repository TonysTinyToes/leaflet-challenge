//Define markersize function
function markerSize(magnitude) {
    return magnitude * 20000;
}

//Define markercolor based off depth
function markerColor(depth) {
    return depth > 90 ? '#EA2C2C':
           depth > 70 ? '#EA822C': 
           depth > 50 ? '#EE9C00':
           depth > 30 ? '#EECC00':
           depth > 10 ? '#D4EE00':
           '#98EE00';
 }

//Define map object
let map = L.map("map").setView([37.09, -95.71], 5);

//Add background map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
  accessToken: config.API_KEY 
}).addTo(myMap);


//Use d3 to fetch data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(data => {
   
//Create geojson layer with data
L.geoJSON(data, {

    //For each point, create and style the marker
    pointToLayer: function (feature, latlng) {
        let options = {
            radius:markerSize(feature.properties.mag),
            fillColor: markerColor(feature.geometry.coordinates[2]),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }
        return L.circleMarker(latlng, options);
    },

    //Define what happens for each earthquake feature
    onEachFeature: function (feature, layer) {

        //Define changes to markers with mous activity (hover/ click)
        layer.on({

            //When clicked, feature will increase opacity
            click: function (event) {
                layer = event.target
                layer.setStyle({
                    fillOpacity: 0.9
                });
            },

            //When mouse is not hovering, revert fill opacity

        })
    }
})


}




