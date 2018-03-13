$( function() {
    $( "#accordion" ).accordion({
	heightStyle: "content"
	});
	$( "#field input" ).checkboxradio();
	$( "#pbBad" ).progressbar({
      value: 35,
    });
	$( "#pbQuest" ).progressbar({
      value: 35,
    });
	$("#map1").show();
	$("#map2").hide();
	$("#map3").hide();
	$("#spinner").spinner();
	
	$("#spinner").spinner( "value", 5 );
	//document.getElementById("spinner").defaultValue = "10";
	
	
	
	//var themeClass = $( "#spinner" ).spinner( "option", "classes.ui-spinner" );
	//console.log(themeClass);
	
	$("#radio-1").click(function(){
		$("#map1").show();
		$("#map2").hide();
		$("#map3").hide();
	});
	
	$("#radio-2").click(function(){
		$("#map1").hide();
		$("#map2").show();
		$("#map3").hide();
	});
	
	$("#radio-3").click(function(){
		$("#map1").hide();
		$("#map2").hide();
		$("#map3").show();
	});
	
	var map = L.map("map1").setView([47, 2],5);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
} );

  

  