/******Neighborhood Map*******/
'use strict';
var map;
var markers = [];
var cityNames = ko.observableArray();
var oninfoWindow;
var marker="";

/* Model Data(Locations)*/
var locations = [
                  {
                    title: 'Mumbai',
                    wikipediaName: "Mumbai",
                    location: {lat: 18.921975,lng: 72.834649},
                    visible: ko.observable(true),
                    id: "city1"
                }, {
                    title: "Pune",
                    wikipediaName: "Pune",
                    location: {lat: 18.519574,lng: 73.855376},
                    visible: ko.observable(true),
                    id: "city2"
                  }, {
                    title: "Karad",
                    wikipediaName: "Karad",
                    location: {lat: 17.294457,lng: 74.177279},
                    visible: ko.observable(true),
                    id: "city3"
                  }, {
                    title: "Kolhapur",
                    wikipediaName: "Kolhapur",
                    location: {lat: 16.694870,lng: 74.222946},
                    visible: ko.observable(true),
                    id: "city4"
                }, {
                    title: "Aurangabad",
                    wikipediaName: "Aurangabad",
                    location: {lat: 19.901538,lng: 75.320206},
                    visible: ko.observable(true),
                    id: "city5"
                }, {
                    title: "Nashik",
                    wikipediaName: "Nashik",
                    location: {lat: 20.043261,lng: 73.83909},
                    visible: ko.observable(true),
                    id: "city6"
                }, {
                    title: "Nagpur",
                    wikipediaName: "Nagpur",
                    location: {lat: 21.128300,lng: 79.066887},
                    visible: ko.observable(true),
                    id: "city7"
                }

            ];

//maps error handling function
var Timermap = setTimeout(function() {
                        $('.map-errors').html('Something is wrong>>Map ERROR!');
                        }, 5500);

