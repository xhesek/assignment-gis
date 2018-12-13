L.mapbox.accessToken = 'pk.eyJ1IjoieGhlc2VrIiwiYSI6ImNqbnVvY2prMzA1cXkzd28wNmpvNG5nd3UifQ.YlftXzDQm-R_GXycTXRUGQ';
var map = L.mapbox.map('map', 'mapbox.streets', {doubleClickZoom : false}).setView([ 48.70, 19.5 ], 8.4);
var myLayer = L.mapbox.featureLayer().addTo(map);
var boundariesLayer = L.mapbox.featureLayer().addTo(map);
var atmLayer = L.mapbox.featureLayer().addTo(map);
var marker = L.marker();
var clicked = 0;
var polyline = new L.Polyline([]).addTo(map);
var markers = [];
//var polyBA = null;
//var polyTT = null;
//var polyTC = null;
//var polyPV = null;
//var polyKE = null;
//var polyZA = null;
//var polyNR = null;
//var polyBB = null;
var poly_okres_Bánovce_nad_Bebravou = null;
var poly_okres_Banská_Bystrica = null;
var poly_okres_Banská_Štiavnica = null;
var poly_okres_Bardejov = null;
var poly_okres_Bratislava_I = null;
var poly_okres_Bratislava_II = null;
var poly_okres_Bratislava_III = null;
var poly_okres_Bratislava_IV = null;
var poly_okres_Bratislava_V = null;
var poly_okres_Brezno = null;
var poly_okres_Bytča = null;
var poly_okres_Čadca = null;
var poly_okres_Detva = null;
var poly_okres_Dolný_Kubín = null;
var poly_okres_Dunajská_Streda = null;
var poly_okres_Galanta = null;
var poly_okres_Gelnica = null;
var poly_okres_Hlohovec = null;
var poly_okres_Humenné = null;
var poly_okres_Ilava = null;
var poly_okres_Kežmarok = null;
var poly_okres_Komárno = null;
var poly_okres_Košice_okolie = null;
var poly_okres_Košice_I = null;
var poly_okres_Košice_II = null;
var poly_okres_Košice_III = null;
var poly_okres_Košice_IV = null;
var poly_okres_Krupina = null;
var poly_okres_Kysucké_Nové_Mesto = null;
var poly_okres_Levice = null;
var poly_okres_Levoča = null;
var poly_okres_Liptovský_Mikuláš = null;
var poly_okres_Lučenec = null;
var poly_okres_Malacky = null;
var poly_okres_Martin = null;
var poly_okres_Medzilaborce = null;
var poly_okres_Michalovce = null;
var poly_okres_Myjava = null;
var poly_okres_Námestovo = null;
var poly_okres_Nitra = null;
var poly_okres_Nové_Mesto_nad_Váhom = null;
var poly_okres_Nové_Zámky = null;
var poly_okres_Partizánske = null;
var poly_okres_Pezinok = null;
var poly_okres_Piešťany = null;
var poly_okres_Poltár = null;
var poly_okres_Poprad = null;
var poly_okres_Považská_Bystrica = null;
var poly_okres_Prešov = null;
var poly_okres_Prievidza = null;
var poly_okres_Púchov = null;
var poly_okres_Revúca = null;
var poly_okres_Rimavská_Sobota = null;
var poly_okres_Rožňava = null;
var poly_okres_Ružomberok = null;
var poly_okres_Sabinov = null;
var poly_okres_Senec = null;
var poly_okres_Senica = null;
var poly_okres_Skalica = null;
var poly_okres_Snina = null;
var poly_okres_Sobrance = null;
var poly_okres_Spišská_Nová_Ves = null;
var poly_okres_Stará_Ľubovňa = null;
var poly_okres_Stropkov = null;
var poly_okres_Svidník = null;
var poly_okres_Šaľa = null;
var poly_okres_Topolčany = null;
var poly_okres_Trebišov = null;
var poly_okres_Trenčín = null;
var poly_okres_Trnava = null;
var poly_okres_Turčianske_Teplice = null;
var poly_okres_Tvrdošín = null;
var poly_okres_Veľký_Krtíš = null;
var poly_okres_Vranov_nad_Topľou = null;
var poly_okres_Zlaté_Moravce = null;
var poly_okres_Zvolen = null;
var poly_okres_Žarnovica = null;
var poly_okres_Žiar_nad_Hronom = null;
var poly_okres_Žilina = null;

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}

function checkBoundaries(geojson, boundary) {
	for(var i = 0; i < 79; i++) {
		if(geojson[i].properties.name == boundary) {
			console.log("json: " + geojson + " boundary: " + boundary);
			var json = geojson[i];
			return json;
		}
	}
}

map.clicked = 0;
L.mapbox.styleLayer('mapbox://styles/xhesek/cjopoefgj156s2rozckl5nbwc').addTo(map);

// vykreslenie vsetkych bank po spusteni app
jQuery.get("http://localhost:8080/allBanks", function(response) {
	var geojson = jQuery.parseJSON(response);
	myLayer.setGeoJSON(geojson);
});


