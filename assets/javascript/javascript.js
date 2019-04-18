//render buttons
    //add buttons dynamically based on search

//on click of button information appears
//on click for gif, animate or pause

function displayAvengersInfo (){
    var avengerOne = $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=IGSweR176q5q7D7s6yL7pDUIBQQn6erc&q=" + avengerOne + "&limit=10&offset=0"

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log(queryURL)
            console.log(response.data[2].rating)
            console.log(response)
        var results = response.data
        for(var i=0; i<results.length; i++){
            var avengersDiv = $("<div>");
            var p = $("<p>").html(results[i].rating);
            var avengersImage = $("<img>");
            avengersImage.attr("src", results[i].images.fixed_height.url), "data-animate";
            avengersImage.attr("src", results[i].images.fixed_height_still.url, "data-still")
            avengersImage.addClass("gif")
            avengersDiv.append("rating" , p);
            avengersDiv.append(avengersImage);
            $("#avengers-view").prepend(avengersDiv);
        }
    })
}

var avengers = ["Thor", "Iron Man", "Captain America", "Hulk", "Hawkeye", "Black Widow"]

function renderButtons (){
    console.log(avengers)        
    $("#buttons-view").empty();
    for (var i = 0; i < avengers.length; i++) {
        var a = $("<button>");
        a.addClass("avengers-btn");
        a.attr("data-name", avengers[i]);
        a.text(avengers[i]);
        $("#buttons-view").append(a);

    }
}

$("#add-avenger").on("click", function(event) {
    event.preventDefault();
    var avengerSearch = $("#avengers-input").val().trim()
    avengers.push(avengerSearch)
    renderButtons()
    $("#avengers-input").val("")
})

$(".gif").on("click", function() {
var state = $(this).attr("data-state")
      console.log(state)

      if(state==="still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate")
      }
      else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
      }
    })

renderButtons()
$(document).on("click", ".avengers-btn", displayAvengersInfo);

