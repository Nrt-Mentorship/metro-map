import "./style.css";




  // update for drawRoute function 

function drawPolyAndRoute(LineLocations, stationsLocations, labels, labelOrigin, colorName, color, map) {

  //Create an empty array to store the coordinates from the JSON object above.
  var coordinates = [];
  var stationsCoordinates = [];
  
  //For each line in the JSON object, pull out the longitude and latitude and add to the coordinates array.

  for (i = 0; i < stationsLocations.length; i++) {
  
  var longitudes = stationsLocations[i].lng
  
  var latitudes = stationsLocations[i].lat
  
  stationsCoordinates.push({
    lat: latitudes,
    lng: longitudes
  });
  }
  
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
  
  
  for (i = 0; i < stationsCoordinates.length; i++) {
  
  
  var positions = new google.maps.LatLng(stationsCoordinates[i]);
  icon['labelOrigin'] = labelOrigin[i]

  
  var marker = new MarkerWithLabel({
    position: positions,
    // icon: mapStyles.uavSymbolBlack,
    icon: icon,
    labelContent: labels[i],
    labelAnchor: labelOrigin[i],
    labelClass: "labels-" + colorName,
    labelStyle: {
      opacity: 0.75
    },
    zIndex: 999999,
    map: map
  })


  
  };
  
  //Create the polyline that connects the markers.
  var LinePath = new google.maps.Polyline({
  path: LineLocations,
  geodesic: true,
  strokeColor: color,
  strokeOpacity: 1,
  strokeWeight: 7
  });
  

LinePath.setMap(map);
  
  }
  

  
function initMap() {


  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 24.731488, lng: 46.707267 }
  });






  


  
//blue line

  const lanePathCoordinates = [
    { lat: 24.559763, lng: 46.776436 },
    { lat: 24.582026, lng: 46.764134 },
    { lat: 24.583472, lng: 46.763219 },
    { lat: 24.584627, lng: 46.762224 },
    { lat: 24.587418, lng: 46.760795 },
    { lat: 24.602871204966902, lng: 46.75284688249837 },
    { lat: 24.59843637152957, lng: 46.74524628447706 },
    { lat: 24.59428877137576, lng: 46.73729611843368 },
    { lat: 24.610361150031192, lng: 46.728591125725494 },
    { lat: 24.613350534777027, lng: 46.7272226501534 },
    { lat: 24.623321687640985, lng: 46.722676943795875 },
    { lat: 24.625377634243275, lng: 46.72100989399109 },
    { lat: 24.6257258874222, lng: 46.72040500621192 },
    { lat: 24.627210534732747, lng: 46.71931620836978 },
    { lat: 24.62939165131694, lng: 46.717783826051395 },
    { lat: 24.63177434021092, lng: 46.71649339883428 },
    { lat: 24.632647922129927, lng: 46.71646394015212 },
    { lat: 24.635696198238428, lng: 46.71742013902206 },
    { lat: 24.637307077601672, lng: 46.717673310688305 },
    { lat: 24.63889875934706, lng: 46.71784209177595 },
    { lat: 24.64004904899142, lng: 46.71788881982879 },
    { lat: 24.64092071344673, lng: 46.71764471373836 },
    { lat: 24.643519822318968, lng: 46.71647649171343 },
    { lat: 24.64676694459513, lng: 46.71506420007389 },
    { lat: 24.653390354912005, lng: 46.712381072550436 },
    { lat: 24.65501927748733, lng: 46.70990641056156 },
    { lat: 24.657282342571115, lng: 46.70638780172912 },
    { lat: 24.658561448164175, lng: 46.70498035819615 },
    { lat: 24.65929938773564, lng: 46.70457436486933 },
    { lat: 24.667670373157907, lng: 46.70092954457492 },
    { lat: 24.669014926603396, lng: 46.699486050334755 },
    { lat: 24.67205664658886, lng: 46.69612838353166 },
    { lat: 24.67731878586572, lng: 46.693425968407624 },
    { lat: 24.6813028294294, lng: 46.69138536911412 },
    { lat: 24.686965464677996, lng: 46.6886278024901 },
    { lat: 24.694582055053232, lng: 46.68465690648125 },
    { lat: 24.700193981611047, lng: 46.681844188548176 },
    { lat: 24.709287772251976, lng: 46.67726662790325 },
    { lat: 24.718055261092427, lng: 46.672882097008255 },
    { lat: 24.75965592666366, lng: 46.65199691081369 },
    { lat: 24.759439804803417, lng: 46.6515121132278 },
    { lat: 24.759310608505302, lng: 46.65106339986962 },
    { lat: 24.759241041212242, lng: 46.65073507302216 },
    { lat: 24.759072091909694, lng: 46.65026447120749 },
    { lat: 24.75862487205862, lng: 46.6495859290561 },
    { lat: 24.758714316157636, lng: 46.649159104154414 },
    { lat: 24.758903142377402, lng: 46.648907386904696 },
    { lat: 24.759002524483044, lng: 46.64857906005725 },
    { lat: 24.759022538432905, lng: 46.648383313386965 },
    { lat: 24.759478113384013, lng: 46.6481106542837 },
    { lat: 24.767757401987375, lng: 46.64375901456677 },
    { lat: 24.771047282116932, lng: 46.642184260804534 },
    { lat: 24.77355682129197, lng: 46.64114148202263 },
    { lat: 24.774324380850747, lng: 46.64129334303399 },
    { lat: 24.778068621905362, lng: 46.642701171260896 },
    { lat: 24.786265039649688, lng: 46.638528655594435 },
    { lat: 24.79505320203689, lng: 46.634067857075564 },
    { lat: 24.806628158472545, lng: 46.627963453717484 },
    { lat: 24.82965425737327, lng: 46.61645899830947 },
  ];
  const LanePath = new google.maps.Polyline({
    path: lanePathCoordinates,
    geodesic: true,
    strokeColor: "#2db5e4",
    strokeOpacity: 1.0,
    strokeWeight: 8,
  });

  LanePath.setMap(map);