function initMap() {
  //***styling map***//
    var styles = [
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers"   : [
                                      {"visibility": "on" },
                                      {"color": "#aee2e0"  }
                                      ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry.fill",
                        "stylers"    :  [
                                        { "color": "#abce83"}
                                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry.fill",
                        "stylers"    : [
                                        {"color": "#769E72"  }
                                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers"    : [
                                        {"color": "#7B8758"}
                                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.stroke",
                        "stylers"    : [
                                        {"color": "#EBF4A4"}
                                       ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers"    : [
                                        {"visibility": "simplified"  },
                                        {  "color": "#8dab68"  }
                                       ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry.fill",
                        "stylers"    : [
                                        {"visibility": "simplified"}
                                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers"    : [
                                        {"color": "#5B5B3F" }
                                       ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.stroke",
                        "stylers"    : [
                                        {"color": "#ABCE83"}
                                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.icon",
                        "stylers"    : [
                                        {  "visibility": "off"}
                                       ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers"    : [
                                        {  "color": "#A4C67D"}
                                       ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers"    : [
                                        {"color": "#9BBF72"}
                                       ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers"    : [
                                        {"color": "#EBF4A4"}
                                       ]
                    },
                    {
                        "featureType": "transit",
                        "stylers"    : [
                                        {"visibility": "off"}
                                       ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers"    : [
                                        {  "visibility": "on"  },
                                        {  "color": "#87ae79"  }
                                       ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers"    : [
                                        {  "color": "#7f2200"  },
                                        {  "visibility": "off"}
                                       ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.stroke",
                        "stylers"    : [
                                        {  "color": "#ffffff"  },
                                        {  "visibility": "on"  },
                                        {  "weight": 4.1}
                                       ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers"    : [
                                        {  "color": "#495421"}
                                       ]
                    },
                    {
                        "featureType": "administrative.neighborhood",
                        "elementType": "labels",
                        "stylers"    : [
                                          {"visibility": "off"}
                                       ]
                    }
                ];

  clearTimeout(Timermap);
      var bounds = new google.maps.LatLngBounds(
                            new google.maps.LatLng(15.407763, 70.478687),
                            new google.maps.LatLng(22.385044, 80.586671)
                        );
      map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: 18.403723,lng: 75.140991},
                    zoom: 10,
                    styles: styles
          });

      map.fitBounds(bounds);

  //Calling functions to display markers.
      displayLoc(locations);
      setallLoc();

      $(window).resize(function() {
              map.fitBounds(bounds);
      });
}

/* Set makers on map */
    function setallLoc() {
              var bounds = new google.maps.LatLngBounds();
              for (var i = 0; i < markers.length; i++) {
                    if(markers[i].visible === true) {
                       markers[i].setMap(map);
                      } else {
                       markers[i].setMap(null);
                      }
                    bounds.extend(markers[i].position);
              }
              map.fitBounds(bounds);
       }

/* Creating markers  for each location*/
    function displayLoc() {
                var image = 'mark2.png';
                for (var i = 0; i < locations.length; i++) {
                      // Get the position from the location array.
                      var position = locations[i].location;
                      var title = locations[i].title;
                      var id = locations[i].id;
                      var marker = new google.maps.Marker({
                                    position: position,
                                    title: title,
                                    animation: google.maps.Animation.DROP,
                                    id: id,
                                    icon: image

                            });
                      // Push the marker to markers array.
                      markers.push(marker);
                      cityNames.push(marker.title);

                      var largeInfowindow = new google.maps.InfoWindow();
                      // Code to infowindow at each marker.
                      marker.addListener('click', function() {
                              populateInfoWindow(this, largeInfowindow);
                           });

                   }

           }

//*****Following code is taken from udacity course*****//
// Following function generate the infowindow on clicking the marker.
function populateInfoWindow(marker, infowindow) {
                  var myinfo="";
                  infowindow.close();
                  // Move map viewport to center selected marker
                  map.panTo(marker.position);
                  // Check to make sure the infowindow is not already opened on this marker.
                  if (infowindow.marker != marker) {
                                // Clear the infowindow content to give the streetview time to load.
                                infowindow.setContent('');
                                infowindow.marker = marker;

                               //set animation to marker.
                        	      infowindow.marker.setAnimation(google.maps.Animation.BOUNCE);
                                setTimeout(function() {
                                                        infowindow.marker.setAnimation(null);
                                                      }, 1500);

                                // Make sure the marker property is cleared if the infowindow is closed.
                                infowindow.addListener('closeclick', function() {
                                                                                  infowindow.marker = null;
                                                                                  map.fitBounds(bounds);
                                                                                });
                                var streetViewService = new google.maps.StreetViewService();
                                var radius = 50;

                                // In case the status is OK, which means the pano was found, compute the
                                // position of the streetview image, then calculate the heading, then get a
                                // panorama from that and set the options
                                function getStreetView(data, status) {
                                    	 var article="";
                                       if (status == google.maps.StreetViewStatus.OK) {
                                           var nearStreetViewLocation = data.location.latLng;
                                           var heading = google.maps.geometry.spherical.computeHeading(
                                                      nearStreetViewLocation, marker.position);
                                            //***Wikipedia API***//
                                            var wikiName = marker.title;
                                            var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
                                                           wikiName + '&format=json&callback=wikiCallback';

                                            /**Wikipedia error handling**/
                                            var Timerwiki = setTimeout(function(){
                                                                   $('.Wiki-errors').html('Oops>>Wikipedia is not working!!');
                                                            },6500);

                                            $.ajax({
                                        			        async: false,
                                                      url: wikiUrl,
                                                      dataType: "jsonp"
                                                      }).success(function(response){
                                                             article = response[2][0];
                                                             myinfo=article;

                                      					          });

                                            setTimeout(function(){
                                                    if(myinfo=='')
                            														{
                            															alert('Oops>>Wiki not found!!');
                            														}
                                                  infowindow.setContent('<div>' + marker.title + '</div>'+'<div id="pano"></div>'+myinfo );
                                                     var panoramaOptions = {
                                                                      position: nearStreetViewLocation,
                                                                      pov: {
                                                                            heading: heading,
                                                                            pitch: 30
                                                                          }
                                                                      };
                                                         var panorama = new google.maps.StreetViewPanorama(
                                                                   document.getElementById('pano'), panoramaOptions);

                                                         }, 900);


                                                    }
                                                   else {
                              														if(myinfo=='')
                                  														{
                                  															alert('Oops>>Wiki not found!!');
                                  														}
                                                        infowindow.setContent('<div>' + marker.title + '</div>' +
                                                        '<div>No Street View Found</div>'+ myinfo);
                                                    }

                                            }

                              // Use streetview service to get the closest streetview image within
                              // 50 meters of the markers position

							streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);

                              // Open the infowindow on the correct marker.
                              infowindow.open(map, marker);
                              map.setZoom(9);
                }

          }

      /***** Toggle Function *****/

      function Togglelist() {
                            $(this).toggleClass("toggled");
                            $("#list_view").toggle("fast", function() {});
                    }

      //******* View model ********//

      function Model() {
                var self = this;
                self.locationfilter = ko.observable('');
                ko.computed(function() {
                          var filter = self.locationfilter().toLowerCase();
                          return ko.utils.arrayFilter(locations, function(item) {
                                    if (item.title.toLowerCase().indexOf(filter) >= 0) {
                                           for (var i = 0; i < markers.length; i++)  {
                                                 if( markers[i].id == item.id) {
                                                    markers[i].visible=true;
                                                  }
                                              }
                                            return item.visible(true);
                                        }
                                       else {
                                             for (var i = 0; i < markers.length; i++){
                                                 if( markers[i].id == item.id) {
                                                  markers[i].visible=false;
                                               }
                                            }
                                          setallLoc();
                                          return item.visible(false);
                                        }
                                 });

                         });
                self.showLocinfo = function(place) {
                                   var bounds = new google.maps.LatLngBounds();
                                   for (var i = 0; i < markers.length; i++) {
                                              if (markers[i].title == place) {
                                                     if (oninfoWindow) {         // Close an opened infowindow
                                                           oninfoWindow.close();
                                                         }
                                                     else {
                                                            oninfoWindow = new google.maps.InfoWindow();
                                                        }
                                                         populateInfoWindow(markers[i], oninfoWindow);
                                                         bounds.extend(markers[i].position);
                                                  }
                                            }
                                     };

                           }

        // Binding knockout
        ko.applyBindings(new Model());
