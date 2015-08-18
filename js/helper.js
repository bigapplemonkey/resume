/*

This file contains all of the code running in the background that makes resumeBuilder.js possible. We call these helper functions because they support your code in this course.

Don't worry, you'll learn what's going on in this file throughout the course. You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.

Cameron Pittman
*/
/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/
var HTMLbioPic = '<div class="col-xs-12 col-sm-6 col-md-5 photo-title"><div class="photo-container"><img class="img-responsive img-circle biopic" src="%data%" alt="Profile photo"></div>';
var HTMLheaderName = '<div class="name-role"><h1 class="text-uppercase name-header">%data%</h1>';
var HTMLheaderRole = '<h2 class="role-header">%data%</h2></div></div>';
var HTMLheaderWelcomeMsg = '<div class="col-xs-12 col-sm-6 col-md-4 welcome-message text-left">%data%</div>';


var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item text-uppercase"><a href="mailto:%data%">%data%</a><a class="anchor" id="contactSection"></a></li>';
var HTMLmobile = '<li class="flex-item text-uppercase"><a href="tel:%data%">%data%</a></li>';
var HTMLlocation = '<li class="flex-item text-uppercase">%data%</li>';
var HTMLgithub = '<li class="social-item"><a href="https://github.com/%data%" target="_blank"><span class="entypo-github social-icon"></span></a></li>';
var HTMLtwitter = '<li class="social-item"><a href="https://twitter.com/%data%" target="_blank"><span class="entypo-twitter social-icon"></span></a></li>';
var HTMLlinkedin = '<li class="social-item"><a href="https://www.linkedin.com/in/jorgeasuaje" target="_blank"><span class="entypo-linkedin-circled social-icon"></span></a></li>';
var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';


var HTMLskillsStart = '<div class="col-xs-12 section-title"><h2>Skills at a Glance</h2></div><div class="col-xs-12"><ul id="skills" class="flex-box"></ul></div><div class="col-xs-12"><hr></div>';
var HTMLskills = '<li class="skill-item flex-box"><span class="rating-text text-capitalize">%data%</span>' +
'<div class="rating-icons"><span class="entypo-thumbs-up rating-icon"></span><span class="entypo-thumbs-up rating-icon"></span>' +
'<span class="entypo-thumbs-up rating-icon"></span><span class="entypo-thumbs-up rating-icon"></span>' +
'<span class="entypo-thumbs-up rating-icon"></span></div></li>';

var HTMLworkStart = '<div class="work-entry col-xs-12 col-sm-9"></div><div class="hidden-xs col-sm-3 empty-space"></div>';
var HTMLworkEmployer = '<a class="entry-title" href="%data%" target="_blank">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text flex-item"><span class="entypo-location location-icon"></span>%data%</div>';
var HTMLworkDescription = '<p><br><br>%data%</p>';

var HTMLprojectStart = '<div class="project-entry col-xs-12 col-sm-9"></div><div class="hidden-xs col-sm-3 empty-space"></div>';
var HTMLprojectTitle = '<a class="flex-item entry-title" href="%data%" target="_blank">%data%</a>';
var HTMLprojectDates = '<div class="date-text flex-item">%data%</div>';
var HTMLprojectDescription = '<p class="project-text"><br>%data%</p>';
var HTMLprojectImage = '<img class="img-responsive project-photo center-block light-border" src="%data%" alt="Project photo">';
var HTMLprojectImageWithCaption = '<div class="photo-with-caption effect light-border center-block"><p class="caption-text">%data%</p>' +
'<img class="photo-effect limit-image img-responsive" src="%data%" alt="Project Photo"/></div>'

var HTMLschoolStart = '<div class="education-entry col-xs-12 col-sm-9"></div><div class="hidden-xs col-sm-3 empty-space"></div>';
var HTMLschoolName = '<a class="flex-item entry-title" href="%data%" target="_blank">%data%';
var HTMLschoolDegree = ' - %data%</a>';
var HTMLschoolMajor = '<div class="flex-item"><em>Major: %data%</em></div>';
var HTMLschoolLocation = '<div class="location-text flex-item"><span class="entypo-location location-icon"></span>%data%</div>';
var HTMLschoolDates = '<div class="date-text flex-item">%data%</div>';

var HTMLonlineSchoolStart = '<div class="col-xs-12 col-sm-9 online-title"><h3>Online Classes</h3></div><div class="hidden-xs col-sm-3"></div>';
var HTMLonlineClasses = '<div class="online-education-entry col-xs-12 col-sm-9"></div><div class="hidden-xs col-sm-3 empty-space"></div>';
var HTMLonlineTitle = '<a class="entry-title" href="%data%" target="_blank">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text flex-item">%data%</div>';
var HTMLonlineURL = '<br><a class="example-link" href="%data%">%data%</a>';

