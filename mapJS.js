window.onload = function () {
	var map = L.map('map').setView([47, 2],5);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
	
	//Rendre draggable les div des pays
	$( "#Q142" ).draggable({ revert: "valid" });
	$( "#Q16" ).draggable({ revert: "valid" });
	$( "#Q38" ).draggable({ revert: "valid" });
	$( "#Q31" ).draggable({ revert: "valid" });
	$( "#Q17" ).draggable({ revert: "valid" });
	
	//Rendre la map droppable
	 $( "#map" ).droppable({
		 
		 //Evenement lors du drop
		drop: function( event, ui ) {
			
			//Recupère l'id du block div "dropped" dans la map
			var IdPays = ui.draggable.attr("id");
			
			var chaine="";
			
			//Requete AJAX pour récupérer les coordonnées (lati, longi) du pays
			$.ajax({
			    type: 'GET',
			    url: " https://www.wikidata.org/w/api.php",
			    dataType: 'jsonp',
			    jsonpCallback: 'data',
			    data: {
					action: 'wbgetentities',
					format: 'json',
					ids: IdPays,
					origin: "*"
				},
				crossDomain: true,
			    error: function(xhr, status, error) {
						alert("ERROR "+error);
			    },
			    success: function(data){
				//récupérer les coordonnées (lati, longi) du pays dans les données json provenant du serveur
					chaine+="Pays :" +data["entities"][IdPays]["labels"]["fr"]["value"]+ "</br>";
					var lati = '';
					var longi = '';
					$.each(data, function() {
					//console.log(data.entities.Q142.claims.P610[0].qualifiers.P625[0].datavalue.value.latitude);
					lati = data["entities"][IdPays]["claims"]["P625"][0]["mainsnak"]["datavalue"]["value"]["latitude"] ;
					longi = data["entities"][IdPays]["claims"]["P625"][0]["mainsnak"]["datavalue"]["value"]["longitude"]  ;
					//	console.log(lati + " " + longi);
				});
				
				
				//affichage des infos
				chaine+="Latitude : "+lati+"</br>";
				chaine+="Longitute : "+longi+"</br>";
				$( "#info" ).html(chaine);
				
				//MAJ de la map à la position (lati, longi) du pays
				map.panTo(new L.LatLng(lati, longi));		
				
			    }
			});
			
			
		}
	});
	}



