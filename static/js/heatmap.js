// Creating map object



var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 3
  });
  


  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
 
  //adding this code for starter

var url = "http://127.0.0.1:5000/db_data"
 

//add json data to GEoSon data to generate map

d3.json(url) .then(function(response) {


  console.log(response);

  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    
     heatArray.push([response[i].latitude , response[i].longitude]);
   
  }

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(myMap);

});

  


// //from class XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// fetch('/test')
//       .then(function (response) {
//           return response.json();
//       }).then(function (text) {
//           console.log('GET response:');
//           console.log(text.greeting); 
//       });