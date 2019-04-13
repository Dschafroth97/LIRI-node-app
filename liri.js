require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var input = process.argv;

// Global Variables
var operand = input[2];
var name = "";
for (var i = 3; i < input.length; i++) {

    if (i > 3 && i < input.length) {
        name = name + " " + input[i]
    }
    else {
        name += input[i];
    }
}


// Search function, expecting inputs from above
function search(operand, name) {

    // Start of If/Else statements to declare which search function to run
    // Movie search
    if (operand === "movie-this") {

        if (name === ""){
            name = "Mr. Nobody";
        } 

        axios.get("http://www.omdbapi.com?t=" + name + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                var response = response.data;
                console.log("Title: " + response.Title);
                console.log("Released: " + response.Year);
                console.log("IMDB rated: " + response.imdbRating);
                console.log("Rotten Tomatoes rated: " + response.Metascore);
                console.log("Country: " + response.Country);
                console.log("Language(s): " + response.Language);
                console.log("Short Plot: " + response.Plot);
                console.log("Actors: " + response.Actors);
            }
        );
    }

    // Concerts search
    else if (operand === "concert-this") {



        axios.get("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp").then(
            function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    console.log(name + " is coming to " +
                        response.data[i].venue.name + " in " +
                        response.data[i].venue.city + ", " +
                        response.data[i].venue.region + " on " +
                        moment(response.data[i].datetime).format("dddd, MMMM Do YYYY"));
                }
            }
        );
    }

    // Do What it says
    else if (operand === "do-what-it-says") {
        name = ""


        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            var splitString = data.split(",");
            var command = splitString[0];
            var name = splitString[1];


            search(command, name);
        });
    }
    
    // Spotify song search
    else if (operand === "spotify-this-song") {


        if (name === "") {
            name = "Smells Like Teen Spirit";
        }

        spotify.search({ type: 'track', query: name }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var data = data.tracks.items[0];
            console.log("Artist(s):" + data.artists[0].name);
            console.log("Song Name: " + data.name);
            console.log("Preview: " + data.href);
            console.log("Album: " + data.album.name);
        });
    }

}

// Running the function when file is called
search(operand, name);