//------------------------------------------------------------------
//purple line
var jslocations =[
 
  { lat: 24.701386355433627, lng: 46.829881768713584 },
  { lat: 24.747361796216303, lng: 46.797889373643635 },
  { lat: 24.748850841138697, lng: 46.796702577392594 },
  { lat: 24.75040977685262, lng: 46.79730339221193 },
  { lat: 24.752358418996625, lng: 46.796445085327164 },
  { lat: 24.762179110287697, lng: 46.78949279956056 },
  { lat: 24.77660830265986, lng: 46.77744458960821 },
  { lat: 24.793214958157993, lng: 46.765599804146134 },
  { lat: 24.79483122103988, lng: 46.76451606921388 },
  { lat: 24.79631166205984, lng: 46.76340027026369 },
  { lat: 24.796935000360346, lng: 46.7611686723633 },
  { lat: 24.7959999917347, lng: 46.759452058593766 },
  { lat: 24.795064976059955, lng: 46.75730629138185 },
   { lat: 24.791246922233025, lng: 46.74734993151857 },
  { lat: 24.787272904663958, lng: 46.735247804443375 },
  { lat: 24.786713414385222, lng: 46.730128243579685 },
  { lat: 24.785948203853117, lng: 46.727265550415055 },
   { lat: 24.78625210657835, lng: 46.726493074218766 },
  { lat: 24.787420958106157, lng: 46.72610683612062 },
  { lat: 24.788472915066393, lng: 46.72434730700685 },
  { lat: 24.78913525376165, lng: 46.72357483081056 },
  { lat: 24.79042095995803, lng: 46.721514894287125 },
  { lat: 24.79197937384659, lng: 46.71893997363283 },
  { lat: 24.79322609086091, lng: 46.71893997363283 },
  { lat: 24.794433836019056, lng: 46.71893997363283 },
  { lat: 24.79583636402492, lng: 46.71941204241945 },
  { lat: 24.796888249620917, lng: 46.71945495776369 },
  { lat: 24.799576361165382, lng: 46.718253328125016 },
  { lat: 24.803869427632, lng: 46.71645088366701 },
  { lat: 24.80565361593614, lng: 46.715506746093766 },
  { lat: 24.80701706166787, lng: 46.714047624389664 },
  { lat: 24.807562435761575, lng: 46.712502671997086 },
  { lat: 24.807277811187728, lng: 46.71105588351672 },
  { lat: 24.800191798824756, lng: 46.69383440815601 },
  { lat: 24.786279, lng: 46.660531 },
  { lat: 24.76792624982181, lng: 46.64368043840547 },



];
var stations =[
  {lat:24.701386355433627, lng:46.829881768713584 },
  {lat:24.747361796216303, lng:46.797889373643635},

  {lat:24.77660830265986, lng:46.77744458960821},

  {lat:24.793214958157993, lng:46.765599804146134},


  {lat:24.786713414385222, lng:46.730128243579685},

  {lat:24.807277811187728, lng:46.71105588351672},
  {lat:24.800191798824756, lng:46.69383440815601},
  {lat:24.786279,lng: 46.660531},
  {lat: 24.76792624982181, lng: 46.64368043840547 },






];

