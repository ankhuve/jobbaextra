var toggleMenu = function(){
	var visible = $(".headerOptions").is(":visible");
	$('.headerOptions').toggle();

	if(visible){
		$("#menuContentContainer").removeAttr("style");
	} else {
		var menuHeight = $(".headerOptions").height();
		menuHeight += 30;
		$("#menuContentContainer").attr("style","margin-bottom:"+menuHeight+"px;");
	}
	// console.log($(".headerOptions").is(":visible"));

	// $("#menuContentContainer").attr("style","margin-bottom:"+menuHeight+"px;");
	
	// $('#headerOptions.compact').attr('style','display:block !important');
}