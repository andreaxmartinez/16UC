/**
 * Uses AJAX to query an internet data source for zip codes
 * @param {string} zipId The element id that has the zip code
 */
function findMusic(music) {
    // First get the zip code from the HTML textbox
    var yourmusic = document.getElementById(music).value;
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if(this.status === 200) {
                // The request was successful!
                displayfindMusic(this.responseText);
            } else if (this.status === 404){
                // No postal code found
                displayfindMusic('{ "songs" : "none" }');
            } else {
                console.log("We have a problem: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };
    // Notice how the URL is appended with the zip code
    var url = "https://www.mixcloud.com/discover/funk/"
    httpRequest.open("GET", url, true);
    httpRequest.send();
}
/**
 * Displays the zip code place given the JSON data
 * @param {string} data JSON data representing place for given zip code
 */
function displayfindMusic(data){
    var music = JSON.parse(data);
    if(music.songs === "none") {
        document.getElementById("music").className = "alert alert-warning";
        document.getElementById("music").innerHTML = "The songs are" + music;
    } else {
        document.getElementById("music").className = "alert alert-success";
        document.getElementById("music").innerHTML ="there are no songs for this artist"
    }
}
