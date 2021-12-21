import * as coords from "./coordinates.js";

import "./style.css";

var zoom;
var zoomMajor;
var lastZoom;


// update for drawRoute function
var markersList = [];
var majorStation = [];
var lines = [];
var rect;
var highlitedLine;
var markers = [];
var map;
var mcOptions = {
  //imagePath:'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
  ignoreHidden: true,
};
var markerCluster;
var allStations = [];

function innerCicle(pos, color, label) {
  var icon = {
    path: google.maps.SymbolPath.CIRCLE,

    fillOpacity: 1,
    scale: 4,
    fillColor: color,
    strokeColor: "#ffffff",
    strokeWeight: 1,
  };
  var marker = new google.maps.Marker({
    position: pos,
    // icon: mapStyles.uavSymbolBlack,
    icon: icon,
    labelContent: label,
    zIndex: 9999999,
    map: map,
  });
  return marker;
}
function zoomToObject(obj) {
  var bounds = new google.maps.LatLngBounds();
  var points = obj.getPath().getArray();
  for (var n = 0; n < points.length; n++) {
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
  let icon;

  //Create the markers

  for (i = 0; i < stationsLocations.length; i++) {
    var labelC = labels[i];
    var positions = new google.maps.LatLng(stationsLocations[i]);
    if (stationsLocations[i].major) {
      icon = {
        path: google.maps.SymbolPath.CIRCLE,
        strokeOpacity: 1,
        fillOpacity: 1,
        scale: 7,
        fillColor: "#ffffff",
        strokeColor: stationsLocations[i].stroke,
        strokeOpacity: 1.0,
        strokeWeight: 4,
      };
      icon["labelOrigin"] = labelOrigin[i];

      var outeRmarker = new MarkerWithLabel({
        position: positions,
        // icon: mapStyles.uavSymbolBlack,
        icon: icon,
        labelContent: `<i class="fas fa-train"></i> ${labels[i]}`,
        labelAnchor: labelOrigin[i],
        labelClass: `labels-${colorName} labels`,
        zIndex: 999999,
        map: map,
      });
      var marker = innerCicle(
        stationsLocations[i],
        stationsLocations[i].fill,
        `<i class="fas fa-train"></i> ${labels[i]}`
      );
    } else {
      icon = {
        path: google.maps.SymbolPath.CIRCLE,
        strokeOpacity: 1,
        fillOpacity: 1,
        scale: 3,
        fillColor: "#ffffff",
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 2,
      };
      icon["labelOrigin"] = labelOrigin[i];

      var marker = new MarkerWithLabel({
        position: positions,
        // icon: mapStyles.uavSymbolBlack,
        icon: icon,
        labelContent: `<i class="fas fa-train"></i> ${labels[i]}`,
        labelAnchor: labelOrigin[i],
        labelClass: `labels-${colorName} labels`,
        labelStyle: {
          opacity: 1,
        },
        zIndex: 999999,
        map: map,
      });
    }

    //add all the stations to allStations array with the locations
    allStations.push({
      station_name: marker.labelContent.slice(-3).toUpperCase(),
      location: marker.getPosition(),
    });

    var zoomLevel;

    google.maps.event.addListener(marker, "click", function () {
      // map.panTo(this.getPosition());
      // map.setZoom(19);

      console.log("side",document.querySelector(".sidenav").style.display === "block")

      zoomLevel = map.getZoom();
      if (zoomLevel <= 14) {
        lastZoom  = map.getZoom();

        console.log("1","z"+zoomLevel+" ,l"+lastZoom)

        map.panTo(this.getPosition());
        map.setZoom(19);
        let station = allStations.findIndex(
          (x) => x.station_name === this.labelContent.slice(-3).toUpperCase()
        );
        //get places near the station
        getNearby(
          allStations[station].location.lat(),
          allStations[station].location.lng()
        );
        //show the sidebar with the station details
        document.querySelector(".sidenav").style.display = "block";
        document.getElementById("map").classList.add("main");
        document.querySelector(
          ".sidenav_content"
        ).innerHTML = `<img src="https://www.arabianbusiness.com/cloud/2021/09/14/hkaPPUM3-Riyadh-Metro-by-Alstom.jpg" alt="" class="station_img">
          <h1>${this.labelContent.slice(-3).toUpperCase()}</h1>
          <p>metro station</p>
          <hr>
          <h3>Near this location</h3>
          <div class="nearby_place">
            
          </div>`;
        document.querySelector(".icon").addEventListener("click", () => {
          document.querySelector(".sidenav").style.display = "none";
          document.getElementById("map").classList.remove("main");
        });
      } else if(      document.querySelector(".sidenav").style.display === "block"
      ) {
        console.log("2","z"+zoomLevel+" ,l"+lastZoom)

       
      }else{
        console.log("3","z"+zoomLevel+" ,l"+lastZoom)

        var center = new google.maps.LatLng(24.731488, 46.707267);
        map.setCenter(center);
        map.setZoom(lastZoom);
      }

      // search for the clicked station
      
    });

    if (!stationsLocations[i].major) {
      markersList.push(marker);
    } else {
      // console.log("mar", marker);
      majorStation.push(marker);
    }
  }
  markerCluster.addMarkers(markersList, true);

  //Create the polyline that connects the markers.
  var LinePath = new google.maps.Polyline({
    path: LineLocations,
    geodesic: true,
    strokeColor: color,
    strokeOpacity: 1,
    strokeWeight: 3,
  });
  lines.push(LinePath);

  markers.push({ line: LinePath, stations: markersList });

  LinePath.setMap(map);

  google.maps.event.addListener(LinePath, "click", function (latlng) {
    highlitedLine = LinePath;
    zoomToObject(LinePath);

    markerCluster.clearMarkers();
    for (let index = 0; index < markers.length; index++) {
      const markersList = markers[index];
      if (markersList.line == highlitedLine) {
        markersList.stations.map((staion) => {
          markerCluster.addMarker(staion);
        });
      }
    }

    markerCluster.setMaxZoom(1);

    markerCluster.setGridSize(1);
    markerCluster.repaint();
    LinePath.setOptions({ zIndex: 100000 });
    rect.setMap(map);
  });
}
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 24.731488, lng: 46.707267 },
  });
  markerCluster = new MarkerClusterer(map, [], mcOptions);

  // view map information button
  const mapInfoControlDiv = document.createElement("div");
  mapInfoControl(mapInfoControlDiv);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(mapInfoControlDiv);

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
      index: index,
    };
  });
  markerCluster.setGridSize(18);

  let bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-84.999999, -179.999999),
    new google.maps.LatLng(84.999999, 179.999999)
  );

  rect = new google.maps.Rectangle({
    bounds: bounds,
    fillColor: "#ffffff",
    fillOpacity: 0.6,
    strokeWeight: 0,

    zIndex: 10000,
  });

  google.maps.event.addListener(rect, "click", function (latlng) {
    highlitedLine.setOptions({ zIndex: 0 });
    markerCluster.clearMarkers();
    rect.setMap(null);
    for (let index = 0; index < markers.length; index++) {
      const markersList = markers[index];
      console.log(markersList.stations);
      markersList.stations.map((staion) => {
        staion.setMap(map);
      });
      markerCluster.addMarkers(markersList.stations, true);
    }

    markerCluster.setMaxZoom(15);

    markerCluster.setGridSize(18);
    markerCluster.repaint();
  });

  //blue line

  var bluelabels = [
    "1j2",
    "1j1",
    "1h2",
    "1g2",
    "1g1",
    "6e1",
    "1f9",
    "1f8",
    "1f7",
    "1f5",
    "1f2",
    "1e2",
    "1d5",
    "1d2",
    "1c4",
    "1c3",
    "1c2",
    "1c1",
    "1a1",
  ];

  // offset to postion the lables
  var blueLabelOrigin = [
    new google.maps.Point(10, 0),
    new google.maps.Point(5, -10),
    new google.maps.Point(10, 0),
    new google.maps.Point(12, -5),
    new google.maps.Point(9, 0),
    new google.maps.Point(-10, -23),
    new google.maps.Point(-10, 5),
    new google.maps.Point(-10, -20),
    new google.maps.Point(0, 5),
    new google.maps.Point(-10, -20),
    new google.maps.Point(5, -10),
  ];

  drawPolyAndRoute(
    coords.blueLineCoordinates,
    coords.blueStations,
    bluelabels,
    blueLabelOrigin,
    "blue",
    "#2db5e4",
    map
  );
  //------------------------------------------------------------------
  //purple line

  var labels = [
    "3j1",
    "6h1",
    "6g2",
    "6g1",
    "2e1",
    "6e1",
    "6d2",
    "6d1",
    "4c1",
    "4b1",
    "4a1",
  ];

  // offset to postion the lables
  var labelOrigin = [
    new google.maps.Point(10, 0),
    new google.maps.Point(5, -10),
    new google.maps.Point(10, 0),
    new google.maps.Point(12, -5),
    new google.maps.Point(9, 0),
    new google.maps.Point(-10, -23),
    new google.maps.Point(-10, 5),
    new google.maps.Point(-10, -20),
    new google.maps.Point(0, 5),
    new google.maps.Point(-10, -20),
    new google.maps.Point(5, -10),
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
    new google.maps.Point(7, -10),
    new google.maps.Point(10, -10),
    new google.maps.Point(4, -3),
    new google.maps.Point(5, -5),
    new google.maps.Point(3, -4),
    new google.maps.Point(3, -10),
    new google.maps.Point(-28, 0),
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
    "3D2",
    "3E1",
    "3E2",
    "3E3",
    "3E4",
    "3E5",
    "3E6",
    "3E2",
    "3F1",
    "3G1",
    "3G2",
    "3K2",
    "3k1",
  ];

  // offset to postion the lables
  var labelOrigin = [
    new google.maps.Point(-10, -18),
    new google.maps.Point(-10, 5),
    new google.maps.Point(3, -13),
    new google.maps.Point(0, 2),
    new google.maps.Point(-10, 7),
    new google.maps.Point(-15, -20),
    new google.maps.Point(-15, 7),
    new google.maps.Point(-20, -17),
    new google.maps.Point(3, 0),
    new google.maps.Point(-28, -15),
    new google.maps.Point(3, 3),
    new google.maps.Point(2, -0),
    new google.maps.Point(6, -1),
    new google.maps.Point(5, -7),
    new google.maps.Point(7, -3),
    new google.maps.Point(-20, -18),
    new google.maps.Point(-10, 10),
    new google.maps.Point(-10, 10),
    new google.maps.Point(-20, -17),
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
    new google.maps.Point(-10, 5),
    new google.maps.Point(0, 3),
    new google.maps.Point(0, 5),
    new google.maps.Point(-30, -11),
    new google.maps.Point(-18, 5),
    new google.maps.Point(-10, -20),
    new google.maps.Point(-10, 10),
    new google.maps.Point(-28, -15),
    new google.maps.Point(10, 0),
    new google.maps.Point(-10, -20),
    new google.maps.Point(0, 3),
    new google.maps.Point(-18, -18),
    new google.maps.Point(0, 2),
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
    new google.maps.Point(-30, -5),
    new google.maps.Point(5, -6),
    new google.maps.Point(-22, 5),
    new google.maps.Point(-30, -5),
    new google.maps.Point(5, -10),
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

  map.addListener("zoom_changed", function (latlng) {
    zoom = map.getZoom() - 8;
    zoomMajor = map.getZoom();

    // if(map.getZoom() >14){
    markersList.map(scaleforStation);
    lines.map(scaleForLine);
    // majorStation.map(scaleforMajor)
    // }
  });
}