sleep(2000);
jQuery.get("http://localhost:8080/getBoundaries", function(response) {
	var geojson = jQuery.parseJSON(response);
	
//	var bratislavsky = checkBoundaries(geojson, "Bratislavský kraj");
//	var trnavsky = checkBoundaries(geojson, "Trnavský kraj");	
//	var trenciansky = checkBoundaries(geojson, "Trenčiansky kraj");	
//	var presovsky = checkBoundaries(geojson, "Prešovský kraj");	
//	var kosicky = checkBoundaries(geojson, "Košický kraj");	
//	var zilinsky = checkBoundaries(geojson, "Žilinský kraj");	
//	var nitriansky = checkBoundaries(geojson, "Nitriansky kraj");	
//	var banskobystricky = checkBoundaries(geojson, "Banskobystrický kraj");	
	var okres_Bánovce_nad_Bebravou = checkBoundaries(geojson, "okres Bánovce nad Bebravou");
	var okres_Banská_Bystrica = checkBoundaries(geojson, "okres Banská Bystrica");
	var okres_Banská_Štiavnica = checkBoundaries(geojson, "okres Banská Štiavnica");
	var okres_Bardejov = checkBoundaries(geojson, "okres Bardejov");
	var okres_Bratislava_I = checkBoundaries(geojson, "okres Bratislava I");
	var okres_Bratislava_II = checkBoundaries(geojson, "okres Bratislava II");
	var okres_Bratislava_III = checkBoundaries(geojson, "okres Bratislava III");
	var okres_Bratislava_IV = checkBoundaries(geojson, "okres Bratislava IV");
	var okres_Bratislava_V = checkBoundaries(geojson, "okres Bratislava V");
	var okres_Brezno = checkBoundaries(geojson, "okres Brezno");
	var okres_Bytča = checkBoundaries(geojson, "okres Bytča");
	var okres_Čadca = checkBoundaries(geojson, "okres Čadca");
	var okres_Detva = checkBoundaries(geojson, "okres Detva");
	var okres_Dolný_Kubín = checkBoundaries(geojson, "okres Dolný Kubín");
	var okres_Dunajská_Streda = checkBoundaries(geojson, "okres Dunajská Streda");
	var okres_Galanta = checkBoundaries(geojson, "okres Galanta");
	var okres_Gelnica = checkBoundaries(geojson, "okres Gelnica");
	var okres_Hlohovec = checkBoundaries(geojson, "okres Hlohovec");
	var okres_Humenné = checkBoundaries(geojson, "okres Humenné");
	var okres_Ilava = checkBoundaries(geojson, "okres Ilava");
	var okres_Kežmarok = checkBoundaries(geojson, "okres Kežmarok");
	var okres_Komárno = checkBoundaries(geojson, "okres Komárno");
	var okres_Košice_okolie = checkBoundaries(geojson, "okres Košice - okolie");
	var okres_Košice_I = checkBoundaries(geojson, "okres Košice I");
	var okres_Košice_II = checkBoundaries(geojson, "okres Košice II");
	var okres_Košice_III = checkBoundaries(geojson, "okres Košice III");
	var okres_Košice_IV = checkBoundaries(geojson, "okres Košice IV");
	var okres_Krupina = checkBoundaries(geojson, "okres Krupina");
	var okres_Kysucké_Nové_Mesto = checkBoundaries(geojson, "okres Kysucké Nové Mesto");
	var okres_Levice = checkBoundaries(geojson, "okres Levice");
	var okres_Levoča = checkBoundaries(geojson, "okres Levoča");
	var okres_Liptovský_Mikuláš = checkBoundaries(geojson, "okres Liptovský Mikuláš");
	var okres_Lučenec = checkBoundaries(geojson, "okres Lučenec");
	var okres_Malacky = checkBoundaries(geojson, "okres Malacky");
	var okres_Martin = checkBoundaries(geojson, "okres Martin");
	var okres_Medzilaborce = checkBoundaries(geojson, "okres Medzilaborce");
	var okres_Michalovce = checkBoundaries(geojson, "okres Michalovce");
	var okres_Myjava = checkBoundaries(geojson, "okres Myjava");
	var okres_Námestovo = checkBoundaries(geojson, "okres Námestovo");
	var okres_Nitra = checkBoundaries(geojson, "okres Nitra");
	var okres_Nové_Mesto_nad_Váhom = checkBoundaries(geojson, "okres Nové Mesto nad Váhom");
	var okres_Nové_Zámky = checkBoundaries(geojson, "okres Nové Zámky");
	var okres_Partizánske = checkBoundaries(geojson, "okres Partizánske");
	var okres_Pezinok = checkBoundaries(geojson, "okres Pezinok");
	var okres_Piešťany = checkBoundaries(geojson, "okres Piešťany");
	var okres_Poltár = checkBoundaries(geojson, "okres Poltár");
	var okres_Poprad = checkBoundaries(geojson, "okres Poprad");
	var okres_Považská_Bystrica = checkBoundaries(geojson, "okres Považská Bystrica");
	var okres_Prešov = checkBoundaries(geojson, "okres Prešov");
	var okres_Prievidza = checkBoundaries(geojson, "okres Prievidza");
	var okres_Púchov = checkBoundaries(geojson, "okres Púchov");
	var okres_Revúca = checkBoundaries(geojson, "okres Revúca");
	var okres_Rimavská_Sobota = checkBoundaries(geojson, "okres Rimavská Sobota");
	var okres_Rožňava = checkBoundaries(geojson, "okres Rožňava");
	var okres_Ružomberok = checkBoundaries(geojson, "okres Ružomberok");
	var okres_Sabinov = checkBoundaries(geojson, "okres Sabinov");
	var okres_Senec = checkBoundaries(geojson, "okres Senec");
	var okres_Senica = checkBoundaries(geojson, "okres Senica");
	var okres_Skalica = checkBoundaries(geojson, "okres Skalica");
	var okres_Snina = checkBoundaries(geojson, "okres Snina");
	var okres_Sobrance = checkBoundaries(geojson, "okres Sobrance");
	var okres_Spišská_Nová_Ves = checkBoundaries(geojson, "okres Spišská Nová Ves");
	var okres_Stará_Ľubovňa = checkBoundaries(geojson, "okres Stará Ľubovňa");
	var okres_Stropkov = checkBoundaries(geojson, "okres Stropkov");
	var okres_Svidník = checkBoundaries(geojson, "okres Svidník");
	var okres_Šaľa = checkBoundaries(geojson, "okres Šaľa");
	var okres_Topolčany = checkBoundaries(geojson, "okres Topolčany");
	var okres_Trebišov = checkBoundaries(geojson, "okres Trebišov");
	var okres_Trenčín = checkBoundaries(geojson, "okres Trenčín");
	var okres_Trnava = checkBoundaries(geojson, "okres Trnava");
	var okres_Turčianske_Teplice = checkBoundaries(geojson, "okres Turčianske Teplice");
	var okres_Tvrdošín = checkBoundaries(geojson, "okres Tvrdošín");
	var okres_Veľký_Krtíš = checkBoundaries(geojson, "okres Veľký Krtíš");
	var okres_Vranov_nad_Topľou = checkBoundaries(geojson, "okres Vranov nad Topľou");
	var okres_Zlaté_Moravce = checkBoundaries(geojson, "okres Zlaté Moravce");
	var okres_Zvolen = checkBoundaries(geojson, "okres Zvolen");
	var okres_Žarnovica = checkBoundaries(geojson, "okres Žarnovica");
	var okres_Žiar_nad_Hronom = checkBoundaries(geojson, "okres Žiar nad Hronom");
	var okres_Žilina = checkBoundaries(geojson, "okres Žilina");
	
	
	boundariesLayer.setGeoJSON(geojson);
	
//	for(var i = 0; i <bratislavsky.geometry.coordinates[0].length; i++) {
//		bratislavsky.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(bratislavsky.geometry.coordinates[0][i]);
//	}
//	for(var i = 0; i <trnavsky.geometry.coordinates[0].length; i++) {
//		trnavsky.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(trnavsky.geometry.coordinates[0][i]);
//	}
//	for(var i = 0; i <trenciansky.geometry.coordinates[0].length; i++) {
//		trenciansky.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(trenciansky.geometry.coordinates[0][i]);
//	}
//	for(var i = 0; i <presovsky.geometry.coordinates[0].length; i++) {
//		presovsky.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(presovsky.geometry.coordinates[0][i]);
//	}
//	for(var i = 0; i <kosicky.geometry.coordinates[0].length; i++) {
//		kosicky.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(kosicky.geometry.coordinates[0][i]);
//	}
//	for(var i = 0; i <zilinsky.geometry.coordinates[0].length; i++) {
//		zilinsky.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(zilinsky.geometry.coordinates[0][i]);
//	}
//	for(var i = 0; i <nitriansky.geometry.coordinates[0].length; i++) {
//		nitriansky.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(nitriansky.geometry.coordinates[0][i]);
//	}
//	for(var i = 0; i <banskobystricky.geometry.coordinates[0].length; i++) {
//		banskobystricky.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(banskobystricky.geometry.coordinates[0][i]);
//	}
	for(var i = 0; i < okres_Bánovce_nad_Bebravou.geometry.coordinates[0].length; i++) {okres_Bánovce_nad_Bebravou.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Bánovce_nad_Bebravou.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Banská_Bystrica.geometry.coordinates[0].length; i++) {okres_Banská_Bystrica.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Banská_Bystrica.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Banská_Štiavnica.geometry.coordinates[0].length; i++) {okres_Banská_Štiavnica.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Banská_Štiavnica.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Bardejov.geometry.coordinates[0].length; i++) {okres_Bardejov.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Bardejov.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Bratislava_I.geometry.coordinates[0].length; i++) {okres_Bratislava_I.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Bratislava_I.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Bratislava_II.geometry.coordinates[0].length; i++) {okres_Bratislava_II.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Bratislava_II.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Bratislava_III.geometry.coordinates[0].length; i++) {okres_Bratislava_III.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Bratislava_III.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Bratislava_IV.geometry.coordinates[0].length; i++) {okres_Bratislava_IV.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Bratislava_IV.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Bratislava_V.geometry.coordinates[0].length; i++) {okres_Bratislava_V.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Bratislava_V.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Brezno.geometry.coordinates[0].length; i++) {okres_Brezno.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Brezno.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Bytča.geometry.coordinates[0].length; i++) {okres_Bytča.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Bytča.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Čadca.geometry.coordinates[0].length; i++) {okres_Čadca.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Čadca.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Detva.geometry.coordinates[0].length; i++) {okres_Detva.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Detva.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Dolný_Kubín.geometry.coordinates[0].length; i++) {okres_Dolný_Kubín.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Dolný_Kubín.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Dunajská_Streda.geometry.coordinates[0].length; i++) {okres_Dunajská_Streda.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Dunajská_Streda.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Galanta.geometry.coordinates[0].length; i++) {okres_Galanta.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Galanta.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Gelnica.geometry.coordinates[0].length; i++) {okres_Gelnica.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Gelnica.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Hlohovec.geometry.coordinates[0].length; i++) {okres_Hlohovec.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Hlohovec.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Humenné.geometry.coordinates[0].length; i++) {okres_Humenné.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Humenné.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Ilava.geometry.coordinates[0].length; i++) {okres_Ilava.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Ilava.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Kežmarok.geometry.coordinates[0].length; i++) {okres_Kežmarok.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Kežmarok.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Komárno.geometry.coordinates[0].length; i++) {okres_Komárno.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Komárno.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Košice_okolie.geometry.coordinates[0].length; i++) {okres_Košice_okolie.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Košice_okolie.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Košice_I.geometry.coordinates[0].length; i++) {okres_Košice_I.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Košice_I.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Košice_II.geometry.coordinates[0].length; i++) {okres_Košice_II.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Košice_II.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Košice_III.geometry.coordinates[0].length; i++) {okres_Košice_III.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Košice_III.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Košice_IV.geometry.coordinates[0].length; i++) {okres_Košice_IV.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Košice_IV.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Krupina.geometry.coordinates[0].length; i++) {okres_Krupina.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Krupina.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Kysucké_Nové_Mesto.geometry.coordinates[0].length; i++) {okres_Kysucké_Nové_Mesto.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Kysucké_Nové_Mesto.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Levice.geometry.coordinates[0].length; i++) {okres_Levice.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Levice.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Levoča.geometry.coordinates[0].length; i++) {okres_Levoča.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Levoča.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Liptovský_Mikuláš.geometry.coordinates[0].length; i++) {okres_Liptovský_Mikuláš.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Liptovský_Mikuláš.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Lučenec.geometry.coordinates[0].length; i++) {okres_Lučenec.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Lučenec.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Malacky.geometry.coordinates[0].length; i++) {okres_Malacky.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Malacky.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Martin.geometry.coordinates[0].length; i++) {okres_Martin.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Martin.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Medzilaborce.geometry.coordinates[0].length; i++) {okres_Medzilaborce.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Medzilaborce.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Michalovce.geometry.coordinates[0].length; i++) {okres_Michalovce.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Michalovce.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Myjava.geometry.coordinates[0].length; i++) {okres_Myjava.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Myjava.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Námestovo.geometry.coordinates[0].length; i++) {okres_Námestovo.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Námestovo.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Nitra.geometry.coordinates[0].length; i++) {okres_Nitra.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Nitra.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Nové_Mesto_nad_Váhom.geometry.coordinates[0].length; i++) {okres_Nové_Mesto_nad_Váhom.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Nové_Mesto_nad_Váhom.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Nové_Zámky.geometry.coordinates[0].length; i++) {okres_Nové_Zámky.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Nové_Zámky.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Partizánske.geometry.coordinates[0].length; i++) {okres_Partizánske.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Partizánske.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Pezinok.geometry.coordinates[0].length; i++) {okres_Pezinok.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Pezinok.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Piešťany.geometry.coordinates[0].length; i++) {okres_Piešťany.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Piešťany.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Poltár.geometry.coordinates[0].length; i++) {okres_Poltár.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Poltár.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Poprad.geometry.coordinates[0].length; i++) {okres_Poprad.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Poprad.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Považská_Bystrica.geometry.coordinates[0].length; i++) {okres_Považská_Bystrica.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Považská_Bystrica.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Prešov.geometry.coordinates[0].length; i++) {okres_Prešov.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Prešov.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Prievidza.geometry.coordinates[0].length; i++) {okres_Prievidza.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Prievidza.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Púchov.geometry.coordinates[0].length; i++) {okres_Púchov.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Púchov.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Revúca.geometry.coordinates[0].length; i++) {okres_Revúca.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Revúca.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Rimavská_Sobota.geometry.coordinates[0].length; i++) {okres_Rimavská_Sobota.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Rimavská_Sobota.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Rožňava.geometry.coordinates[0].length; i++) {okres_Rožňava.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Rožňava.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Ružomberok.geometry.coordinates[0].length; i++) {okres_Ružomberok.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Ružomberok.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Sabinov.geometry.coordinates[0].length; i++) {okres_Sabinov.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Sabinov.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Senec.geometry.coordinates[0].length; i++) {okres_Senec.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Senec.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Senica.geometry.coordinates[0].length; i++) {okres_Senica.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Senica.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Skalica.geometry.coordinates[0].length; i++) {okres_Skalica.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Skalica.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Snina.geometry.coordinates[0].length; i++) {okres_Snina.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Snina.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Sobrance.geometry.coordinates[0].length; i++) {okres_Sobrance.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Sobrance.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Spišská_Nová_Ves.geometry.coordinates[0].length; i++) {okres_Spišská_Nová_Ves.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Spišská_Nová_Ves.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Stará_Ľubovňa.geometry.coordinates[0].length; i++) {okres_Stará_Ľubovňa.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Stará_Ľubovňa.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Stropkov.geometry.coordinates[0].length; i++) {okres_Stropkov.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Stropkov.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Svidník.geometry.coordinates[0].length; i++) {okres_Svidník.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Svidník.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Šaľa.geometry.coordinates[0].length; i++) {okres_Šaľa.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Šaľa.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Topolčany.geometry.coordinates[0].length; i++) {okres_Topolčany.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Topolčany.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Trebišov.geometry.coordinates[0].length; i++) {okres_Trebišov.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Trebišov.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Trenčín.geometry.coordinates[0].length; i++) {okres_Trenčín.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Trenčín.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Trnava.geometry.coordinates[0].length; i++) {okres_Trnava.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Trnava.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Turčianske_Teplice.geometry.coordinates[0].length; i++) {okres_Turčianske_Teplice.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Turčianske_Teplice.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Tvrdošín.geometry.coordinates[0].length; i++) {okres_Tvrdošín.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Tvrdošín.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Veľký_Krtíš.geometry.coordinates[0].length; i++) {okres_Veľký_Krtíš.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Veľký_Krtíš.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Vranov_nad_Topľou.geometry.coordinates[0].length; i++) {okres_Vranov_nad_Topľou.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Vranov_nad_Topľou.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Zlaté_Moravce.geometry.coordinates[0].length; i++) {okres_Zlaté_Moravce.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Zlaté_Moravce.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Zvolen.geometry.coordinates[0].length; i++) {okres_Zvolen.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Zvolen.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Žarnovica.geometry.coordinates[0].length; i++) {okres_Žarnovica.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Žarnovica.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Žiar_nad_Hronom.geometry.coordinates[0].length; i++) {okres_Žiar_nad_Hronom.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Žiar_nad_Hronom.geometry.coordinates[0][i]);}
	for(var i = 0; i <okres_Žilina.geometry.coordinates[0].length; i++) {okres_Žilina.geometry.coordinates[0][i] = L.GeoJSON.coordsToLatLng(okres_Žilina.geometry.coordinates[0][i]);}

	
//	polyBA = L.polygon(bratislavsky.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
//	polyTT = L.polygon(trnavsky.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
//	polyTC = L.polygon(trenciansky.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
//	polyPV = L.polygon(presovsky.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
//	polyKE = L.polygon(kosicky.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
//	polyZA = L.polygon(zilinsky.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
//	polyNR = L.polygon(nitriansky.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
//	polyBB = L.polygon(banskobystricky.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Bánovce_nad_Bebravou = L.polygon(okres_Bánovce_nad_Bebravou.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Banská_Bystrica = L.polygon(okres_Banská_Bystrica.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Banská_Štiavnica = L.polygon(okres_Banská_Štiavnica.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Bardejov = L.polygon(okres_Bardejov.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Bratislava_I = L.polygon(okres_Bratislava_I.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Bratislava_II = L.polygon(okres_Bratislava_II.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Bratislava_III = L.polygon(okres_Bratislava_III.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Bratislava_IV = L.polygon(okres_Bratislava_IV.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Bratislava_V = L.polygon(okres_Bratislava_V.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Brezno = L.polygon(okres_Brezno.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Bytča = L.polygon(okres_Bytča.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Čadca = L.polygon(okres_Čadca.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Detva = L.polygon(okres_Detva.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Dolný_Kubín = L.polygon(okres_Dolný_Kubín.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Dunajská_Streda = L.polygon(okres_Dunajská_Streda.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Galanta = L.polygon(okres_Galanta.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Gelnica = L.polygon(okres_Gelnica.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Hlohovec = L.polygon(okres_Hlohovec.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Humenné = L.polygon(okres_Humenné.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Ilava = L.polygon(okres_Ilava.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Kežmarok = L.polygon(okres_Kežmarok.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Komárno = L.polygon(okres_Komárno.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Košice_okolie = L.polygon(okres_Košice_okolie.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Košice_I = L.polygon(okres_Košice_I.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Košice_II = L.polygon(okres_Košice_II.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Košice_III = L.polygon(okres_Košice_III.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Košice_IV = L.polygon(okres_Košice_IV.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Krupina = L.polygon(okres_Krupina.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Kysucké_Nové_Mesto = L.polygon(okres_Kysucké_Nové_Mesto.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Levice = L.polygon(okres_Levice.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Levoča = L.polygon(okres_Levoča.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Liptovský_Mikuláš = L.polygon(okres_Liptovský_Mikuláš.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Lučenec = L.polygon(okres_Lučenec.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Malacky = L.polygon(okres_Malacky.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Martin = L.polygon(okres_Martin.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Medzilaborce = L.polygon(okres_Medzilaborce.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Michalovce = L.polygon(okres_Michalovce.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Myjava = L.polygon(okres_Myjava.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Námestovo = L.polygon(okres_Námestovo.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Nitra = L.polygon(okres_Nitra.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Nové_Mesto_nad_Váhom = L.polygon(okres_Nové_Mesto_nad_Váhom.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Nové_Zámky = L.polygon(okres_Nové_Zámky.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Partizánske = L.polygon(okres_Partizánske.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Pezinok = L.polygon(okres_Pezinok.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Piešťany = L.polygon(okres_Piešťany.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Poltár = L.polygon(okres_Poltár.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Poprad = L.polygon(okres_Poprad.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Považská_Bystrica = L.polygon(okres_Považská_Bystrica.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Prešov = L.polygon(okres_Prešov.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Prievidza = L.polygon(okres_Prievidza.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Púchov = L.polygon(okres_Púchov.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Revúca = L.polygon(okres_Revúca.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Rimavská_Sobota = L.polygon(okres_Rimavská_Sobota.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Rožňava = L.polygon(okres_Rožňava.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Ružomberok = L.polygon(okres_Ružomberok.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Sabinov = L.polygon(okres_Sabinov.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Senec = L.polygon(okres_Senec.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Senica = L.polygon(okres_Senica.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Skalica = L.polygon(okres_Skalica.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Snina = L.polygon(okres_Snina.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Sobrance = L.polygon(okres_Sobrance.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Spišská_Nová_Ves = L.polygon(okres_Spišská_Nová_Ves.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Stará_Ľubovňa = L.polygon(okres_Stará_Ľubovňa.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Stropkov = L.polygon(okres_Stropkov.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Svidník = L.polygon(okres_Svidník.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Šaľa = L.polygon(okres_Šaľa.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Topolčany = L.polygon(okres_Topolčany.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Trebišov = L.polygon(okres_Trebišov.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Trenčín = L.polygon(okres_Trenčín.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Trnava = L.polygon(okres_Trnava.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Turčianske_Teplice = L.polygon(okres_Turčianske_Teplice.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Tvrdošín = L.polygon(okres_Tvrdošín.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Veľký_Krtíš = L.polygon(okres_Veľký_Krtíš.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Vranov_nad_Topľou = L.polygon(okres_Vranov_nad_Topľou.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Zlaté_Moravce = L.polygon(okres_Zlaté_Moravce.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Zvolen = L.polygon(okres_Zvolen.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Žarnovica = L.polygon(okres_Žarnovica.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Žiar_nad_Hronom = L.polygon(okres_Žiar_nad_Hronom.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	poly_okres_Žilina = L.polygon(okres_Žilina.geometry.coordinates[0], {color: 'green', opacity: '1', weight: '2'}).addTo(map);
	
//	polyBA.on('click', onPolyClickBA);
//	polyTT.on('click', onPolyClickTT);
//	polyTC.on('click', onPolyClickTC);
//	polyPV.on('click', onPolyClickPV);
//	polyKE.on('click', onPolyClickKE);
//	polyZA.on('click', onPolyClickZA);
//	polyNR.on('click', onPolyClickNR);
//	polyBB.on('click', onPolyClickBB);
	poly_okres_Bánovce_nad_Bebravou.on('click',click_poly_okres_Bánovce_nad_Bebravou);
	poly_okres_Banská_Bystrica.on('click',click_poly_okres_Banská_Bystrica);
	poly_okres_Banská_Štiavnica.on('click',click_poly_okres_Banská_Štiavnica);
	poly_okres_Bardejov.on('click',click_poly_okres_Bardejov);
	poly_okres_Bratislava_I.on('click',click_poly_okres_Bratislava_I);
	poly_okres_Bratislava_II.on('click',click_poly_okres_Bratislava_II);
	poly_okres_Bratislava_III.on('click',click_poly_okres_Bratislava_III);
	poly_okres_Bratislava_IV.on('click',click_poly_okres_Bratislava_IV);
	poly_okres_Bratislava_V.on('click',click_poly_okres_Bratislava_V);
	poly_okres_Brezno.on('click',click_poly_okres_Brezno);
	poly_okres_Bytča.on('click',click_poly_okres_Bytča);
	poly_okres_Čadca.on('click',click_poly_okres_Čadca);
	poly_okres_Detva.on('click',click_poly_okres_Detva);
	poly_okres_Dolný_Kubín.on('click',click_poly_okres_Dolný_Kubín);
	poly_okres_Dunajská_Streda.on('click',click_poly_okres_Dunajská_Streda);
	poly_okres_Galanta.on('click',click_poly_okres_Galanta);
	poly_okres_Gelnica.on('click',click_poly_okres_Gelnica);
	poly_okres_Hlohovec.on('click',click_poly_okres_Hlohovec);
	poly_okres_Humenné.on('click',click_poly_okres_Humenné);
	poly_okres_Ilava.on('click',click_poly_okres_Ilava);
	poly_okres_Kežmarok.on('click',click_poly_okres_Kežmarok);
	poly_okres_Komárno.on('click',click_poly_okres_Komárno);
	poly_okres_Košice_okolie.on('click',click_poly_okres_Košice_okolie);
	poly_okres_Košice_I.on('click',click_poly_okres_Košice_I);
	poly_okres_Košice_II.on('click',click_poly_okres_Košice_II);
	poly_okres_Košice_III.on('click',click_poly_okres_Košice_III);
	poly_okres_Košice_IV.on('click',click_poly_okres_Košice_IV);
	poly_okres_Krupina.on('click',click_poly_okres_Krupina);
	poly_okres_Kysucké_Nové_Mesto.on('click',click_poly_okres_Kysucké_Nové_Mesto);
	poly_okres_Levice.on('click',click_poly_okres_Levice);
	poly_okres_Levoča.on('click',click_poly_okres_Levoča);
	poly_okres_Liptovský_Mikuláš.on('click',click_poly_okres_Liptovský_Mikuláš);
	poly_okres_Lučenec.on('click',click_poly_okres_Lučenec);
	poly_okres_Malacky.on('click',click_poly_okres_Malacky);
	poly_okres_Martin.on('click',click_poly_okres_Martin);
	poly_okres_Medzilaborce.on('click',click_poly_okres_Medzilaborce);
	poly_okres_Michalovce.on('click',click_poly_okres_Michalovce);
	poly_okres_Myjava.on('click',click_poly_okres_Myjava);
	poly_okres_Námestovo.on('click',click_poly_okres_Námestovo);
	poly_okres_Nitra.on('click',click_poly_okres_Nitra);
	poly_okres_Nové_Mesto_nad_Váhom.on('click',click_poly_okres_Nové_Mesto_nad_Váhom);
	poly_okres_Nové_Zámky.on('click',click_poly_okres_Nové_Zámky);
	poly_okres_Partizánske.on('click',click_poly_okres_Partizánske);
	poly_okres_Pezinok.on('click',click_poly_okres_Pezinok);
	poly_okres_Piešťany.on('click',click_poly_okres_Piešťany);
	poly_okres_Poltár.on('click',click_poly_okres_Poltár);
	poly_okres_Poprad.on('click',click_poly_okres_Poprad);
	poly_okres_Považská_Bystrica.on('click',click_poly_okres_Považská_Bystrica);
	poly_okres_Prešov.on('click',click_poly_okres_Prešov);
	poly_okres_Prievidza.on('click',click_poly_okres_Prievidza);
	poly_okres_Púchov.on('click',click_poly_okres_Púchov);
	poly_okres_Revúca.on('click',click_poly_okres_Revúca);
	poly_okres_Rimavská_Sobota.on('click',click_poly_okres_Rimavská_Sobota);
	poly_okres_Rožňava.on('click',click_poly_okres_Rožňava);
	poly_okres_Ružomberok.on('click',click_poly_okres_Ružomberok);
	poly_okres_Sabinov.on('click',click_poly_okres_Sabinov);
	poly_okres_Senec.on('click',click_poly_okres_Senec);
	poly_okres_Senica.on('click',click_poly_okres_Senica);
	poly_okres_Skalica.on('click',click_poly_okres_Skalica);
	poly_okres_Snina.on('click',click_poly_okres_Snina);
	poly_okres_Sobrance.on('click',click_poly_okres_Sobrance);
	poly_okres_Spišská_Nová_Ves.on('click',click_poly_okres_Spišská_Nová_Ves);
	poly_okres_Stará_Ľubovňa.on('click',click_poly_okres_Stará_Ľubovňa);
	poly_okres_Stropkov.on('click',click_poly_okres_Stropkov);
	poly_okres_Svidník.on('click',click_poly_okres_Svidník);
	poly_okres_Šaľa.on('click',click_poly_okres_Šaľa);
	poly_okres_Topolčany.on('click',click_poly_okres_Topolčany);
	poly_okres_Trebišov.on('click',click_poly_okres_Trebišov);
	poly_okres_Trenčín.on('click',click_poly_okres_Trenčín);
	poly_okres_Trnava.on('click',click_poly_okres_Trnava);
	poly_okres_Turčianske_Teplice.on('click',click_poly_okres_Turčianske_Teplice);
	poly_okres_Tvrdošín.on('click',click_poly_okres_Tvrdošín);
	poly_okres_Veľký_Krtíš.on('click',click_poly_okres_Veľký_Krtíš);
	poly_okres_Vranov_nad_Topľou.on('click',click_poly_okres_Vranov_nad_Topľou);
	poly_okres_Zlaté_Moravce.on('click',click_poly_okres_Zlaté_Moravce);
	poly_okres_Zvolen.on('click',click_poly_okres_Zvolen);
	poly_okres_Žarnovica.on('click',click_poly_okres_Žarnovica);
	poly_okres_Žiar_nad_Hronom.on('click',click_poly_okres_Žiar_nad_Hronom);
	poly_okres_Žilina.on('click',click_poly_okres_Žilina);

	
//	polyBA.on('mouseover', function () {
//	      this.setStyle({
//	        'weight': '5'
//	      });
//	});
//	polyBA.on('mouseout', function () {
//		this.setStyle({
//			'weight': '2'
//		});
//	});
//	polyTT.on('mouseover', function () {
//	      this.setStyle({
//	        'weight': '5'
//	      });
//	});
//	polyTT.on('mouseout', function () {
//		this.setStyle({
//			'weight': '2'
//		});
//	});
//	polyTC.on('mouseover', function () {
//	      this.setStyle({
//	        'weight': '5'
//	      });
//	});
//	polyTC.on('mouseout', function () {
//		this.setStyle({
//			'weight': '2'
//		});
//	});
//	polyPV.on('mouseover', function () {
//	      this.setStyle({
//	        'weight': '5'
//	      });
//	});
//	polyPV.on('mouseout', function () {
//		this.setStyle({
//			'weight': '2'
//		});
//	});
//	polyKE.on('mouseover', function () {
//	      this.setStyle({
//	        'weight': '5'
//	      });
//	});
//	polyKE.on('mouseout', function () {
//		this.setStyle({
//			'weight': '2'
//		});
//	});
//	polyZA.on('mouseover', function () {
//	      this.setStyle({
//	        'weight': '5'
//	      });
//	});
//	polyZA.on('mouseout', function () {
//		this.setStyle({
//			'weight': '2'
//		});
//	});
//	polyNR.on('mouseover', function () {
//	      this.setStyle({
//	        'weight': '5'
//	      });
//	});
//	polyNR.on('mouseout', function () {
//		this.setStyle({
//			'weight': '2'
//		});
//	});
//	polyBB.on('mouseover', function () {
//	      this.setStyle({
//	        'weight': '5'
//	      });
//	});
//	polyBB.on('mouseout', function () {
//		this.setStyle({
//			'weight': '2'
//		});
//	});
	poly_okres_Bánovce_nad_Bebravou.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Banská_Bystrica.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Banská_Štiavnica.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Bardejov.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Bratislava_I.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Bratislava_II.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Bratislava_III.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Bratislava_IV.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Bratislava_V.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Brezno.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Bytča.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Čadca.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Detva.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Dolný_Kubín.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Dunajská_Streda.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Galanta.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Gelnica.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Hlohovec.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Humenné.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Ilava.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Kežmarok.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Komárno.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Košice_okolie.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Košice_I.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Košice_II.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Košice_III.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Košice_IV.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Krupina.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Kysucké_Nové_Mesto.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Levice.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Levoča.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Liptovský_Mikuláš.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Lučenec.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Malacky.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Martin.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Medzilaborce.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Michalovce.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Myjava.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Námestovo.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Nitra.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Nové_Mesto_nad_Váhom.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Nové_Zámky.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Partizánske.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Pezinok.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Piešťany.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Poltár.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Poprad.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Považská_Bystrica.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Prešov.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Prievidza.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Púchov.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Revúca.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Rimavská_Sobota.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Rožňava.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Ružomberok.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Sabinov.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Senec.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Senica.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Skalica.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Snina.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Sobrance.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Spišská_Nová_Ves.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Stará_Ľubovňa.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Stropkov.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Svidník.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Šaľa.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Topolčany.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Trebišov.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Trenčín.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Trnava.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Turčianske_Teplice.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Tvrdošín.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Veľký_Krtíš.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Vranov_nad_Topľou.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Zlaté_Moravce.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Zvolen.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Žarnovica.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Žiar_nad_Hronom.on('mouseover', function () {this.setStyle({'weight': '5'});});
	poly_okres_Žilina.on('mouseover', function () {this.setStyle({'weight': '5'});});

	poly_okres_Bánovce_nad_Bebravou.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Banská_Bystrica.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Banská_Štiavnica.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Bardejov.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Bratislava_I.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Bratislava_II.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Bratislava_III.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Bratislava_IV.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Bratislava_V.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Brezno.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Bytča.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Čadca.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Detva.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Dolný_Kubín.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Dunajská_Streda.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Galanta.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Gelnica.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Hlohovec.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Humenné.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Ilava.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Kežmarok.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Komárno.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Košice_okolie.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Košice_I.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Košice_II.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Košice_III.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Košice_IV.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Krupina.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Kysucké_Nové_Mesto.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Levice.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Levoča.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Liptovský_Mikuláš.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Lučenec.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Malacky.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Martin.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Medzilaborce.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Michalovce.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Myjava.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Námestovo.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Nitra.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Nové_Mesto_nad_Váhom.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Nové_Zámky.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Partizánske.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Pezinok.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Piešťany.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Poltár.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Poprad.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Považská_Bystrica.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Prešov.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Prievidza.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Púchov.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Revúca.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Rimavská_Sobota.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Rožňava.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Ružomberok.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Sabinov.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Senec.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Senica.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Skalica.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Snina.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Sobrance.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Spišská_Nová_Ves.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Stará_Ľubovňa.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Stropkov.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Svidník.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Šaľa.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Topolčany.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Trebišov.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Trenčín.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Trnava.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Turčianske_Teplice.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Tvrdošín.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Veľký_Krtíš.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Vranov_nad_Topľou.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Zlaté_Moravce.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Zvolen.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Žarnovica.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Žiar_nad_Hronom.on('mouseout', function () {this.setStyle({'weight': '2'});});
	poly_okres_Žilina.on('mouseout', function () {this.setStyle({'weight': '2'});});

});


