//variables
var middleHeight;
var middleContentheight;
var movieView = 0;
var dotaView = 0;
var movies=null;
var matches=null;

$(document).ready(function(){	

	$.ajax({
	    'async': false,
	    'global': false,
	    'url': "./data/movies.json",
	    'dataType': "json",
	    'success': function (data) {
	        movies = data;        
	        console.log("loaded movie data");
	    }	    
	});

	$.ajax({
	    'async': false,
	    'global': false,
	    'url': "./data/matches.json",
	    'dataType': "json",
	    'success': function (data) {
	        matches = data.matches;        
	        console.log("loaded match data");
	    }	    
	});

	//Get last dota match and movie reviewed
	normalMoviesView();
	normalDotaView();

	//set height of instaWidget	and middleContent
	middleHeight = $("#middlePanel").height();	//middle column height	
	middleContentHeight = $("#middleContent").height() + 400;	//middle header height
	$("#middleContent").css({
		"max-height":middleContentHeight
	});	
	$("#rightPanel").height(middleHeight);
	$("#instaWidget").height(middleHeight-50);
	$("#codingLabel").height($("#codingBars").height());
	$("#designLabel").height($("#designBars").height());
	$("#characterLabel").height($("#characterBars").height());		

	$("#movieContent").on("click", "button", function() {
		if(movieView==0) {			
			movieView = 1;
			allMoviesView();			
		}
		else if(movieView==1) {			
			movieView = 0;
			normalMoviesView();
		}	
	});	

	$("#dotaContent").on("click", "button", function() {
		if(dotaView==0) {			
			dotaView = 1;
			allDotaView();			
		}
		else if(dotaView==1) {			
			dotaView = 0;
			normalDotaView();
		}	
	});	

});

function allMoviesView() {
	$("#moviesHeader").html("Movies I've watched");	
	var div = $("#movieContent");	
	div.empty();
	div.append("<button id='movieButton' style='border-radius: 5px; background-color: white; border: 3px solid #2e2e2e; float: right;'>Back to normal view</button><br><br>");	
	for (var i = 0; i < movies.length; i++) {
		movieBox(div, movies[i])
	}
}

function normalMoviesView() {
	$("#moviesHeader").html("Last movie I watched");
	$("#movieContent").empty();
	$("#movieContent").append("<button id='movieButton' style='border-radius: 5px; background-color: white; border: 3px solid #2e2e2e; float: right;'>See all my reviews</button><br><br><div id='movies' class='col-md-60' style='padding: 0px;'></div></div>");
	var div = $("#movies");
	movieBox(div, movies[0]);
}

function movieBox(div, movie) {
	div.append("<div class='col-md-60' style='background-color: #efefef; padding: 0;'><div id='poster" + movie.name.replace(/ /g, "_") + "' class='col-md-20' style='background-color: #efefef; height: 100%;'><img src='./images/posters/" + movie.name.toLowerCase().replace(/:\s*/g, "-").replace(/ /g, "_") + ".jpg' style='border: 1px solid black; max-width: 100%;'></img></div><div class='col-md-40' style='background-color: #efefef; padding-bottom: 20px;'><h3 style='margin: 0;'>" + movie.name + "<small>  " + movie.year + "</small></h3><br>" + movie.review + "</div></div>");
}

function normalDotaView() {
	$("#dotaHeader").html("My Last 10 Dota Games");
	$("#dotaContent").empty();
	$("#dotaContent").append("<button id='dotaButton' style='border-radius: 5px; background-color: white; border: 3px solid #2e2e2e; float: right;'>See all my matches</button><br><br><div id='matches' class='col-md-60' style='padding: 0px;'></div></div>");
	var div = $("#matches");
	for (var i = 0; i < 10; i++) {
		dotaBox(div, matches[i]);	
	}	
}

function allDotaView() {
	$("#dotaHeader").html("All My Dota Games");
	$("#dotaContent").empty();
	$("#dotaContent").append("<button id='dotaButton' style='border-radius: 5px; background-color: white; border: 3px solid #2e2e2e; float: right;'>Back to last 10 matches</button><br><br><div id='matches' class='col-md-60' style='padding: 0px;'></div></div>");
	var div = $("#matches");
	for (var i = 0; i < matches.length; i++) {
		dotaBox(div, matches[i]);	
	}	
}

function dotaBox(div, match) {
	if(match.win) {
		var win = "<small style='color: green;'> Won </small>";
	}
	else {
		var win = "<small style='color: red;'> Lost </small>";
	}
	var kda = match.kills + "/" + match.deaths + "/" + match.assists;
	div.append("<div class='col-md-60' style='border-radius: 20px; background-color: #efefef; padding: 10;'><div class='col-md-10' style='background-color: #efefef;'><div class='circle cover' style='background-image: url(" + match.hero_path + ");'></div></div><div class='col-md-50' style='background-color: #efefef; padding-bottom: 20px; height: 100px;'><h3 style='margin: 0;'>" + toTitleCase(match.hero.replace(/_/g, ' ')) + win + "</h3><br>" + kda + "</div>");
}

function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}