var labels=['3j1','6g2','2e1','6e1','6d2','6d1','4c1','4b1','4a1']

// offset to postion the lables
var labelOrigin=[
new google.maps.Point(10, 0),new google.maps.Point(12, -10),
new google.maps.Point(-20, 10),new google.maps.Point(12, -5),
new google.maps.Point(-10, 12),new google.maps.Point(-10, -23),
new google.maps.Point(-10, 10),new google.maps.Point(-28, -5),
new google.maps.Point(10, 0)]

drawPolyAndRoute(jslocations,stations,labels,labelOrigin,"purple","#991a7e",map);
//----------------------



//green line
var jslocations =[
  { lat: 24.64530273122771, lng: 46.71570998231822 },
  { lat: 24.646036417876203, lng: 46.716544152988035 },
 { lat: 24.646777526140383, lng: 46.717059137118895 },
 { lat: 24.647596640683663, lng: 46.71744537521704 },
  { lat: 24.648766794996153, lng: 46.717531205905516 },
 { lat: 24.65005395207426, lng: 46.71710205246313 },
 { lat: 24.651146074946812, lng: 46.716801645053465 },
 { lat: 24.652755004875484, lng: 46.716111560123416 },
 { lat: 24.6784544889062, lng: 46.71832814266125 },
  { lat: 24.68657560389134, lng: 46.71821834918483 },
 { lat: 24.69763332233779, lng: 46.71806251934823 },
 { lat: 24.6995409214684, lng: 46.71800327469214 },
 { lat: 24.70121744083589, lng: 46.7179603593479 },
 { lat: 24.70199720959774, lng: 46.7179603593479 },
 { lat: 24.702932925668335, lng: 46.717831613315184 },
  { lat: 24.704180536160813, lng: 46.717273713840086 },
 { lat: 24.705116235828704, lng: 46.716544152988035 },
 { lat: 24.70554509582707, lng: 46.715771676791746 },
 { lat: 24.70606806622423, lng: 46.71457730992477 },
 { lat: 24.710643876278194, lng: 46.7070047193485 },
  { lat: 24.711322866110915, lng: 46.70465660263403 },
 { lat: 24.712570392548614, lng: 46.70251083542212 },
 { lat: 24.71381790648566, lng: 46.69942093063696 },
  { lat: 24.71553321773699, lng: 46.69813347030981 },
 { lat: 24.71756037328818, lng: 46.698562623752196 },
 { lat: 24.719119701246804, lng: 46.69950676132544 },
  { lat: 24.721380692085546, lng: 46.702854158176024 },
 { lat: 24.723173862508, lng: 46.7043991105686 },
 { lat: 24.7247331201324, lng: 46.70525741745337 },
  { lat: 24.72824137834513, lng: 46.70602989364966 },
 { lat: 24.73003444989546, lng: 46.706287385715086 },
 { lat: 24.7327629874478, lng: 46.70637321640356 },
 { lat: 24.734166212025873, lng: 46.70568657089575 },
 { lat: 24.735491465146474, lng: 46.70465660263403 },
  { lat: 24.73814192902187, lng: 46.70319748092993 },
 { lat: 24.739934857846087, lng: 46.702339174045164 },
 { lat: 24.742620780251272, lng: 46.70131266397654 },



];