////Handle click on polygon
//var onPolyClickBA = function(event){
//	myLayer.clearLayers();
//	jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=BA", function(response) {
//		var geojson = jQuery.parseJSON(response);
//		myLayer.setGeoJSON(geojson);
//	});
//};
////Handle click on polygon
//var onPolyClickTT = function(event){
//	myLayer.clearLayers();
//	jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=TT", function(response) {
//		var geojson = jQuery.parseJSON(response);
//		myLayer.setGeoJSON(geojson);
//	});
//};
////Handle click on polygon
//var onPolyClickTC = function(event){
//	myLayer.clearLayers();
//	jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=TC", function(response) {
//		var geojson = jQuery.parseJSON(response);
//		myLayer.setGeoJSON(geojson);
//	});
//};
////Handle click on polygon
//var onPolyClickPV = function(event){
//	myLayer.clearLayers();
//	jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=PV", function(response) {
//		var geojson = jQuery.parseJSON(response);
//		myLayer.setGeoJSON(geojson);
//	});
//};
////Handle click on polygon
//var onPolyClickKE = function(event){
//	myLayer.clearLayers();
//	jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=KE", function(response) {
//		var geojson = jQuery.parseJSON(response);
//		myLayer.setGeoJSON(geojson);
//	});
//};
////Handle click on polygon
//var onPolyClickZA = function(event){
//	myLayer.clearLayers();
//	jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=ZA", function(response) {
//		var geojson = jQuery.parseJSON(response);
//		myLayer.setGeoJSON(geojson);
//	});
//};
////Handle click on polygon
//var onPolyClickNR = function(event){
//	myLayer.clearLayers();
//	jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=NR", function(response) {
//		var geojson = jQuery.parseJSON(response);
//		myLayer.setGeoJSON(geojson);
//	});
//};
////Handle click on polygon
//var onPolyClickBB = function(event){
//	myLayer.clearLayers();
//	jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=BB", function(response) {
//		var geojson = jQuery.parseJSON(response);
//		myLayer.setGeoJSON(geojson);
//	});
//};
//
//

