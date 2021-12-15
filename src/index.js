import * as coords from "./coordinates.js";

import "./style.css";

var infowindow;

// update for drawRoute function
var rect;
var highlitedLine;
var markers=[];
var map;
var mcOptions = {
  //imagePath:'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
   ignoreHidden: true 
 
 
 }
 var markerCluster ;
var allCooreds;


function zoomToObject(obj){
  var bounds = new google.maps.LatLngBounds();
  var points = obj.getPath().getArray();
  for (var n = 0; n < points.length ; n++){
      bounds.extend(points[n]);
  }
  map.fitBounds(bounds);
}
function drawPolyAndRoute(
  LineLocations,
  stationsLocations,
  labels,
  labelOrigin,
  colorName,
  color,
  map
) {
  //Create an empty array to store the coordinates from the JSON object above.
  var coordinates = [];
 

  // Define a bound from the given coordinates from which we can center the map.

  //Create the svg marker icon
  var icon = {
    path: google.maps.SymbolPath.CIRCLE,
    strokeOpacity: 1,
    fillOpacity: 1,
    scale: 7,
    fillColor: "#ffffff",
    strokeColor: color,
    strokeOpacity: 1.0,
    strokeWeight: 5,
  };

  //Create the markers
  let markersList=[]
  for (i = 0; i < stationsLocations.length; i++) {
    var labelC=labels[i];
    var positions = new google.maps.LatLng(stationsLocations[i]);
    icon["labelOrigin"] = labelOrigin[i];

    var marker = new MarkerWithLabel({
      position: positions,
      // icon: mapStyles.uavSymbolBlack,
      icon: icon,
      labelContent:'<i class="fas fa-train"></i>' +labels[i],
      labelAnchor: labelOrigin[i],
      labelClass: `labels-${colorName} labels`,
      labelStyle: {
        opacity: 1,
      },
      zIndex: 999999,
      map: map,
    });
    
    //on mouseover marker
    marker.addListener( 'mouseover', function() {
      if(infowindow != undefined && infowindow.position != undefined){
        infowindow.close();

      }
      infowindow = new google.maps.InfoWindow({
      
        content: this.labelContent,
      });
  
      infowindow.open({
        anchor: this,
        map,
        shouldFocus: false,
      });
    

    });


    google.maps.event.addListener(marker, 'click', function() {
      map.panTo(this.getPosition());
      map.setZoom(19);
    });
    markersList.push(marker)

  }
  markerCluster.addMarkers(markersList, true);
  //Create the polyline that connects the markers.
  var LinePath = new google.maps.Polyline({
    path: LineLocations,
    geodesic: true,
    strokeColor: color,
    strokeOpacity: 1,
    strokeWeight: 7,
  });

  markers.push({line:LinePath,stations:markersList})

  LinePath.setMap(map);
  

  google.maps.event.addListener(LinePath, 'click', function(latlng) {
    highlitedLine=LinePath;
    zoomToObject(LinePath);

    markerCluster.clearMarkers();
    for (let index = 0; index < markers.length; index++) {
      const markersList = markers[index];
      if(markersList.line==highlitedLine){
        markersList.stations.map((staion)=>{
          markerCluster.addMarker(staion);
        })
      }
      
    }

    markerCluster.setMaxZoom(1)
   
    markerCluster.setGridSize(1);
    markerCluster.repaint();
    LinePath.setOptions({zIndex: 100000});
    rect.setMap(map);



});

}
function initMap() {

   map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 24.731488, lng: 46.707267 }
  });
  markerCluster = new MarkerClusterer(map, [],mcOptions  );


  
