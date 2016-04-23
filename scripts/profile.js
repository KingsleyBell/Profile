//variables
var middleHeight;
var middleContentheight;
var movieView = 0 
var movies=null;

$(document).ready(function(){	

	$.ajax({
	    'async': false,
	    'global': false,
	    'url': "./resources/movies.json",
	    'dataType': "json",
	    'success': function (data) {
	        movies = data;        
	        console.log("loaded movie data");
	    }	    
	});	

	normalView();

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

	$("#middleContent").on("click", "button", function() {
		if(movieView==0) {			
			movieView = 1;
			moviesView();			
		}
		else if(movieView==1) {			
			movieView = 0;
			normalView();
		}	
	});

	/*$.ajax({				
    	url:'http://yggip.com/Luke',    	
        type:'GET',
        login: "Luke",
        password: "don'tlookatmypasswordrobby",
        success: function(data){
           $('#content').html($(data).find('body.main.category.shelf.shelfInfo.books').html());
        }
	});*/

});

function moviesView() {
	var div = $("#middleContent")
	div.empty();
	div.append("<button id='movieButton' style='background-color: #efefef; border: 1px solid black; float: right;'>Back to normal view</button>");
	for (var i = 0; i < movies.length; i++) {
		movieBox(div, movies[i])
	}
}

function normalView() {
	$("#middleContent").empty();
	$("#middleContent").append("<div class='col-md-60'>Currently studying for Honours at the University of Cape Town. Looking for work experience at interesting companies.<br><br>Email: lukekingsleybell@gmail.com <br>Tell: 0797776318<br>Last movie I watched:<button id='movieButton' style='background-color: #efefef; border: 1px solid black; float: right;'>See all movies I've reviewed</button><div id='movies' class='col-md-60' style='padding: 0px;'></div></div>");
	var div = $("#movies") 
	movieBox(div, movies[0]);
}

function movieBox(div, movie) {
	div.append("<div class='col-md-60' style='background-color: #efefef; padding: 0;'><div id='poster" + movie.name.replace(/ /g, "_") + "' class='col-md-20' style='height: 100%;'><img src='./images/posters/" + movie.name.toLowerCase().replace(/:\s*/g, "-").replace(/ /g, "_") + ".jpg' style='border: 1px solid black; max-width: 100%;'></img></div><div class='col-md-40' style='background-color: #efefef; padding-bottom: 20px;'><h3 style='margin: 0;'>" + movie.name + "<small>  " + movie.year + "</small></h3><br>" + movie.review + "</div></div>");
}