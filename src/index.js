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
  console.log("length", stationsCoordinates.length)
  
  
  var positions = new google.maps.LatLng(stationsCoordinates[i]);
  icon['labelOrigin'] = labelOrigin[i]
  console.log("index", i)
  console.log("label", labels[i])
  console.log("labelOrigin", labelOrigin[i])
  
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
  strokeOpacity: 1.0,
  strokeWeight: 7
  });
  
  LinePath.setMap(map);
  
  }
  
  
function initMap() {


  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 24.731488, lng: 46.707267 },
  });

  map.addListener("click", (mapsMouseEvent) => {

    // Close the current InfoWindow.

    // Create a new InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);
  });


  

    // Configure the click listener.

  
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
  {lat:24.701386355433627, lng:46.829881768713584 ,station:true},
  {lat:24.747361796216303, lng:46.797889373643635,station:true},

  { lat: 24.753265991550055, lng: 46.79316287248378,station:false },
  { lat: 24.75540534217121, lng: 46.791629791259766 ,station:false},
  { lat: 24.758030397849133, lng: 46.79045823515699,station:false },
  { lat: 24.767529017284062, lng: 46.78286318986659 ,station:false},
  { lat: 24.768464240441965, lng: 46.78217654435878,station:false },
  { lat: 24.769165653188217, lng: 46.78157572953944 ,station:false},
  { lat: 24.770646400419288, lng: 46.7806315919662,station:false },
  { lat: 24.771581600098614, lng: 46.779944946458386,station:false },
  { lat: 24.772828522046957, lng: 46.779000808885144 ,station:false},
  {lat:24.77660830265986, lng:46.77744458960821,station:true},
  {lat: 24.790982033805886, lng: 46.766830832251095,station:false },
  {lat: 24.79129371674012, lng: 46.76648750949719,station:false },
  {lat: 24.791527478426865, lng: 46.76623001743176,station:false },
  {lat: 24.791995000478824, lng: 46.76588669467785 ,station:false},
  {lat:24.793214958157993, lng:46.765599804146134,station:true},
  { lat: 24.793124557329612, lng: 46.76512584336726 ,station:false},
  { lat: 24.79308921739161, lng: 46.76491857799883,station:false },
  { lat: 24.79303708647995, lng: 46.76461283527769,station:false },
  { lat: 24.792980542534476, lng: 46.76428121068818 ,station:false},
  { lat: 24.79291294808864, lng: 46.76388477621701 ,station:false},
  { lat: 24.788579237028156, lng: 46.738766862670914,station:false },
  { lat: 24.788423392248937, lng: 46.738251878540055,station:false },
  { lat: 24.788384431023538, lng: 46.737736894409196 ,station:false},
  { lat: 24.788384431023538, lng: 46.737264825622574 ,station:false},
  { lat: 24.788267547273954, lng: 46.736749841491715,station:false },
  { lat: 24.78822858599962, lng: 46.73619194201662,station:false },
  { lat: 24.787955856736694, lng: 46.73584861926271,station:false },
  { lat: 24.78783897258335, lng: 46.73529071978761 ,station:false},
  { lat: 24.787761049753275, lng: 46.734775735656754,station:false },
  { lat: 24.78768312687427, lng: 46.73434658221437,station:false },
  { lat: 24.787566242463967, lng: 46.7337028520508 ,station:false},
  { lat: 24.78744935794357, lng: 46.73318786791994 ,station:false},
  { lat: 24.787137062289293, lng: 46.732389150104176,station:false },
  { lat: 24.787137062289293, lng: 46.732389150104176,station:false },
  { lat: 24.78701840514071, lng: 46.731711153735006,station:false },
  { lat: 24.786917022987073, lng: 46.73113186566078,station:false },
  {lat:24.786713414385222, lng:46.730128243579685,station:true},
{ lat: 24.786751086345177, lng: 46.730002641994645,station:false },
{ lat: 24.78685823109608, lng: 46.72994899781435,station:false },
{ lat: 24.786906933225012, lng: 46.72987389596193 ,station:false},
{ lat: 24.787004337425472, lng: 46.729777336437394,station:false },
{ lat: 24.78734072103406, lng: 46.72955110457607 ,station:false},
{ lat: 24.787374472689947, lng: 46.72944474251955,station:false },
{ lat: 24.787403693848002, lng: 46.72938036950319,station:false },
{ lat: 24.787491357280878, lng: 46.72930526765077,station:false },
{ lat: 24.78756928028034, lng: 46.729219436962296,station:false },
{ lat: 24.804984770984774, lng: 46.713168802311834,station:false },
  {lat:24.807277811187728, lng:46.71105588351672,station:true},
  {lat:24.800191798824756, lng:46.69383440815601,station:true},
  {lat:24.786279,lng: 46.660531,station:true},
  {lat: 24.76792624982181, lng: 46.64368043840547 ,station:true},






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
var labels=['2A1','2A2','2A3','2B1','2B2','2B4','2C1','2C2','2C3','2D2','2E1','2E2','2F1','2G1']


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
  {lat: 24.64530273122771, lng: 46.71570998231822,station:true},
  {lat: 24.645638415934847, lng: 46.71615255161291 ,station:false },
  { lat: 24.646225404610654, lng: 46.71682633916422 ,station:false},
  { lat: 24.64631197242046, lng: 46.716861485222125  ,station:false},
  {lat: 24.64741273260203, lng: 46.716879845263655,station:false},
  {lat: 24.64842686846677, lng: 46.71694421828001,station:false},
  {lat: 24.649616517348264, lng: 46.716665268542464,station:false},
  {lat: 24.650923167811847, lng: 46.71645069182127,station:false},
  {lat: 24.652034785052646, lng: 46.71634340346068,station:false},
  {lat:24.652755004875484, lng:46.716111560123416,station:true},
  {lat:24.6784544889062, lng:46.71832814266125,station:true},
  {lat:24.68657560389134, lng:46.71821834918483,station:true},
  {lat:24.69763332233779, lng:46.71806251934823,station:true},
  {lat:24.70606806622423, lng:46.71457730992477,station:true},
  {lat:24.710643876278194, lng:46.7070047193485,station:true},
  { lat: 24.710281573540016, lng: 46.705292894165055 ,station:false},
  { lat: 24.71039853065271,lng: 46.70666353204645,station:false },
  { lat: 24.710320559256452,lng: 46.7063845823089 ,station:false},
  { lat: 24.710281573540016,lng: 46.706009073046815,station:false },
  { lat: 24.710223094942464,lng: 46.70563356378473,station:false },
  { lat: 24.71021334850688,lng: 46.70534388521112,station:false },
  {lat: 24.711271785708025, lng: 46.70433749211263,station:false },
  { lat: 24.71283119244174, lng: 46.70485247624349 ,station:false},
  { lat: 24.714240060926514, lng: 46.7063763794868 ,station:false},
  { lat: 24.71610588300336, lng: 46.707942381028644,station:false },
  { lat: 24.717353361510323, lng: 46.70777071965169 ,station:false},
  {lat: 24.719520846927995, lng: 46.707567407409684 ,station:false },
  { lat: 24.729473236203553, lng: 46.704855572838184,station:false },
  { lat: 24.72988590272596, lng: 46.705092744490265,station:false },
  { lat: 24.731133243094387, lng: 46.70500691380179,station:false },
  { lat: 24.732224655656672, lng: 46.70492108311331 ,station:false},
  { lat: 24.73316014451658, lng: 46.70492108311331 ,station:false},
  { lat: 24.73432949569711, lng: 46.70466359104788 ,station:false},
  { lat: 24.735654747077824, lng: 46.70449192967093,station:false },
  { lat: 24.738149299601965, lng: 46.70320446934378 ,station:false},
  {lat:24.742620780251272, lng:46.70131266397654,station:true},



  



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
new google.maps.Point(-20, 10),new google.maps.Point(12, -5),
new google.maps.Point(-10, 12),new google.maps.Point(-10, -23),
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
var labels = ['2A1', '2A2', '2A3', '2B1', '2B2', '2B4', '2C1', '2C2', '2C3', '2D2', '2E1', '2E2', '2F1', '2G1', '2C2', '2C3', '2f5', '3f1', '1f5']


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
