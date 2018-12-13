package main;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.json.JSONException;
import org.json.JSONObject;

public class Dbs {

	private static String USER = "postgres";
	private static String PASSWORD = "admin";
	private static String URL = "jdbc:postgresql://localhost:5432/pdt_project";
	private static Connection connection = null;

	
	// FUNCTIONS
	public static Connection connectDbs() {

		try {
			Class.forName("org.postgresql.Driver");
			Properties props = new Properties();
			props.setProperty("user", USER);
			props.setProperty("password",PASSWORD);
			props.setProperty("socketTimeout","20");
//			props.setProperty("ssl","true");

			
			connection = DriverManager.getConnection(URL, props);
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println(e.getClass().getName() + ": " + e.getMessage());
			System.exit(0);
		}

		return connection;
	}

	public static void disconnectDbs() {

		try {
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public static String getValueFromTags(String tags, String name) {
		
		int offset = 0;
		
		switch(name) {
			case "city" : 
				offset = 14;
				break;
			case "street" : 
				offset = 16;
				break;
			case "postcode" : 
				offset = 18;
				break;
			case "streetnumber" : 
				offset = 22;
				break;
		}

		if(tags.contains(name)) {
			name = tags.substring(tags.indexOf("\"addr:"+ name +"\"=>\"") + offset);
			name = name.substring(0, name.indexOf("\""));
		}
		
		return name;
	}
	
	public static String getNamesOfChoosedBanks(String cb_csob, String cb_slsp, String cb_tb, String cb_vub, String cb_unicredit, 
			String cb_sberbank, String cb_fio, String cb_mbank, String cb_otp, String cb_postova, String cb_prima, String cb_raiffeisen) {
		
		String sql = "";
		
		if(cb_csob.equals("true"))
			sql = sql + " OR name LIKE 'CSOB%'";
		if(cb_slsp.equals("true"))
			sql = sql + " OR name LIKE 'SLOVENSKA SPORITELNA%' OR name LIKE 'SLSP'";
		if(cb_tb.equals("true"))
			sql = sql + " OR name LIKE 'TATRA BANKA%'";
		if(cb_vub.equals("true"))
			sql = sql + " OR name LIKE 'VUB%'";
		if(cb_unicredit.equals("true"))
			sql = sql + " OR name LIKE 'UNICREDIT BANK%'";
		if(cb_sberbank.equals("true"))
			sql = sql + " OR name LIKE 'SBERBANK%'";
		if(cb_fio.equals("true"))
			sql = sql + " OR name LIKE 'FIO%'";
		if(cb_mbank.equals("true"))
			sql = sql + " OR name LIKE UPPER(unaccent('mbank'))";
		if(cb_otp.equals("true"))
			sql = sql + " OR name LIKE 'OTP%'";
		if(cb_postova.equals("true"))
			sql = sql + " OR name LIKE 'POSTOVA BANKA%'";
		if(cb_prima.equals("true"))	
			sql = sql + " OR name LIKE 'PRIMA BANKA%'";
		if(cb_raiffeisen.equals("true"))
			sql = sql + " OR name LIKE 'RAIFFEISEN BANK%'";
		sql = sql + ")";
		
		return sql;
	}
	
	public static String getAmenityPOI(String amenity) {
		
		switch(amenity) {
		
			case "atm": 
				return "BANKOMAT";
			case "bar": 
				return "BAR";
			case "cafe": 
				return "KAVIAREŇ";
			case "restaurant": 
				return "REŠTAURÁCIA";
			case "toilets": 
				return "WC";
		}
		return "";
	}
	
	public static String getColorPOI(String amenity) {
		
		switch(amenity) {
		
			case "atm": 
				return "#000000";
			case "bar": 
				return "#FE2E64";
			case "cafe": 
				return "#886A08";
			case "restaurant": 
				return "#2E2EFE";
			case "toilets": 
				return "#D8F781";
		}
		return "";
	}
	
	public static JSONObject buildJSON(ResultSet result) {
		
		JSONObject json = new JSONObject();
	
		try {
			
			String tags = result.getString("tags");

			json.put("type", "Feature");
			json.put("geometry", new JSONObject(result.getString("result")));
			JSONObject properties = new JSONObject();
			properties.put("title", result.getString("name"));
			properties.put("city", getValueFromTags(tags, "city"));
			properties.put("street", getValueFromTags(tags, "street"));
			properties.put("streetnumber", getValueFromTags(tags, "streetnumber"));
			properties.put("postcode", getValueFromTags(tags, "postcode"));
			properties.put("marker-color", "#000000");
			properties.put("marker-size", "small");
			properties.put("marker-symbol", "bank");
			json.put("properties", properties);
			
			return json;
			
		} catch (JSONException | SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	// QUERIES
	public static List<JSONObject> getAllBanks() {

		List<JSONObject> geoJsons = new ArrayList<>();

		try {
			
			Statement statement = connectDbs().createStatement();
//			ResultSet result = statement.executeQuery("SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, tags FROM planet_osm_point WHERE amenity LIKE 'bank' AND name IS NOT NULL "
//					+ "UNION SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, tags FROM planet_osm_polygon WHERE amenity LIKE 'bank' AND name IS NOT NULL");
			ResultSet result = statement.executeQuery("SELECT * FROM banky_point UNION SELECT * FROM banky_polygon");
			
			while (result.next()) {
				
				JSONObject json = buildJSON(result);
				geoJsons.add(json);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		disconnectDbs();
		return geoJsons;
	}
	
	
	public static List<JSONObject> getChoosedBanks(String cb_csob, String cb_slsp, String cb_tb, String cb_vub, String cb_unicredit, 
			String cb_sberbank, String cb_fio, String cb_mbank, String cb_otp, String cb_postova, String cb_prima, String cb_raiffeisen) {

		List<JSONObject> geoJsons = new ArrayList<>();

		try {

			String names = getNamesOfChoosedBanks(cb_csob, cb_slsp, cb_tb, cb_vub, cb_unicredit, cb_sberbank, cb_fio, cb_mbank, cb_otp, cb_postova, cb_prima, cb_raiffeisen);
//			String sql = "SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, tags FROM planet_osm_point WHERE amenity LIKE 'bank' AND (UPPER(name) LIKE '' " + names;
			String sql = "SELECT * FROM banky_point WHERE (UPPER(name) LIKE '' " + names;

			Statement statement = connectDbs().createStatement();
			ResultSet result = statement.executeQuery(sql);
			
			while (result.next()) {
				
				JSONObject json = buildJSON(result);
				geoJsons.add(json);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		disconnectDbs();
		return geoJsons;
	}
	
	
	public static List<JSONObject> getNearestBanks(Double zs, Double zd, Integer radius) {

		List<JSONObject> geoJsons = new ArrayList<>();

		try {

//			String sql = "SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, tags FROM planet_osm_point WHERE amenity LIKE 'bank' AND name IS NOT NULL AND "
//					+ "ST_DWITHIN(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT(" + zd + ", " + zs + "),4326),3857)," + radius*1000*1.6 + ")";
			String sql = "SELECT * FROM banky_point WHERE "
					+ "ST_DWITHIN(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT(" + zd + ", " + zs + "),4326),3857)," + radius*1000*1.6 + ")";
		
			Statement statement = connectDbs().createStatement();
			ResultSet result = statement.executeQuery(sql);
			
			while (result.next()) {
				
				JSONObject json = buildJSON(result);
				geoJsons.add(json);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		disconnectDbs();
		return geoJsons;
	}
	
	public static List<JSONObject> getAtms(Double zs, Double zd, Integer radius) {

		List<JSONObject> geoJsons = new ArrayList<>();

		try {

			Statement statement = connectDbs().createStatement();
//			String sql = "SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, operator, amenity FROM planet_osm_point WHERE (amenity LIKE 'atm' OR amenity LIKE 'bar' OR amenity LIKE 'cafe' OR amenity LIKE 'restaurant' OR amenity LIKE 'toilets') AND "
//					+ "ST_DWITHIN(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT(" + zd + ", " + zs + "),4326),3857)," + radius*1000*1.6 + ")";
			String sql = "SELECT * FROM point_of_interest WHERE "
					+ "ST_DWITHIN(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT(" + zd + ", " + zs + "),4326),3857)," + radius*1000*1.6 + ")";
			
			ResultSet result = statement.executeQuery(sql);
			
			while (result.next()) {
				
				JSONObject json = new JSONObject();
				json.put("type", "Feature");
				json.put("geometry", new JSONObject(result.getString("result")));
				JSONObject properties = new JSONObject();
				properties.put("title", result.getString("operator"));
				properties.put("amenity", getAmenityPOI(result.getString("amenity")));
				properties.put("marker-color", getColorPOI(result.getString("amenity")));
				properties.put("marker-size", "small");
				properties.put("marker-symbol", "bank");
				json.put("properties", properties);
				geoJsons.add(json);
			}
			
		} catch (SQLException | JSONException e) {
			e.printStackTrace();
		}
		disconnectDbs();
		return geoJsons;
	}
	
	public static List<JSONObject> getNearestBanksInRadiusAndName(Double zs, Double zd, Integer radius, Integer count, String cb_csob, String cb_slsp, String cb_tb, String cb_vub, String cb_unicredit, 
			String cb_sberbank, String cb_fio, String cb_mbank, String cb_otp, String cb_postova, String cb_prima, String cb_raiffeisen) {

		List<JSONObject> geoJsons = new ArrayList<>();

		try {
			
			String names = getNamesOfChoosedBanks(cb_csob, cb_slsp, cb_tb, cb_vub, cb_unicredit, cb_sberbank, cb_fio, cb_mbank, cb_otp, cb_postova, cb_prima, cb_raiffeisen);
//			String sql = "SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, tags FROM planet_osm_point WHERE amenity LIKE 'bank' AND (name LIKE ''"+ names +" AND "
//					+ "ST_DWITHIN(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT(" + zd + ", " + zs + "),4326),3857)," + radius*1000*1.6 + ") ORDER BY ST_Distance(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT("+zd+","+zs+"),4326),3857)) LIMIT " + count;
			String sql = "SELECT * FROM banky_point WHERE (name LIKE ''" + names + " AND "
					+ "ST_DWITHIN(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT(" + zd + ", " + zs + "),4326),3857)," + radius*1000*1.6 + ") ORDER BY ST_Distance(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT("+zd+","+zs+"),4326),3857)) LIMIT " + count;
			
			Statement statement = connectDbs().createStatement();
			
			
			ResultSet result = statement.executeQuery(sql);
			
			while (result.next()) {
								
				JSONObject json = buildJSON(result);
				geoJsons.add(json);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		disconnectDbs();
		return geoJsons;
	}
	
	public static List<JSONObject> getPaintedBanks(Double zs1,  Double zd1, Double zs2, Double zd2, Double zs3, Double zd3,  Double zs4, Double zd4) {

		List<JSONObject> geoJsons = new ArrayList<>();

		try {

			String sql = "SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, way, tags FROM planet_osm_point WHERE amenity LIKE 'bank' AND name IS NOT NULL AND (SELECT ST_Contains(ST_Polygon(ST_GeomFromText('LINESTRING("
					+ zd1 + " " + zs1 + ", " + zd2 + " " + zs2 + ", " + zd3 + " " + zs3 + ", " + zd4 + " " + zs4 + ", " + zd1 + " " + zs1 + ")'), 4326), ST_Transform(way,4326)))";
		
			Statement statement = connectDbs().createStatement();	
			ResultSet result = statement.executeQuery(sql);
			
			while (result.next()) {
								
				JSONObject json = buildJSON(result);
				geoJsons.add(json);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		disconnectDbs();
		return geoJsons;
	}
	
	public static List<JSONObject> getBoundaries() {

		List<JSONObject> geoJsons = new ArrayList<>();

		try {

//			String sql ="SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, planet_osm_polygon.name, kriminalita.tc_zistene FROM planet_osm_polygon "
//					+ "INNER JOIN kriminalita ON planet_osm_polygon.name=kriminalita.kraj "
//					+ "WHERE planet_osm_polygon.boundary LIKE 'administrative' "
//					+ "AND planet_osm_polygon.admin_level LIKE '4' "
//					+ "AND kriminalita.druh_kriminality LIKE 'KRIMINALITA  CELKOM'";
			String sql ="SELECT svk_okresy.result, svk_okresy.name, kriminalita_okresy.tc_zistene FROM svk_okresy "
					+ "INNER JOIN kriminalita_okresy ON svk_okresy.name=kriminalita_okresy.okres ";
					//+ "AND kriminalita.druh_kriminality LIKE 'KRIMINALITA  CELKOM'";
			
			Statement statement = connectDbs().createStatement();	
			ResultSet result = statement.executeQuery(sql);
			String color = "";
			
			while (result.next()) {

				int kriminalita = Integer.parseInt(result.getString("tc_zistene"));
				
				if( kriminalita > 640 ) color = "#0A2A1B";
				else if( kriminalita > 490 ) color = "#0B6121";
				else if( kriminalita > 340 ) color = "#04B431";
				else if( kriminalita > 190 ) color = "#00FF00";
				else if( kriminalita > 0 ) color = "#BCF5A9";
				
				
				JSONObject json = new JSONObject();
				json.put("type", "Feature");
				json.put("geometry", new JSONObject(result.getString("result")));
				JSONObject properties = new JSONObject();
				properties.put("fill", color);
				properties.put("fill-opacity", 0.6);
				properties.put("name", result.getString(("name")));
				json.put("properties", properties);

				geoJsons.add(json);
			}
			
		} catch (SQLException | JSONException e) {
			e.printStackTrace();
		}
		disconnectDbs();
		return geoJsons;
	}
	
	public static List<JSONObject> getBanksOfBoundary(String boundary) {

		List<JSONObject> geoJsons = new ArrayList<>();

		try {

			switch (boundary) {
			case "okres_Bánovce_nad_Bebravou":
				boundary = "okres Bánovce nad Bebravou";
				break;
				case "okres_Banská_Bystrica":
				boundary = "okres Banská Bystrica";
				break;
				case "okres_Banská_Štiavnica":
				boundary = "okres Banská Štiavnica";
				break;
				case "okres_Bardejov":
				boundary = "okres Bardejov";
				break;
				case "okres_Bratislava_I":
				boundary = "okres Bratislava I";
				break;
				case "okres_Bratislava_II":
				boundary = "okres Bratislava II";
				break;
				case "okres_Bratislava_III":
				boundary = "okres Bratislava III";
				break;
				case "okres_Bratislava_IV":
				boundary = "okres Bratislava IV";
				break;
				case "okres_Bratislava_V":
				boundary = "okres Bratislava V";
				break;
				case "okres_Brezno":
				boundary = "okres Brezno";
				break;
				case "okres_Bytča":
				boundary = "okres Bytča";
				break;
				case "okres_Čadca":
				boundary = "okres Čadca";
				break;
				case "okres_Detva":
				boundary = "okres Detva";
				break;
				case "okres_Dolný_Kubín":
				boundary = "okres Dolný Kubín";
				break;
				case "okres_Dunajská_Streda":
				boundary = "okres Dunajská Streda";
				break;
				case "okres_Galanta":
				boundary = "okres Galanta";
				break;
				case "okres_Gelnica":
				boundary = "okres Gelnica";
				break;
				case "okres_Hlohovec":
				boundary = "okres Hlohovec";
				break;
				case "okres_Humenné":
				boundary = "okres Humenné";
				break;
				case "okres_Ilava":
				boundary = "okres Ilava";
				break;
				case "okres_Kežmarok":
				boundary = "okres Kežmarok";
				break;
				case "okres_Komárno":
				boundary = "okres Komárno";
				break;
				case "okres_Košice_okolie":
				boundary = "okres Košice - okolie";
				break;
				case "okres_Košice_I":
				boundary = "okres Košice I";
				break;
				case "okres_Košice_II":
				boundary = "okres Košice II";
				break;
				case "okres_Košice_III":
				boundary = "okres Košice III";
				break;
				case "okres_Košice_IV":
				boundary = "okres Košice IV";
				break;
				case "okres_Krupina":
				boundary = "okres Krupina";
				break;
				case "okres_Kysucké_Nové_Mesto":
				boundary = "okres Kysucké Nové Mesto";
				break;
				case "okres_Levice":
				boundary = "okres Levice";
				break;
				case "okres_Levoča":
				boundary = "okres Levoča";
				break;
				case "okres_Liptovský_Mikuláš":
				boundary = "okres Liptovský Mikuláš";
				break;
				case "okres_Lučenec":
				boundary = "okres Lučenec";
				break;
				case "okres_Malacky":
				boundary = "okres Malacky";
				break;
				case "okres_Martin":
				boundary = "okres Martin";
				break;
				case "okres_Medzilaborce":
				boundary = "okres Medzilaborce";
				break;
				case "okres_Michalovce":
				boundary = "okres Michalovce";
				break;
				case "okres_Myjava":
				boundary = "okres Myjava";
				break;
				case "okres_Námestovo":
				boundary = "okres Námestovo";
				break;
				case "okres_Nitra":
				boundary = "okres Nitra";
				break;
				case "okres_Nové_Mesto_nad_Váhom":
				boundary = "okres Nové Mesto nad Váhom";
				break;
				case "okres_Nové_Zámky":
				boundary = "okres Nové Zámky";
				break;
				case "okres_Partizánske":
				boundary = "okres Partizánske";
				break;
				case "okres_Pezinok":
				boundary = "okres Pezinok";
				break;
				case "okres_Piešťany":
				boundary = "okres Piešťany";
				break;
				case "okres_Poltár":
				boundary = "okres Poltár";
				break;
				case "okres_Poprad":
				boundary = "okres Poprad";
				break;
				case "okres_Považská_Bystrica":
				boundary = "okres Považská Bystrica";
				break;
				case "okres_Prešov":
				boundary = "okres Prešov";
				break;
				case "okres_Prievidza":
				boundary = "okres Prievidza";
				break;
				case "okres_Púchov":
				boundary = "okres Púchov";
				break;
				case "okres_Revúca":
				boundary = "okres Revúca";
				break;
				case "okres_Rimavská_Sobota":
				boundary = "okres Rimavská Sobota";
				break;
				case "okres_Rožňava":
				boundary = "okres Rožňava";
				break;
				case "okres_Ružomberok":
				boundary = "okres Ružomberok";
				break;
				case "okres_Sabinov":
				boundary = "okres Sabinov";
				break;
				case "okres_Senec":
				boundary = "okres Senec";
				break;
				case "okres_Senica":
				boundary = "okres Senica";
				break;
				case "okres_Skalica":
				boundary = "okres Skalica";
				break;
				case "okres_Snina":
				boundary = "okres Snina";
				break;
				case "okres_Sobrance":
				boundary = "okres Sobrance";
				break;
				case "okres_Spišská_Nová_Ves":
				boundary = "okres Spišská Nová Ves";
				break;
				case "okres_Stará_Ľubovňa":
				boundary = "okres Stará Ľubovňa";
				break;
				case "okres_Stropkov":
				boundary = "okres Stropkov";
				break;
				case "okres_Svidník":
				boundary = "okres Svidník";
				break;
				case "okres_Šaľa":
				boundary = "okres Šaľa";
				break;
				case "okres_Topolčany":
				boundary = "okres Topolčany";
				break;
				case "okres_Trebišov":
				boundary = "okres Trebišov";
				break;
				case "okres_Trenčín":
				boundary = "okres Trenčín";
				break;
				case "okres_Trnava":
				boundary = "okres Trnava";
				break;
				case "okres_Turčianske_Teplice":
				boundary = "okres Turčianske Teplice";
				break;
				case "okres_Tvrdošín":
				boundary = "okres Tvrdošín";
				break;
				case "okres_Veľký_Krtíš":
				boundary = "okres Veľký Krtíš";
				break;
				case "okres_Vranov_nad_Topľou":
				boundary = "okres Vranov nad Topľou";
				break;
				case "okres_Zlaté_Moravce":
				boundary = "okres Zlaté Moravce";
				break;
				case "okres_Zvolen":
				boundary = "okres Zvolen";
				break;
				case "okres_Žarnovica":
				boundary = "okres Žarnovica";
				break;
				case "okres_Žiar_nad_Hronom":
				boundary = "okres Žiar nad Hronom";
				break;
				case "okres_Žilina":
				boundary = "okres Žilina";
				break;

			}
//			String sql ="SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, way, tags FROM planet_osm_point "
//					+ "WHERE amenity LIKE 'bank' "
//					+ "AND name IS NOT NULL "
//					+ "AND (SELECT ST_Contains("
//					+ "(SELECT ST_MakePolygon(ST_Boundary(ST_Transform(way,4326))) from planet_osm_polygon "
//					+ "where boundary like 'administrative' "
//					+ "AND admin_level like '4' "
//					+ "AND name LIKE '" + boundary + "')"
//					+ ", ST_Transform(way,4326)))";
			
			String sql = "SELECT * FROM banky_point WHERE "
					+ "(SELECT ST_Contains("
					+ "(SELECT ST_MakePolygon(ST_Boundary(ST_Transform(way,4326))) FROM svk_okresy "
					+ "WHERE svk_okresy.name LIKE '" + boundary + "') "
					+ ", ST_Transform(way,4326)))";
			
			Statement statement = connectDbs().createStatement();	
			ResultSet result = statement.executeQuery(sql);
			
			while (result.next()) {

				JSONObject json = buildJSON(result);
				geoJsons.add(json);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		disconnectDbs();
		return geoJsons;
	}
	
}
