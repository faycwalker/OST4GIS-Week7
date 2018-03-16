/* ================================
Week 6 Assignment: Midterm Functions + Signatures
================================ */

var map = L.map('map', {
  center: [41.500, -81.6937],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


var dataset = "https://raw.githubusercontent.com/CPLN-692-401/datasets/master/geojson/philadelphia-garbage-collection-boundaries.geojson";
var featureGroup;

var myStyle = function(feature) {
  if (feature.properties.COLLDAY=="MON") {
    return {fillColor: 'red'};
  }
  if (feature.properties.COLLDAY=="TUE") {
    return {fillColor: 'yellow'};
  }
  if (feature.properties.COLLDAY=="WED") {
    return {fillColor: 'green'};
  }
  if (feature.properties.COLLDAY=="THU") {
    return {fillColor: 'orange'};
  }
  if (feature.properties.COLLDAY=="FRI") {
    return {fillColor: 'purple'};
  }
};

var showResults = function() {
  /* =====================
  This function uses some jQuery methods that may be new. $(element).hide()
  will add the CSS "display: none" to the element, effectively removing it
  from the page. $(element).show() removes "display: none" from an element,
  returning it to the page. You don't need to change this part.
  ===================== */
  // => <div id="intro" css="display: none">
  $('#intro').hide();
  // => <div id="results">
  $('#results').show();
};

//<h1 class="day-of-week">Day of Week</h1>

/*
var eachFeatureFunction = function(layer) {
  layer.on ('click', function () {
    if (layer.feature.properties.COLLDAY == "MON")
    $('#weekday').text(Monday)
  if (layer.feature.properties.COLLDAY == "TUE")
    $('#weekday').text(Tuesday)
  if (layer.feature.properties.COLLDAY == "WED")
    $('#weekday').text(Wednesday)
  if (layer.feature.properties.COLLDAY == "THU")
    $('#weekday').text(Thursday)
  if (layer.feature.properties.COLLDAY == "FRI")
    $('#weekday').text(Friday)
  });
*/
  var eachFeatureFunction = function(layer) {
    layer.on('click', function (event) {
      switch(layer.feature.properties.COLLDAY){
        case 'MON':
          $('.day-of-week').text('Monday');
          console.log ('hello');
          break;
        case 'TUE':
          $('.day-of-week').text('Tuesday');
          break;
        case 'WED':
          $('.day-of-week').text('Wednesday');
          break;
        case 'THU':
          $('.day-of-week').text('Thursday');
          break;
        case 'FRI':
          $('.day-of-week').text('Friday');
          break;
  }
/*
  layer.on('click', function (event) {
    /* =====================
    The following code will run every time a layer on the map is clicked.
    Check out layer.feature to see some useful data about the layer that
    you can use in your application.
    ===================== */
    console.log(layer.feature);
    showResults();
  });
};
//  });
//};

var myFilter = function(feature) {
  if (feature.properties.COLLDAY!=" ")
    return true
};

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      filter: myFilter
    }).addTo(map);

    // quite similar to _.each
    featureGroup.eachLayer(eachFeatureFunction);
  });
});