// akcia tlacidla vsetky banky
$(document).ready(function(response) {
	$("#vsetkyBanky").click(function() {
		myLayer.clearLayers();
		jQuery.get("http://localhost:8080/allBanks", function(response) {
			var geojson = jQuery.parseJSON(response);
			console.log(geojson);
			myLayer.setGeoJSON(geojson);
		});
	});
});
var click_poly_okres_Bánovce_nad_Bebravou  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Bánovce_nad_Bebravou", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Banská_Bystrica  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Banská_Bystrica", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Banská_Štiavnica  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Banská_Štiavnica", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Bardejov  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Bardejov", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Bratislava_I  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Bratislava_I", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Bratislava_II  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Bratislava_II", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Bratislava_III  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Bratislava_III", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Bratislava_IV  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Bratislava_IV", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Bratislava_V  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Bratislava_V", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Brezno  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Brezno", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Bytča  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Bytča", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Čadca  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Čadca", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Detva  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Detva", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Dolný_Kubín  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Dolný_Kubín", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Dunajská_Streda  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Dunajská_Streda", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Galanta  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Galanta", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Gelnica  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Gelnica", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Hlohovec  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Hlohovec", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Humenné  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Humenné", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Ilava  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Ilava", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Kežmarok  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Kežmarok", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Komárno  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Komárno", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Košice_okolie  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Košice_okolie", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Košice_I  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Košice_I", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Košice_II  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Košice_II", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Košice_III  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Košice_III", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Košice_IV  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Košice_IV", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Krupina  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Krupina", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Kysucké_Nové_Mesto  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Kysucké_Nové_Mesto", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Levice  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Levice", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Levoča  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Levoča", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Liptovský_Mikuláš  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Liptovský_Mikuláš", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Lučenec  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Lučenec", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Malacky  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Malacky", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Martin  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Martin", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Medzilaborce  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Medzilaborce", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Michalovce  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Michalovce", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Myjava  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Myjava", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Námestovo  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Námestovo", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Nitra  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Nitra", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Nové_Mesto_nad_Váhom  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Nové_Mesto_nad_Váhom", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Nové_Zámky  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Nové_Zámky", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Partizánske  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Partizánske", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Pezinok  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Pezinok", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Piešťany  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Piešťany", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Poltár  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Poltár", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Poprad  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Poprad", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Považská_Bystrica  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Považská_Bystrica", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Prešov  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Prešov", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Prievidza  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Prievidza", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Púchov  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Púchov", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Revúca  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Revúca", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Rimavská_Sobota  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Rimavská_Sobota", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Rožňava  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Rožňava", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Ružomberok  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Ružomberok", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Sabinov  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Sabinov", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Senec  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Senec", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Senica  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Senica", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Skalica  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Skalica", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Snina  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Snina", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Sobrance  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Sobrance", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Spišská_Nová_Ves  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Spišská_Nová_Ves", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Stará_Ľubovňa  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Stará_Ľubovňa", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Stropkov  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Stropkov", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Svidník  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Svidník", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Šaľa  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Šaľa", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Topolčany  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Topolčany", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Trebišov  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Trebišov", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Trenčín  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Trenčín", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Trnava  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Trnava", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Turčianske_Teplice  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Turčianske_Teplice", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Tvrdošín  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Tvrdošín", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Veľký_Krtíš  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Veľký_Krtíš", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Vranov_nad_Topľou  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Vranov_nad_Topľou", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Zlaté_Moravce  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Zlaté_Moravce", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Zvolen  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Zvolen", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Žarnovica  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Žarnovica", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Žiar_nad_Hronom  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Žiar_nad_Hronom", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});};
var click_poly_okres_Žilina  = function(event){myLayer.clearLayers();jQuery.get("http://localhost:8080/getBanksOfBoudary?boundary=okres_Žilina", function(response) {var geojson = jQuery.parseJSON(response);myLayer.setGeoJSON(geojson);});}; 