markerCluster.setCalculator(function (markers, numStyles) {
  var index = 0;
  var count = markers.length;
  var dv = count;
  while (dv !== 0) {
      dv = parseInt(dv / 10, 10);
      index++;
  }

  index = Math.min(index, numStyles);
  return {
      text: "", // set to empty string
      index: index
  };
});
markerCluster.setGridSize(18);

  let bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-84.999999, -179.999999), 
    new google.maps.LatLng(84.999999, 179.999999));
  
   rect = new google.maps.Rectangle({
      bounds: bounds,
      fillColor: "#ffffff",
      fillOpacity: 0.6,
      strokeWeight: 0,
   
      zIndex:10000
  });




  google.maps.event.addListener(rect, 'click', function(latlng) {

    highlitedLine.setOptions({zIndex: 0});
    markerCluster.clearMarkers();
    rect.setMap(null);
    for (let index = 0; index < markers.length; index++) {
      const markersList = markers[index];
      console.log(markersList.stations);
        markersList.stations.map((staion)=>{
          staion.setMap(map)
        })
        markerCluster.addMarkers(markersList.stations,true);
   
      
    }

    markerCluster.setMaxZoom(15)
   
    markerCluster.setGridSize(18);
    markerCluster.repaint();
  
  
  });

  //blue line

  const LanePath = new google.maps.Polyline({
    path: coords.blueLineCoordinates,
    geodesic: true,
    strokeColor: "#2db5e4",
    strokeOpacity: 1.0,
    strokeWeight: 8,
  });

  LanePath.setMap(map);

  //------------------------------------------------------------------
  //purple line

  var labels = ["3j1", "6g2", "2e1", "6e1", "6d2", "6d1", "4c1", "4b1", "4a1"];

  // offset to postion the lables
  var labelOrigin = [
    new google.maps.Point(10, 0),
    new google.maps.Point(12, -10),
    new google.maps.Point(-20, 10),
    new google.maps.Point(12, -5),
    new google.maps.Point(-10, 12),
    new google.maps.Point(-10, -23),
    new google.maps.Point(-10, 10),
    new google.maps.Point(-28, -5),
    new google.maps.Point(10, 0),
  ];

  drawPolyAndRoute(
    coords.purpleLineCoordinates,
    coords.purpleStations,
    labels,
    labelOrigin,
    "purple",
    "#97187f",
    map
  );
  //----------------------

  //green line

  var labels = ["5A1", "5A6", "5A3", "5B1", "5B2", "5B3", "5B4", "5C4"];

  // offset to postion the lables
  var labelOrigin = [
    new google.maps.Point(10, 0),
    new google.maps.Point(12, -10),
    new google.maps.Point(-30, 10),
    new google.maps.Point(12, -5),
    new google.maps.Point(-25, 12),
    new google.maps.Point(-10, -23),
    new google.maps.Point(-10, 10),
    new google.maps.Point(-28, -5),
    new google.maps.Point(10, 0),
  ];

  drawPolyAndRoute(
    coords.greenLineCoordinates,
    coords.greenStations,
    labels,
    labelOrigin,
    "green",
    "#51a532",
    map
  );
  //----------------------

  //------------------------------------------------------------------
  //Orange line

  var labels = [
    "3A1",
    "3A2",
    "3B1",
    "2B2",
    "3C2",
    "3D3",
    "3D1",
    "???",
    "3E1",
    "3E2",
    "3E3",
    "3E4",
    "3E5",
    "3E6",
    "3F2",
    "3G1",
    "3G2",
    "3K2",
    "3k1",
  ];

  // offset to postion the lables
  var labelOrigin = [
    new google.maps.Point(-10, -30),
    new google.maps.Point(-5, 12),
    new google.maps.Point(0, -25),
    new google.maps.Point(0, 10),
    new google.maps.Point(-10, 12),
    new google.maps.Point(-10, -25),
    new google.maps.Point(-25, 10),
    new google.maps.Point(-20, -30),
    new google.maps.Point(5, 10),
    new google.maps.Point(-40, -10),
    new google.maps.Point(-10, 15),
    new google.maps.Point(5, 15),
    new google.maps.Point(15, 5),
    new google.maps.Point(10, 0),
    new google.maps.Point(-20, -30),
    new google.maps.Point(-10, 10),
    new google.maps.Point(-10, 10),
    new google.maps.Point(-10, -30),
    new google.maps.Point(10, -5),
  ];

  drawPolyAndRoute(
    coords.orangeLineCoordinates,
    coords.orangeStations,
    labels,
    labelOrigin,
    "orange",
    "#ec7026",
    map
  );

  //-----------------------------------------------------------------------
  // Red Line
  var labels = [
    "2G1",
    "2F1",
    "2E2",
    "2E1",
    "2D2",
    "2C3",
    "2C2",
    "2C1",
    "2B4",
    "2B1",
    "2A3",
    "2A2",
    "2A1",
  ];
  var labelOrigin = [
    new google.maps.Point(-20, 10),
    new google.maps.Point(3, 10),
    new google.maps.Point(-10, 15),
    new google.maps.Point(12, 10),
    new google.maps.Point(-10, 12),
    new google.maps.Point(-10, -23),
    new google.maps.Point(-10, 10),
    new google.maps.Point(-28, -15),
    new google.maps.Point(10, 0),
    new google.maps.Point(10, 0),
    new google.maps.Point(10, 0),
    new google.maps.Point(10, 0),
    new google.maps.Point(10, 0),
  ];

  drawPolyAndRoute(
    coords.redLineCoordinates,
    coords.redStations,
    labels,
    labelOrigin,
    "red",
    "#d52f45",
    map
  );

  //-----------------------------------------------------------------------
  // Yellow Line
  var labels = ["4g3", "4g2", "4g1", "4e2", "4e1", "4d1", "4c2"];
  var labelOrigin = [
    new google.maps.Point(-30, 0),
    new google.maps.Point(10, -10),
    new google.maps.Point(-30, 10),
    new google.maps.Point(10, -10),
    new google.maps.Point(-30, -10),
    new google.maps.Point(10, -10),
    new google.maps.Point(-20, -20),
  ];

  drawPolyAndRoute(
    coords.yellowLineCoordinates,
    coords.yellowStations,
    labels,
    labelOrigin,
    "yellow",
    "#e4d60e",
    map
  );

  
    // add all stations array to one array 
    allCooreds = coords.purpleStations.concat(coords.greenStations,coords.orangeStations,coords.redStations,coords.yellowStations);


  }
 

export { initMap };
