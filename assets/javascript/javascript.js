$(document).ready(function(){
	var isPlaying;
	var selectedButton;
	var imageObject;
	var imageID = 0;
	var isClicked = false;
	var topics = ["League of Legends", "World of Warcraft", "Call of Duty", "Pokemon", "Borderlands", "Minecraft", "GTAV", "Super Smash Bros", "Undertale", "Dark Souls"];
	for (i = 0; i < topics.length; i++){
		$("#buttons").append("<button id=" + "'printedButtons'" + ">" + topics[i] + "</button>");
	}
	$(document).on("click", "#printedButtons", function(){
		$("#images").empty();
		selectedButton = $(this).text();
		$.ajax({
			url: "https://api.giphy.com/v1/gifs/search?api_key=c5039a1247684d6e9d3eb780a5db6673&q=" + selectedButton + "&limit=10&offset=0&rating=G&lang=en",
			method: "get"
		})
		.done(function(response){
			for (i = 0; i < 10; i++){
				var gameDiv = $("<div id=" + "'gifs'" + "></div>");
				$("#images").append(gameDiv);
				$(gameDiv).append("<a id='" + i + "'><img src=" + response.data[i].images.fixed_height_still.url + " data-playing=" + "'stopped'" +"></a>");
				$(gameDiv).append("<p>Rating: " + response.data[i].rating + "</p>");
			};
			imageObject = response;
		});
	})
	$(document).on("click", "a", function(){
				imageID = $(this).attr("id");
				var clickedImage = $(this).children();
				isPlaying = $(clickedImage).attr("data-playing");
				console.log(imageID);
				if(isPlaying == "stopped"){
					playGif();
				}
				else{
					stopGif();
				}
		})
	function playGif(){
			$("#" + imageID).html("<img src=" + imageObject.data[imageID].images.fixed_height.url +  " data-playing=" + "'playing'" +">");
			console.log(isPlaying);
			console.log(imageID);
	}
	function stopGif(){
			$("#" + imageID).html("<img src=" + imageObject.data[imageID].images.fixed_height_still.url + " data-playing=" + "'stopped'" +">");
			console.log(isPlaying);
			console.log(imageID);
	}
	$("#addGame").on("click", function(){
		var userInput = $("#newGame").val().trim();
		topics.push(userInput);
		$("#buttons").append("<button id=" + "'printedButtons'" + ">" + userInput + "</button>");
		console.log($("#newGame").val().trim());
	})
})