//akcia tlacidla banky v oblasti nakreslenej na mape
$(document).ready(function(response) {
	$("#vykresleneBanky").click(function() {
		myLayer.clearLayers();
		
		var zd1 = markers[0].getLatLng().lng;
		var zs1 = markers[0].getLatLng().lat;
		var zd2 = markers[1].getLatLng().lng;
		var zs2 = markers[1].getLatLng().lat;
		var zd3 = markers[2].getLatLng().lng;
		var zs3 = markers[2].getLatLng().lat;
		var zd4 = markers[3].getLatLng().lng;
		var zs4 = markers[3].getLatLng().lat;
			
		jQuery.get("http://localhost:8080/paintedBanks?zs1=" + zs1 + "&zd1=" + zd1 + "&zs2=" + zs2 + "&zd2=" + zd2 + "&zs3=" + zs3 + "&zd3=" + zd3 + "&zs4=" + zs4 + "&zd4=" + zd4, function(response) {
			var geojson = jQuery.parseJSON(response);
			myLayer.setGeoJSON(geojson);
		});
	});
});

// akcia tlacidla banky v mojom okoli
$(document).ready(function() {
	$("#bankyVokoli").click(function() {
		if (!navigator.geolocation) {
			geolocate.innerHTML = 'Nie je mozne urcit polohu';
			console.log('Nie je mozne urcit polohu');
		} else {
			map.locate();
		}
	});
});