var stations =[
  {lat: 24.64530273122771, lng: 46.71570998231822,station:true},

  {lat:24.652755004875484, lng:46.716111560123416,station:true},
  {lat:24.6784544889062, lng:46.71832814266125,station:true},
  {lat:24.68657560389134, lng:46.71821834918483,station:true},
  {lat:24.69763332233779, lng:46.71806251934823,station:true},
  {lat:24.70606806622423, lng:46.71457730992477,station:true},
  {lat:24.710643876278194, lng:46.7070047193485,station:true},
 
  
  {lat:24.742620780251272, lng:46.70131266397654,station:true},



  



];
var labels=['5A1','5A6','5A3','5B1','5B2','5B3','5B4','5C4']


// offset to postion the lables
var labelOrigin=[
new google.maps.Point(10, 0),new google.maps.Point(12, -10),
new google.maps.Point(-30, 10),new google.maps.Point(12, -5),
new google.maps.Point(-25, 12),new google.maps.Point(-10, -23),
new google.maps.Point(-10, 10),new google.maps.Point(-28, -5),
new google.maps.Point(10, 0)]

drawPolyAndRoute(jslocations,stations,labels,labelOrigin,"green","#52a531",map);
//----------------------


  //------------------------------------------------------------------
  //Orange line
  var orangeLineLocations = [
    //stations//
{ lat: 24.592313, lng: 46.543124 },
    //stations//

{ lat: 24.590317, lng: 46.542383 },
{ lat: 24.589770, lng: 46.541482 },
{ lat: 24.589497, lng: 46.541139 },
{ lat: 24.589175, lng: 46.540956 },
{ lat: 24.588819, lng: 46.540827 },
{ lat: 24.588180, lng: 46.540872 },
{ lat: 24.587595, lng: 46.541194 },
{ lat: 24.587185, lng: 46.541564 },
{ lat: 24.586951, lng: 46.542117 },


//stations//
{ lat: 24.585415, lng: 46.559856 },
    //stations//

{ lat: 24.583794, lng: 46.581049 },
{ lat: 24.583970, lng: 46.582642 },

{ lat: 24.584533, lng: 46.584128 },



{ lat: 24.585355, lng: 46.585405 },
{ lat: 24.585453, lng: 46.585812 },
{ lat: 24.585423, lng: 46.586279 },
{ lat: 24.585036, lng: 46.586889 },
{ lat: 24.584411, lng: 46.587260 },
{ lat: 24.582524, lng: 46.588483 },
{ lat: 24.573539, lng: 46.594856 },
{ lat: 24.573203, lng: 46.595457 },
{ lat: 24.573056, lng: 46.596278 },
//stations//
{ lat: 24.581186, lng: 46.612243 },
//stations//



{ lat: 24.583752, lng: 46.616405 },


//stations//
{ lat: 24.600548, lng: 46.643865 },
//stations//

//stations//
{ lat: 24.606692, lng: 46.653890 },
//stations//

{ lat: 24.613109, lng: 46.664498 },
{ lat: 24.613724, lng: 46.667008 },
{ lat: 24.613592, lng: 46.675115 },
{ lat: 24.612958, lng: 46.677850 },
{ lat: 24.612997, lng: 46.680688 },

//stations//
{ lat: 24.614879, lng: 46.686476 },
//stations//




{ lat: 24.617320, lng: 46.693255 },

//stations//
{ lat: 24.618363, lng: 46.697867 },
//stations//


{ lat: 24.618811, lng: 46.699294 },
{ lat: 24.621440, lng: 46.703403 },
{ lat: 24.624117, lng: 46.707807 },

//stations//
{ lat: 24.633903, lng: 46.725482 },
//stations//

//stations//
{ lat: 24.637129, lng: 46.731609 },
//stations//

//stations//
{ lat: 24.644577, lng: 46.738842 },
//stations//


//stations//
{ lat: 24.649389, lng: 46.740663 },
//stations//

//stations//
{ lat: 24.660645, lng: 46.744159 },
//stations//


{ lat: 24.667582, lng: 46.749068 },
{ lat: 24.669600, lng: 46.751069 },

//stations//
{ lat: 24.673135, lng: 46.760332 },
//stations//

{ lat: 24.675980, lng: 46.766673 },

//stations//
{ lat: 24.680165, lng: 46.779272 },
//stations//

{ lat: 24.683859, lng: 46.790805 },


//stations//
{ lat: 24.686087, lng: 46.795955 },
//stations//

{ lat: 24.692875, lng: 46.809533 },


{ lat: 24.701569, lng: 46.829683 },


//stations//
{ lat: 24.712671, lng: 46.847357 },
//stations//

//stations//
{ lat: 24.720428, lng: 46.858838 },
//stations//








];

