// API Docs at:
// https://developer.spotify.com/technologies/web-api/search/

$(document).ready(function(){
  $(".submit").on("click", function(event) {
    event.preventDefault();
    $("#results").empty();
    var keyword = $("#search-keyword").val();
    var searchType = $("#search-type").val();
    if (searchType == "artist")  {
      searchByArtist(keyword);
    } else {
      searchByTrack(keyword);
    }
  });
});

function searchByArtist(keyword) {
  var url = 'http://ws.spotify.com/search/1/artist.json?q='+keyword;
  $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      console.log("Ajax request success!")
      var artists = response.artists;
      for (i = 0; i < artists.length; i++) {
        $("#results").append("<li><a href='" + artists[i].href + "'>" + artists[i].name + "</a>")
      };
    }).fail(function(){
      console.log("Ajax request failed!")
      $(".results").append("<li>Request failed</li>");
    }).always(function(){
      console.log("This always happens regardless of successful ajax request or not.")
    });


}


function searchByTrack(keyword) {
  var url = 'http://ws.spotify.com/search/1/track.json?q='+keyword;
  $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      console.log("Ajax request success!")
      var tracks = response.tracks;
      for(i = 0; i < tracks.length; i++) {
        $("#results").append(tracks[i].name + '<iframe class="player" src="https://embed.spotify.com/?uri=' + tracks[i].href + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
      };
    }).fail(function(){
      console.log("Ajax request failed!")
      $("body").append("<li>Request failed</li>");
    }).always(function(){
      console.log("This always happens regardless of successful ajax request or not.")
    });
};

// <li class='track'><a href='" + tracks[i].href + "'>" + tracks[i].name + "</a>
// .append('<iframe class="player" src="https://embed.spotify.com/?uri=' + spotifyTrack + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