function getNearby(lat, lng) {
  fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&key=YOUR_API_KEY&type=restaurant`
  ).then((response) =>
    response.json().then((res) => {
      let nearby = res.results;
      nearby.forEach((element) => {
        if (element.hasOwnProperty("photos") == true) {
          let ref = element.photos[0].photo_reference;
          document.querySelector(".nearby_place").innerHTML += `
          <img class="rig-img" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=YOUR_API_KEY" alt="Pic From Google">
          <div class="place_info">
            <h4>${element.name}</h4>
            <span>${element.rating} <i class="fas fa-star"></i>  (${element.user_ratings_total})</span>
            <span>${element.types[0]}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${element.vicinity}</span>
          </div>
          <hr>  
        `;
        }
      });
    })
  );
}

function mapInfoControl(controlDiv) {
  // Set CSS for the control border.
  const controlUI = document.createElement("div");

  controlUI.style.backgroundColor = "#fff";
  controlUI.style.border = "2px solid #fff";
  controlUI.style.borderRadius = "3px";
  controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlUI.style.cursor = "pointer";
  controlUI.style.marginTop = "8px";
  controlUI.style.marginBottom = "22px";
  controlUI.style.textAlign = "center";
  controlUI.title = "Click to recenter the map";
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  const controlText = document.createElement("div");

  controlText.style.color = "rgb(25,25,25)";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "16px";
  controlText.style.lineHeight = "38px";
  controlText.style.paddingLeft = "5px";
  controlText.style.paddingRight = "5px";
  controlText.innerHTML = "View map information";
  controlUI.appendChild(controlText);

  controlUI.addEventListener("click", () => {
    let mapInfo = document.querySelector(".map_info");
    if (mapInfo.className.match("hidden")) {
      mapInfo.className = "map_info";
      document.getElementById("map").style.height = "88vh";
      controlText.innerHTML = "Hide map information";
    } else {
      mapInfo.className = "map_info hidden";
      document.getElementById("map").style.height = "100%";
      controlText.innerHTML = "View map information";
    }
  });
}

function scaleforStation(m) {
  console.log("z", zoom);
  m.setIcon({
    path: google.maps.SymbolPath.CIRCLE,
    strokeOpacity: 1,
    fillOpacity: 1,
    scale: zoom,
    fillColor: "#fff",
    strokeColor: m.icon[`strokeColor`],
    strokeOpacity: 1.0,
    strokeWeight: zoom,
  });
}

function scaleforMajor(m) {
  console.log("z", zoomMajor);
  m.setIcon({
    path: google.maps.SymbolPath.CIRCLE,
    strokeOpacity: 1,
    fillOpacity: 1,
    scale: 1,
    fillColor: "#fff",
    strokeColor: m.icon[`strokeColor`],
    strokeOpacity: 1.0,
    strokeWeight: zoomMajor,
  });
}
function scaleForLine(l) {
  // console.log(`l`, l);

  l.setOptions({
    geodesic: true,
    strokeColor: l["strokeColor"],
    strokeOpacity: 1,
    strokeWeight: zoom,
  });
}

export { initMap };
