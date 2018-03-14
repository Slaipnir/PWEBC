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
	var couche = new L.TileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=1a02a67146a1435d92219e86ff8582fa')
	map.addLayer(couche);
	
	
	$("#radio-1").click(function(){
		map.setView(new L.LatLng(47, 2),6);	
	});
	
	$("#radio-2").click(function(){
		map.setView(new L.LatLng(37, -100),4);
	});
	
	$("#radio-3").click(function(){
		map.setView(new L.LatLng(47, 2),2);
	});
	
	
	//Sur le click de la map, ajout d'un marqueur sur la carte avec le nom du pays
	map.on('click', onClick);
	
	function onClick(e) {
		//recherche le pays sur lequel on a clické
		//Requete AJAX pour récupérer les infos du pays sur le point où on a cliqué (lati, longi) 
		$.ajax({
		    type: 'GET',
		    url: "http://nominatim.openstreetmap.org/reverse",
		    dataType: 'jsonp',
		    jsonpCallback: 'data',
		    data: { format: "json", limit: 1,lat: e.latlng.lat,lon: e.latlng.lng,json_callback: 'data' },
		    error: function(xhr, status, error) {
					alert("ERROR "+error);
		    },	  
			success: 	function (data){
			
			//récupérer les coordonnées (lati, longi) du pays dans les données json provenant du serveur
				var paysVisite ='';
				paysVisite = data["address"]['country'] ;
			
			//affichage des infos
			L.marker(e.latlng).addTo(map).bindPopup("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng+" Pays : "+paysVisite).openPopup();
			L.circle(e.latlng, 1).addTo(map);	
			}
		});
	}
	
} );


  

  