// zobrazenie bank v okoli 20 km od mojej pozicie
map.on('locationfound', function(e) {
	myLayer.clearLayers();
	
	var latLng = e.latlng;
	
	jQuery.get("http://localhost:8080/nearestBanks?zs=" + latLng.lat + "&zd=" + latLng.lng + "&radius=20", function(response) {
		var geojson = jQuery.parseJSON(response);
		myLayer.setGeoJSON(geojson);
	});
});

// akcia tlacidla banky podla nazvu
$(document).ready(function() {
	$("#btnBankyPodlaNazvu").click(function() {
		myLayer.clearLayers();

		var csob = document.getElementById('cb_csob').checked;
		var slsp = document.getElementById('cb_slsp').checked;
		var tb = document.getElementById('cb_tb').checked;
		var vub = document.getElementById('cb_vub').checked;
		var unicredit = document.getElementById('cb_unicredit').checked;
		var sberbank = document.getElementById('cb_sberbank').checked;
		var fio = document.getElementById('cb_fio').checked;
		var mbank = document.getElementById('cb_mbank').checked;
		var otp = document.getElementById('cb_otp').checked;
		var postova = document.getElementById('cb_postova').checked;
		var prima = document.getElementById('cb_prima').checked;
		var raiffeisen = document.getElementById('cb_raiffeisen').checked;

		jQuery.get("http://localhost:8080/choosedBanks?cb_csob="+ csob + "&cb_slsp=" + slsp + "&cb_tb=" + tb + "&cb_vub=" + vub + "&cb_unicredit=" + unicredit + "&cb_sberbank=" + sberbank + "&cb_fio=" + fio + "&cb_mbank=" + mbank + "&cb_otp=" + otp + "&cb_postova=" + postova + "&cb_prima=" + prima + "&cb_raiffeisen=" + raiffeisen,
				function(response) {
					var geojson = jQuery.parseJSON(response);
					myLayer.setGeoJSON(geojson);
				});
	});
});

