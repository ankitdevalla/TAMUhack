// const fs = require('fs');

// //need filepath here
// const scanFile = (filepath) => {
//     fs.readFile(small.txt, (err, data) => {
//         if (err) {
//             console.error(err);
//             return;
//         }

//         // Create an empty hashmap
//         let hashMap = new Map();

//         // Split the file contents by new line
//         let lines = data.toString().split('\n');

//         // Iterate over each line and add the key-value pair to the hashmap
//         for (let line of lines) {
//             let [key, value] = line.split(',');
//             hashMap.set(key, value);
//         }
//     });
// }

const searchBar = document.getElementById("search-bar");
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
      cityScores[city + "," + state + "," + country] = score;
    });
    // Listen for the user input in the search bar
    searchBar.addEventListener("input", e => {
      const city = e.target.value;
      // Check if the city exists in the cityScores object
      if (cityScores[city]) {
        // If it does, update the score text box with the corresponding number
        scoreBox.value = cityScores[city];
      } else {
        // If it doesn't, clear the score text box
        scoreBox.value = "";
      }
    });
  });
  console.log(cityScores[Plano, TX, USA]);