var orangeStations = [

{ lat: 24.592313, lng: 46.543124 },


{ lat: 24.585415, lng: 46.559856 },


{ lat: 24.582524, lng: 46.588483 },


//stations//
{ lat: 24.581186, lng: 46.612243 },
//stations//


//stations//
{ lat: 24.600548, lng: 46.643865 },
//stations//

//stations//
{ lat: 24.606692, lng: 46.653890 },
//stations//


//stations//
{ lat: 24.614879, lng: 46.686476 },
//stations//




{ lat: 24.617320, lng: 46.693255 },

//stations//
{ lat: 24.618363, lng: 46.697867 },
//stations//

//stations//
{ lat: 24.633903, lng: 46.725482 },
//stations//

//stations//
{ lat: 24.637129, lng: 46.731609 },
//stations//

//stations//
{ lat: 24.644577, lng: 46.738842 },
//stations//


//stations//
{ lat: 24.649389, lng: 46.740663 },
//stations//

//stations//
{ lat: 24.660645, lng: 46.744159 },
//stations//

//stations//
{ lat: 24.673135, lng: 46.760332 },
//stations//


//stations//
{ lat: 24.680165, lng: 46.779272 },
//stations//

//stations//
{ lat: 24.686087, lng: 46.795955 },
//stations//



//stations//
{ lat: 24.712671, lng: 46.847357 },
//stations//

//stations//
{ lat: 24.720428, lng: 46.858838 },
//stations//


];
var labels = [ '2D2', '2E1', '2E2', '2F1', '2G1', '2C2', '2C3', '2f5', '3f1', '1f5','2A1', '2A2', '2A3', '2B1', '2B2', '2B4', '2C1', '2C2', '2C3']


// offset to postion the lables
var labelOrigin = [
new google.maps.Point(-10, -25), new google.maps.Point(-5, 12),
new google.maps.Point(-8, -25), new google.maps.Point(12, -5),
new google.maps.Point(-10, 12), new google.maps.Point(-10, -23),
new google.maps.Point(-10, 10), new google.maps.Point(-25, -20),
new google.maps.Point(-10, 10), new google.maps.Point(-28, -10),
new google.maps.Point(-10, 10), new google.maps.Point(-28, -5),
new google.maps.Point(12, 0), new google.maps.Point(-28, -5),
new google.maps.Point(-10, 10), new google.maps.Point(10, 0),
new google.maps.Point(-10, 10), new google.maps.Point(-10, 10),
new google.maps.Point(-10, 10),

]

// drawRoute(jslocations,labels,labelOrigin,"orange","#FFA500",map);

drawPolyAndRoute(orangeLineLocations, orangeStations, labels, labelOrigin, "orange", "#FFA500", map);

//-----------------------------------------------------------------------

}





export { initMap };