// // akcia tlacidla banky v okruhu zadanej vzdialenosti
$(document).ready(function() {
	$("#okruhVzd").click(function() {
		myLayer.clearLayers();
		
		var lat = document.getElementsByName('zs')[0].value;
		var lng = document.getElementsByName('zd')[0].value;
		var radius = document.getElementsByName('vzdialenost')[0].value;
		var latLng = new L.latLng(lat, lng);
		
		jQuery.get("http://localhost:8080/nearestBanks?zs=" + lat + "&zd=" + lng + "&radius=" + radius,
				function(response) {
					var geojson = jQuery.parseJSON(response);
					myLayer.setGeoJSON(geojson);
				});
	});
});

// akcia tlacidla poi v okruhu zadanej vzdialenosti
$(document).ready(function() {
	$("#okruhVzdPoi").click(function() {
		myLayer.clearLayers();

		var lat = document.getElementsByName('zs')[0].value;
		var lng = document.getElementsByName('zd')[0].value;
		var radius = document.getElementsByName('vzdialenost')[0].value;
		var latLng = new L.latLng(lat, lng);
		var temp = null;
		
		jQuery.get("http://localhost:8080/nearestAtms?zs=" + lat + "&zd=" + lng + "&radius=" + radius,
				function(response) {
					var geojson = jQuery.parseJSON(response);
					temp = String(response);
					myLayer.setGeoJSON(geojson);
				});
	});
});

