import * as coords from "./coordinates.js";

import "./style.css";

// update for drawRoute function
//comment the stationsCorrdinates Array and the for loop because it's useless

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
  // var stationsCoordinates = [];

  // //For each line in the JSON object, pull out the longitude and latitude and add to the coordinates array.

  // for (i = 0; i < stationsLocations.length; i++) {

  // var longitudes = stationsLocations[i].lng

  // var latitudes = stationsLocations[i].lat

  // stationsCoordinates.push({
  //   lat: latitudes,
  //   lng: longitudes
  // });
  // }

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

  for (i = 0; i < stationsLocations.length; i++) {
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
  }

  //Create the polyline that connects the markers.
  var LinePath = new google.maps.Polyline({
    path: LineLocations,
    geodesic: true,
    strokeColor: color,
    strokeOpacity: 1,
    strokeWeight: 7,
  });

  LinePath.setMap(map);
}

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 24.731488, lng: 46.707267 },
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
}

export { initMap };
