var map, marker;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
center: {lat: 31.9686, lng: -99.9018},
zoom: 5
  });
  var input = document.getElementById('search');
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);
  marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });
  document.getElementById('search-btn').addEventListener('click', function() {
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(15); 
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
  });
}

const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const scoreBox = document.getElementById("score-box");

fetch("cities.txt")
  .then(response => response.text())
  .then(data => {
    // Split the text file by newline
    const lines = data.split("\n");
    // Create an object to store the city-number pairs
    const cityScores = {};
    // Loop through each line and add the city-number pairs to the object
    lines.forEach(line => {
      const [city, state, country, score] = line.split(",");
      cityScores[city + ", " + state + ", " + country + ":"] = score;;
    });
    // Listen for the click event on the search button
    searchBtn.addEventListener("click", e => {
      const city = searchBar.value;
      scoreBox.value = "hi";
      // Check if the city exists in the cityScores object
      if (cityScores[city]) {
        // If it does, update the score text box with the corresponding number
        scoreBox.value = cityScores[city];
      } else {
        // If it doesn't, clear the score text box
        scoreBox.value += " bye";
      }
    });
  });

