$( function() {
	
	$("#listDep").show();
	$("#listEtat").hide();
	$("#listPays").hide();
	
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
	var couche = new L.TileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.{ext}',{
		ext: 'png'
	});
	map.addLayer(couche);
	lgMarkers = new L.LayerGroup();
	map.addLayer(lgMarkers);
	
	
	$("#radio-1").click(function(){
		lgMarkers.clearLayers();
		$("#listDep").show();
		$("#listEtat").hide();
		$("#listPays").hide();
		map.setView(new L.LatLng(47, 2),6);
		map.on('click', onClickFrance);
		setSelectFrance();		
	});
	
	$("#radio-2").click(function(){
		lgMarkers.clearLayers();
		$("#listDep").hide();
		$("#listEtat").show();
		$("#listPays").hide();
		map.setView(new L.LatLng(37, -100),4);
		map.on('click', onClickAmericain);
	});
	
	$("#radio-3").click(function(){
		lgMarkers.clearLayers();
		$("#listDep").hide();
		$("#listEtat").hide();
		$("#listPays").show();
		map.setView(new L.LatLng(47, 2),2);
		map.on('click', onClickMondial);
		setSelectMondial();
	});
	
	
	//Sur le click de la map, ajout d'un marqueur sur la carte avec le nom du pays
	
	
	function onClickMondial(e) {
		//recherche le pays sur lequel on a clické
		//Requete AJAX pour récupérer les infos du pays sur le point où on a cliqué (lati, longi)
		var latitude,longitutde;
		$.ajax({
		    type: 'GET',
		    url: "http://nominatim.openstreetmap.org/reverse",
		    dataType: 'jsonp',
		    jsonpCallback: 'data',
		    data: { format: "json", limit: 1,lat: e.latlng.lat,lon: e.latlng.lng,json_callback: 'data' },
		    error: function(xhr, status, error) {
					alert("ERROR onClickMondial"+error);
		    },	  
			success: 	function (data){
			
			//récupérer les coordonnées (lati, longi) du pays dans les données json provenant du serveur
				var paysVisite ='';
				paysVisite = data["address"]['country'] ;
			
			//affichage des infos
			L.marker(e.latlng).addTo(lgMarkers).bindPopup("Lat : "+ e.latlng.lat +", Lon : " + e.latlng.lng+" Pays : "+paysVisite).openPopup();
			L.circle(e.latlng, 1).addTo(lgMarkers);
			latitude = e.latlng.lat;
			longitutde = e.latlng.lng
			}
		});
		
				
	}
	
	function onClickFrance(e){
		//Requete AJAX pour récupérer les infos du pays sur le point où on a cliqué (lati, longi)
		var latitude,longitutde;
		$.ajax({
		    type: 'GET',
		    url: "http://nominatim.openstreetmap.org/reverse",
		    dataType: 'jsonp',
		    jsonpCallback: 'data',
		    data: { format: "json", limit: 1,lat: e.latlng.lat,lon: e.latlng.lng,json_callback: 'data' },
		    error: function(xhr, status, error) {
					alert("ERROR onClickFrance "+error);
		    },	  
			success: 	function (data){
			
			//récupérer les coordonnées (lati, longi) du pays dans les données json provenant du serveur
				var paysVisite ='';
				region = data["address"]['state'] ;
			
			//affichage des infos
			L.marker(e.latlng).addTo(lgMarkers).bindPopup("Lat : "+ e.latlng.lat +", Lon : " + e.latlng.lng+" Région : "+region).openPopup();
			L.circle(e.latlng, 1).addTo(lgMarkers);
			latitude = e.latlng.lat;
			longitutde = e.latlng.lng
			}
		});
	}
	
	function setSelectMondial(){
		$("#Pays").html("");
		var data = require("countries-FR.json");
		for(var i = 0; i < data.length;++i){
			$("#Pays").html($("#Pays").html() + "<option value=" + data[i] + ">" + data[i] + "</option>");
		}
	}
	
	function setSelectAmerique(){
		
	}
	
	function setSelectFrance(){
		$("#Departements").html("");
		$.ajax({
		    type: 'GET',
		    url: "http://geo.api.gouv.fr/regions",
		    dataType: 'json',
		    jsonpCallback: 'data',
		    data: { format: "json", limit: 1,json_callback: 'data' },
		    error: function(xhr, status, error) {
				alert("ERROR1 setSelectFrance"+error);
		    },	  
			success: 	function (data){
				var donnee = data;
				for(var i = 0; i < donnee.length;++i){
					
					$("#Departements").html($("#Departements").html() + "<option value=" + data[i]['nom'] + ">" + data[i]['nom'] + "</option>");
					
					
					//$.ajax({
					//	type: 'GET',
					//	url: "https://geo.api.gouv.fr/regions/" + donnee[i]["code"] + "/departements",
					//	dataType: 'json',
					//	jsonpCallback: 'data',
					//	data: { format: "json", limit: 1,json_callback: 'data' },
					//	error: function(xhr, status, error) {
					//		alert("ERROR2 "+error);
					//	},
					//	success: function(data2){
					//		//console.log(data2);
					//		var selectFrance = $("#Departements");
					//		for(var j = 0; j < data2.length;++j){
					//			$("#Departements").html($("#Departements").html() + "<option value=" + data2[j]['code'] + ">" + data2[j]['nom'] + "</option>");
					//			//console.log(data2[j]['nom']);
					//			//console.log(makeHTML);
					//		}
					//	}
					//});
				}
				//console.log("message" + makeHTML);
			}
		});
	}
	
	function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
	}


	
} );


  

  