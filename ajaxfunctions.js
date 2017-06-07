  /**
 * Uses AJAX to query an internet data source for zip codes
 * @param {string} songId  The element id that has the zip code
 */

 function getId(songId) {

    var song = document.getElementsByName(songId);
    var song_name = "";
    for(i = 0; i < song.length; i++){
        if(song[i].selected){
            song_name = song[i].value;
        }
    }


    console.log(song_name);
     var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if(this.status === 200) {
                // The request was successful!
                console.log("successful request!");
                displaySong(this.responseText);
            } else if (this.status === 404){
                // No strike number found
                 console.log("request failed");
                displaySong('{ "artist" : "none" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
        }
    };

        var url = " https://api.mixcloud.com/discover/funk/";
        httpRequest.open("GET", url, true);
        httpRequest.send();
    }

    function displaySong(data){
        var song = JSON.parse(data);
        if(song.songs === "none") {
            document.getElementById("output").className = "alert alert-warning";
            document.getElementById("output").innerHTML ="there are no songs for this artist"
        } else {
            document.getElementById("output").className = "alert alert-success";
            document.getElementById("output").innerHTML =song.text;
        }
    }



