$( function() {
		
    $( "#accordion" ).accordion({
	heightStyle: "content"
	});
	$( "#field input" ).checkboxradio();
	$( "#pbBad" ).progressbar({
      value: 0,
	  create: function(event,ui){
		$("#hBad").text("Nombre de Mauvaises réponses max : " + 3 );
	  }
    });
	$( "#pbQuest" ).progressbar({
      value: 0,
	  max: 10,
	  create: function(event,ui){
		$("#hQuest").text("Nombre de Question a répondre : " + 10);
	  }
    });
	
	$("#spinner").spinner({
	min:0,
	max:10,
	change: function(event,ui){
		var x = this;
		$( "#pbQuest" ).progressbar("destroy");
		$( "#pbQuest" ).progressbar({
		max:x.value,
		create: function(event,ui){
		$("#hBad").text("Nombre de Mauvaises réponses max : " + x.value);
		}
		});
	}
	});
	
	$("#spinner").spinner( "value", 3 );
	//document.getElementById("spinner").defaultValue = "10";
	
	
	
	//var themeClass = $( "#spinner" ).spinner( "option", "classes.ui-spinner" );
	//console.log(themeClass);
	
	var map = L.map("map1").setView([47, 2],6);
	var couche = new L.TileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png')
	map.addLayer(couche);
	
	
	$("#radio-1").click(function(){
		map.setView(new L.LatLng(47, 2),6);	
	});
	
	$("#radio-2").click(function(){
		map.setView(new L.LatLng(37, -100),4);
	});
	
	$("#radio-3").click(function(){
		
	});
	
	
} );

  

  