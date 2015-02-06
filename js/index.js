$(window).scroll(function() {
	var positions = [];
	positions[0] = -200;
	positions[1] = $("#projects").offset().top;
	positions[2] = $("#art").offset().top;
	var navPos = $("nav").offset();
	var nearest;

	// Find which position user has scrolled past
	for(i in positions){
		if(navPos.top >= positions[i])
			nearest = i;
	}

	var navitems = [$("#navWork"), $("#navProjects"), $("#navArt")];

	navitems[0].css("text-decoration", "none");
	navitems[1].css("text-decoration", "none");
	navitems[2].css("text-decoration", "none");
	navitems[nearest].css("text-decoration", "underline");
});