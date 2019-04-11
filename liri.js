require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var spotify = require("node-spotify-api");
var input = process.argv;


function search(operand, name) {

    if (operand === "movie-this") {



        axios.get("http://www.omdbapi.com?t=" + name + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("The title is: " + response.data.Title);
                console.log(name + " was released in " + response.data.Year);
                console.log("IMDB rated " + name + " a " + response.data.imdbRating);
                console.log("Rotten Tomatoes rated " + name + " a " + response.data.Metascore);
                console.log(name + " was made in " + response.data.Country);
                console.log(name + " is in " + response.data.Language);
                console.log("The plot is: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            }
        );
    }
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
    else if (operand === "do-what-it-says") {
        name = ""


        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            }
            console.log(data);
            var splitString = data.split(",");
            console.log(splitString);
            var command = splitString[0];
            var name = splitString[1];


            search(command, name);
        });
    }
}

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

search(operand,name);