// akcia tlacidla banky podla nazvu
$(document).ready(function() {
	$("#bankyVoVzd").click(function() {

		myLayer.clearLayers();

		var count = document.getElementsByName('pocetBank')[0].value;
		var zs = document.getElementsByName('zs')[0].value;
		var zd = document.getElementsByName('zd')[0].value;
		var radius = document.getElementsByName('vzdialenost')[0].value;
		var latLng = new L.latLng(zs, zd);
		var csob = document.getElementById('cb_csob').checked;
		var slsp = document.getElementById('cb_slsp').checked;
		var tb = document.getElementById('cb_tb').checked;
		var vub = document.getElementById('cb_vub').checked;
		var unicredit = document.getElementById('cb_unicredit').checked;
		var sberbank = document.getElementById('cb_sberbank').checked;
		var fio = document.getElementById('cb_fio').checked;
		var mbank = document.getElementById('cb_mbank').checked;
		var otp = document.getElementById('cb_otp').checked;
		var postova = document.getElementById('cb_postova').checked;
		var prima = document.getElementById('cb_prima').checked;
		var raiffeisen = document.getElementById('cb_raiffeisen').checked;

		jQuery.get("http://localhost:8080/nearestBanksInRadiusAndName?zs=" + zs + "&zd=" + zd + "&radius=" + radius + "&count=" + count + "&cb_csob=" + csob + "&cb_slsp=" + slsp + "&cb_tb=" + tb + "&cb_vub=" + vub + "&cb_unicredit=" + unicredit + "&cb_sberbank=" + sberbank + "&cb_fio=" + fio + "&cb_mbank=" + mbank + "&cb_otp=" + otp + "&cb_postova=" + postova + "&cb_prima=" + prima + "&cb_raiffeisen=" + raiffeisen,
				function(response) {
					var geojson = jQuery.parseJSON(response);
					myLayer.setGeoJSON(geojson);
				});
	});
});

// vycistenie mapy
$(document).ready(function() {
	$("#vycistit").click(function() {
		myLayer.clearLayers();
		atmLayer.clearLayers();
		boundariesLayer.clearLayers();
		map.removeLayer(marker); // remove
		map.removeLayer(polyline);
		markerDelAgain();
		clicked = 0;
		polyline = new L.Polyline([]).addTo(map);
		markers = [];
	});
});

// funkcia na ulozenie geopozicie do textareas
map.on('dblclick', function(e) {
	map.clicked = 0;
	var latLng = e.latlng;

	marker.setLatLng([ latLng.lat, latLng.lng ]);
	marker.addTo(map);

	document.getElementsByName('zs')[0].value = latLng.lat;
	document.getElementsByName('zd')[0].value = latLng.lng;

});

// odstranenie markerov
function markerDelAgain() {
	for (i = 0; i < markers.length; i++) {
		map.removeLayer(markers[i]);
	}
}

// funkcia na ulozenie geopozicie do polyline
//map.on('click', function(e) {
//
//	map.clicked = map.clicked + 1;
//
//	setTimeout(function() {
//		if (map.clicked == 1) {
//			if (clicked < 4) {
//
//				polyline.addLatLng(e.latlng);
//				markers.push(new L.Marker(e.latlng))
//				markers[clicked].addTo(map);
//
//				console.log(polyline.getBounds());
//				clicked++;
//
//			} else {
//				map.removeLayer(polyline);
//				markerDelAgain();
//				clicked = 0;
//				polyline = new L.Polyline([]).addTo(map);
//				markers = [];
//			}
//			map.clicked = 0;
//		}
//	}, 200);
//});

// zobrazenie popup okna po kliknuti na marker
myLayer.on('layeradd', function(e) {
	
	var popupContent = "";
	var title = e.layer.feature.properties.title;
	var street = e.layer.feature.properties.street;
	var streetNumber = e.layer.feature.properties.streetnumber;
	var city = e.layer.feature.properties.city;
	var postcode = e.layer.feature.properties.postcode;
		
	
	var amenity = e.layer.feature.properties.amenity;
	
	if(title != "title" && title != undefined) {
		popupContent = "<b>Názov banky: " + e.layer.feature.properties.title + "</b><br/>"
	}
	if(street != "street"  && streetNumber != "streetnumber" && street != undefined && streetNumber != undefined) {
		popupContent = popupContent + "Adresa:<br\>" + e.layer.feature.properties.street + " " + e.layer.feature.properties.streetnumber + "<br\>"
	}
	if( city != "city" && city != undefined) {
		popupContent = popupContent + e.layer.feature.properties.city + "<br\>"
	}
	if(postcode != undefined && postcode != "postcode") {
		popupContent = popupContent + e.layer.feature.properties.postcode + "<br\>"
	}
	if(amenity != undefined) {
		popupContent = popupContent + e.layer.feature.properties.amenity + "<br\>"
	}
	
//	popupContent = popupContent + ";";
	e.layer.bindPopup(popupContent, {
		closeButton : false,
		minWidth : 100
	});
});