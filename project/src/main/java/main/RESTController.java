package main;

import java.util.List; 

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RESTController {
    
    @RequestMapping("/allBanks")
    public String allBanks() {
    	
    	JSONArray array = new JSONArray();
		
		List<JSONObject> result = Dbs.getAllBanks();
		
		for(int i = 0; i < result.size(); i++) {
			array.put(result.get(i));
		}
		
		return array.toString();
	}
    
    @RequestMapping(value = "/choosedBanks")
    public String choosedBanks(@RequestParam String cb_csob, @RequestParam String cb_slsp, @RequestParam String cb_tb, @RequestParam String cb_vub, @RequestParam String cb_unicredit
    		, @RequestParam String cb_sberbank, @RequestParam String cb_fio, @RequestParam String cb_mbank, @RequestParam String cb_otp, @RequestParam String cb_postova
    		, @RequestParam String cb_prima, @RequestParam String cb_raiffeisen) {
    	
    	JSONArray array = new JSONArray();
		
		List<JSONObject> result = Dbs.getChoosedBanks(cb_csob, cb_slsp, cb_tb, cb_vub, cb_unicredit, cb_sberbank, cb_fio, cb_mbank, cb_otp, cb_postova, cb_prima, cb_raiffeisen);
		
		for(int i = 0; i < result.size(); i++) {
			array.put(result.get(i));
		}
		
		return array.toString();
	}
    
    
    @RequestMapping(value = "/nearestBanks")
    public String nearestBanks(@RequestParam String zs, @RequestParam String zd, @RequestParam String radius) {
    	
    	JSONArray array = new JSONArray();
		
		List<JSONObject> result = Dbs.getNearestBanks(Double.parseDouble(zs), Double.parseDouble(zd), Integer.parseInt(radius));
		
		for(int i = 0; i < result.size(); i++) {
			array.put(result.get(i));
		}
		
		return array.toString();
	}
    
    @RequestMapping(value = "/nearestAtms")
    public String nearestAtms(@RequestParam String zs, @RequestParam String zd, @RequestParam String radius) {
    	
    	JSONArray array = new JSONArray();
		
		List<JSONObject> result = Dbs.getAtms(Double.parseDouble(zs), Double.parseDouble(zd), Integer.parseInt(radius));
		
		for(int i = 0; i < result.size(); i++) {
			array.put(result.get(i));
		}
		
		return array.toString();
	}
    
    
    @RequestMapping(value = "/nearestBanksInRadiusAndName")
    public String nearestBanksInRadiusAndName(@RequestParam String zs, @RequestParam String zd, @RequestParam String radius, @RequestParam String count, @RequestParam String cb_csob, @RequestParam String cb_slsp, @RequestParam String cb_tb, @RequestParam String cb_vub, @RequestParam String cb_unicredit
    		, @RequestParam String cb_sberbank, @RequestParam String cb_fio, @RequestParam String cb_mbank, @RequestParam String cb_otp, @RequestParam String cb_postova
    		, @RequestParam String cb_prima, @RequestParam String cb_raiffeisen) {
    	
    	JSONArray array = new JSONArray();
		
		List<JSONObject> result = Dbs.getNearestBanksInRadiusAndName(Double.parseDouble(zs), Double.parseDouble(zd), Integer.parseInt(radius), Integer.parseInt(count), cb_csob, cb_slsp, cb_tb, cb_vub, cb_unicredit, cb_sberbank, cb_fio, cb_mbank, cb_otp, cb_postova, cb_prima, cb_raiffeisen);
		for(int i = 0; i < result.size(); i++) {
			array.put(result.get(i));
		}
		
		return array.toString();
	}
    
    @RequestMapping(value = "/paintedBanks")
    public String paintedBanks(@RequestParam String zs1, @RequestParam String zd1, @RequestParam String zs2, @RequestParam String zd2, @RequestParam String zs3, @RequestParam String zd3, @RequestParam String zs4, @RequestParam String zd4) {
    	
    	JSONArray array = new JSONArray();
		
		List<JSONObject> result = Dbs.getPaintedBanks(Double.parseDouble(zs1), Double.parseDouble(zd1), Double.parseDouble(zs2), Double.parseDouble(zd2), Double.parseDouble(zs3), Double.parseDouble(zd3), Double.parseDouble(zs4), Double.parseDouble(zd4));
		
		for(int i = 0; i < result.size(); i++) {
			array.put(result.get(i));
		}
		
		return array.toString();
	}
    
    @RequestMapping(value = "/getBoundaries")
    public String getBoundaries() {
    	
    	JSONArray array = new JSONArray();
		
		List<JSONObject> result = Dbs.getBoundaries();
		
		for(int i = 0; i < result.size(); i++) {
			array.put(result.get(i));
		}
		
		return array.toString();
	}
    
    @RequestMapping(value = "/getBanksOfBoudary")
    public String getBanksOfBoudary(@RequestParam String boundary) {
    	
    	JSONArray array = new JSONArray();
		
		List<JSONObject> result = Dbs.getBanksOfBoundary(boundary);
		
		for(int i = 0; i < result.size(); i++) {
			array.put(result.get(i));
		}
		
		return array.toString();
	}
    
    
    
}