var HTMLfooterStart = '<div class="row"><div class="col-xs-4 col-sm-2 text-left footer-name">' +
'<a href="#main"><h1 class="text-uppercase bottom-mark">%data%</h1></a></div><div class="col-xs-8 col-sm-3 pull-right">' +
'<ul id="footerContacts" class="flex-box"></ul></div></div>'
var HTMLfooterEmail = '<li class="contact-item hidden-xs text-uppercase"><a href="mailto:%data%" class="text-muted">%data%</a></li>';
var HTMLfooterMobile = '<li class="contact-item hidden-xs"><a href="tel:%data%" class="text-muted">%data%</a></li>';
var HTMLfooterLocation = '<li class="contact-item hidden-xs text-uppercase text-muted">%data%</li>';
var HTMLfooterGithub = '<li class="social-contact-item"><a href="https://github.com/%data%" target="_blank"><span class="entypo-github social-icon text-muted"></span></a></li>';
var HTMLfooterTwitter = '<li class="social-contact-item"><a href="https://twitter.com/%data%" target="_blank"><span class="entypo-twitter social-icon text-muted"></span></a></li>';
var HTMLfooterLinkedin = '<li class="social-contact-item"><a href="https://www.linkedin.com/in/%data%" target="_blank"><span class="entypo-linkedin-circled social-icon text-muted"></span></a></li>';


var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map" class="col-sm-12 light-border"></div>';


