$('document').ready(function(){
console.log("ready!");

$("#music").on("click", function(e){
	e.preventDefault();
 	$(this).find("span").toggleClass("glyphicon-pause glyphicon-play");
 	if($(this).find("span").hasClass("glyphicon-pause")){
 		$("#audio")[0].play();
 	}else{
 		$("#audio")[0].pause();
 	}
 });

});