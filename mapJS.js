window.onload = function () {
	var map = L.map('map').setView([47, 2],5);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
	
	//Rendre draggable les div des pays
	$( "#France" ).draggable({ revert: "valid" });
	$( "#Canada" ).draggable({ revert: "valid" });
	$( "#Italie" ).draggable({ revert: "valid" });
	$( "#Belgique" ).draggable({ revert: "valid" });
	$( "#Japan" ).draggable({ revert: "valid" });
	
	//Rendre la map droppable
	 $( "#map" ).droppable({
		 
		 //Evenement lors du drop
		drop: function( event, ui ) {
			
			//Recupère l'id du block div "dropped" dans la map
			var IdPays = ui.draggable.attr("id");
			
			var chaine="";
			chaine+="Pays : "+IdPays+"</br>";
			
			//Requete AJAX pour récupérer les coordonnées (lati, longi) du pays
			$.ajax({
			    type: 'GET',
			    url: "http://nominatim.openstreetmap.org/search",
			    dataType: 'jsonp',
			    jsonpCallback: 'data',
			    data: { format: "json", limit: 1,country: IdPays,json_callback: 'data' },
			    error: function(xhr, status, error) {
						alert("ERROR "+error);
			    },
			    success: function(data){
				//récupérer les coordonnées (lati, longi) du pays dans les données json provenant du serveur
					var lati = '';
					var longi = '';
					$.each(data, function() {
						lati = this['lat'] ;
						longi = this['lon'] ;
				});
				
				//affichage des infos
				chaine+="Latitude : "+lati+"</br>";
				chaine+="Longitute : "+longi+"</br>";
				$( "#info" ).html(chaine);
				
				//MAJ de la map à la position (lati, longi) du pays
				map.panTo(new L.LatLng(lati, longi));		
				
			    }
			});
			
		//Requete AJAX pour récupérer les etats des USA
			$.ajax({
			    type: 'GET',
			    url: " https://www.wikidata.org/w/api.php",
			    dataType: 'jsonp',
			    jsonpCallback: 'data',
			    data: {
					action: 'wbgetentities',
					format: 'json',
					ids: 'Q142',
					origin: "*"
				},
				crossDomain: true,
			    error: function(xhr, status, error) {
						alert("ERROR "+error);
			    },
			    success: function(data){
				//récupérer les coordonnées (lati, longi) du pays dans les données json provenant du serveur
					
					
				
			    }
			});
			
			//Requete AJAX pour récupérer les departements
			$.ajax({
			    type: 'GET',
			    url: " https://geo.api.gouv.fr/departements",
			    dataType: 'jsonp',
			    jsonpCallback: 'data',
			    data: {
					format: 'json',
					json_callback: 'data'
				},
				crossDomain: true,
			    error: function(xhr, status, error) {
						alert("ERROR "+error);
			    },
			    success: function(data){
				//récupérer les coordonnées (lati, longi) du pays dans les données json provenant du serveur
					
					
				
			    }
			});
		
			
			
		}
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
	}