/*
The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
  $('button').click(function() {
    var iName = inName() || function() {};
    $('#name').html(iName);
  });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
clickLocations = [];

function logClicks(x, y) {
  clickLocations.push({
    x: x,
    y: y
  });
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
  logClicks(loc.pageX, loc.pageY);
});


/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map; // declares a global map variable
var infobox; // declares a global infobox variable
var marker;
//style for the pop-up infobox.
var pop_up_info = 'border: 1px solid #ccc; background-color: #ffffff; padding: 16px; margin-top: 8px;';
var bounceTimer;

/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations = [];
  //data for display with each marker
  var texts = [];
  var urls = [];
  var images = [];
  var locationIndex = 0; //index to iterate through locations
  //save information of location being processed
  var currentLocation = {
    name: '',
    url: '',
    image: '',
    text: ''
  }

  //Object describing map style.
  var styleMap = [{
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "administrative.country",
    "elementType": "geometry",
    "stylers": [{
      "visibility": "on"
    }]
  }, {
    "featureType": "administrative.province",
    "elementType": "geometry",
    "stylers": [{
      "visibility": "on"
    }]
  }, {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#736c68"
    }]
  }, {
    "featureType": "administrative.country",
    "elementType": "geometry",
    "stylers": [{
      "color": "#D1D1D1"
    }]
  }, {
    "featureType": "poi",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "transit",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "road",
    "stylers": [{
      "visibility": "on"
    }]
  },
  {
    "featureType": "road.highway",
    "stylers": [
    { "visibility": "off" }
    ]
  }, {
    "featureType": "landscape",
    "stylers": [{
      "color": "#F6EDED"
    }]
  }, {
    "featureType": "water",
    "stylers": [{
      "visibility": "on"
    }, {
      "color": "#b4e4e0"
    }]
  }];

  var styledMap = new google.maps.StyledMapType(styleMap, {
    name: 'Map Style'
  });

  //The degree to which the map is zoomed in. This can range from 0 (least zoomed) to 21 and above (most zoomed).
  var mapZoom = 2;
  //The max and min zoom levels that are allowed.
  var mapZoomMax = 12;
  var mapZoomMin = 2;


  var mapOptions = {
    //commented in case I decide to disable in the future
    // disableDefaultUI: true,
    zoom: mapZoom,
    //The type of map. In addition to ROADMAP, the other 'premade' map styles are SATELLITE, TERRAIN and HYBRID.
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    maxZoom: mapZoomMax,
    minZoom: mapZoomMin,
    panControl: true,
    mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ['map_styled']
    }
  };

  //Create logo panel which appears on the right-hand side.
  var logoPanelDiv = document.createElement('div');
  var mapLogoPanel = new createLogoPanel(logoPanelDiv, map);

  // This next line makes `map` a new Google Map JavaScript Object and attaches it to
  // <div id="map">, which is appended as part of an exercise late in the course.
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);

  //Assigning the style defined above to the map.
  map.mapTypes.set('map_styled', styledMap);
  //Setting the one of the styles to display as default as the map loads.
  map.setMapTypeId('map_styled');

  //Continuously listens out for when the zoom level changes and closes the active
  //infobox when the map is zoomed out
  google.maps.event.addListener(map, "zoom_changed", function() {
    var newZoom = map.getZoom();
    if (infobox && newZoom < 11) {
      infobox.close();
      if (marker.getAnimation() != null) {
        marker.setAnimation(null);
      }
    }
  });

  //Add the control panel and reset button (created previously) to the map.
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(logoPanelDiv);

  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];
    var inArray; //to check if locations was included

    // adds the location property from bio to the locations array
    locations.push(bio.contacts.location);
    texts.push(bio.contacts.locationText);
    urls.push(bio.contacts.locationURL);
    images.push(bio.contacts.locationImage);

    // iterates through school locations and appends each location to
    // the locations array
    for (var school in education.schools) {
      inArray = $.inArray(education.schools[school].location, locations);
      if(inArray == -1) {
        locations.push(education.schools[school].location);
        texts.push(education.schools[school].locationText);
        urls.push(education.schools[school].locationURL);
        images.push(education.schools[school].locationImage);
      }
    }

    // iterates through work locations and appends each location to
    // the locations array
    for (var job in work.jobs) {
      inArray = $.inArray(work.jobs[job].location, locations);
      if(inArray == -1) {
        locations.push(work.jobs[job].location);
        texts.push(work.jobs[job].locationText);
        urls.push(work.jobs[job].locationURL);
        images.push(work.jobs[job].locationImage);
      }
    }

    return locations;
  }

  /*
  createMapMarkerAndInfoBox(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarkerAndInfoBox(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat(); // latitude from the place service
    var lon = placeData.geometry.location.lng(); // longitude from the place service
    var name = placeData.formatted_address; // name of the place from the place service
    var bounds = window.mapBounds; // current boundaries of the map window

    currentLocation.name = locations[locationIndex];
    currentLocation.url = urls[locationIndex];
    currentLocation.text = texts[locationIndex];
    currentLocation.image = images[locationIndex];

    //to track the location in other arrays
    locationIndex++;


    // marker is an object with additional data about the pin for a single location
    var markerIcon = {
      url: 'images/marker50.png',
      //The point on the image to measure the anchor from. 0, 0 is the top left.
      origin: new google.maps.Point(0, 0),
      //The x y coordinates of the anchor point on the marker. e.g. If your map marker was a drawing pin then the anchor would be the tip of the pin.
      anchor: new google.maps.Point(5.7, 50)
    };

    marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name,
      icon: markerIcon,
      zIndex: 102
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    //Creates the information to go in the pop-up info box.
    var boxText = document.createElement("div");
    boxText.style.cssText = pop_up_info;
    boxText.innerHTML = '<img class="center-block img-responsive marker-photo light-border" src="'  +  currentLocation['image'] +
    '"><h4 class="pop-up-header"><a href="' + currentLocation['url'] + '" target="_blank">' +  currentLocation['name'] +
    '</a></h4><p class="pop-up-text">' + currentLocation['text'] + '</p>';

    //Sets up the configuration options of the pop-up info box.
    var infoboxOptions = {
      content: boxText,
      disableAutoPan: false,
      maxWidth: 0,
      pixelOffset: new google.maps.Size(-241, 0),
      zIndex: null,
      boxStyle: {
        background: "url('images/pop_up_box_top_arrow.png') no-repeat",
        opacity: 1,
        width: "330px"
      },
      closeBoxMargin: "10px 2px 2px 2px",
      closeBoxURL: "images/button_close.png",
      infoBoxClearance: new google.maps.Size(1, 1),
      isHidden: false,
      pane: "floatPane",
      enableEventPropagation: false
    };

    //Creates the pop-up infobox, adding the configuration options set above.
    infobox = new InfoBox(infoboxOptions);

    // hmmmm, I wonder what this is about...
    //Add an 'event listener' to the map marker to listen out for when it is clicked.
    google.maps.event.addListener(marker, "click", function(e) {
      //adding bouncing animation
      if (this.getAnimation() == null || typeof this.getAnimation() === 'undefined') {
        this.setAnimation(google.maps.Animation.BOUNCE);
      }
      //Open the info box.
      infobox.open(map, this);
      //Changes the z-index property of the marker to make the marker appear on top of other markers.
      this.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
      //Zooms the map.
      setZoomWhenMarkerClicked();
      //Sets the marker to be the center of the map.
      map.setCenter(new google.maps.LatLng(marker.getPosition()["G"] - 2, marker.getPosition()["K"]));
    });

    google.maps.event.addListener(infobox, "closeclick", function(e) {
      //removing bouncing animation
      if (marker.getAnimation() != null) {
        marker.setAnimation(null);
      }
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarkerAndInfoBox(results[0]);
    }
  }

  function setZoomWhenMarkerClicked() {
    map.setZoom(11);
  }

  function createLogoPanel(logoPanelDiv) {
    logoPanelDiv.style.padding = '0px';
    var controlUI = document.createElement('div');
    controlUI.style.border = '0px solid white';
    controlUI.style.margin = '10px';
    logoPanelDiv.appendChild(controlUI);

    //Map title
    var titleBar = document.createElement('div');
    titleBar.style.backgroundColor = '#fef7f7';
    titleBar.style.cssFloat = 'right';
    titleBar.innerHTML = '<img src="images/mapLogo.png"/>';
    controlUI.appendChild(titleBar);

  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
    for (var place in locations) {

      // the search request object
      var request = {
        query: locations[place]
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    }
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  // Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});