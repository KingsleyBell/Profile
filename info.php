<?php

	if(isset($_GET['action']) && !empty($_GET['action'])) {
	    $action = $_GET['action'];
	    switch($action) {
	        case 'get_matches' : 
	        	getMatches();
	        	break;
	        case 'raw' : 
	        	raw();
	        	break;
	    }
	}

	function getMatches() {
		$time = time();
		$url = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?account_id=161121532&key=055D927499BA3DEBE9FEA6AA89807575&matches_requested=10";		
		$games_string = file_get_contents("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?account_id=161121532&key=055D927499BA3DEBE9FEA6AA89807575&matches_requested=10");

		$heroes_string = file_get_contents("data/heroes.json");
		$heroes = json_decode($heroes_string, true);

		$games_json = json_decode( $games_string, true );
		$matches = $games_json["result"]["matches"];	
		$html = "";		
		foreach($matches as $game) {				
			$match_id = $game["match_id"];
			$game_string = file_get_contents("http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v001/?key=055D927499BA3DEBE9FEA6AA89807575&match_id=".$match_id);
    		$game_json = json_decode($game_string, true);
    		$radiant_win = $game_json["result"]["radiant_win"];
    		if($radiant_win == $radiant) {    			
    			$win="win";
    		}
    		else {
    			$win="loss";
    		}
    		$players = $game_json["result"]["players"];
    		foreach($players as $player) {    			
    			if($player["account_id"] == 161121532) {
					$me = $player;
					$kills = $player["kills"];
					$deaths = $player["deaths"];
					$assists = $player["assists"];
					if($player["player_slot"]/128 > 1) {
						$radiant = 0;
					}
					else {
						$radiant = 1;
					}
				}	
    		}			
			$hero_id = $me["hero_id"];
			foreach($heroes as $hero){
				if($hero["id"] == $hero_id){
					$my_hero = $hero;					
				}
			}
    		$path = $my_hero["path"];    		
    		$html .= "<div class='match-box'><div class='circle cover' style='background-image: url({$path});'></div>{$win} {$kills}/{$deaths}/{$assists}</div>";
		}		
		echo $html;
	}

	function raw() {
		//$games_string = file_get_contents("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?account_id=161121532&key=055D927499BA3DEBE9FEA6AA89807575&matches_requested=10");
		$games_string = file_get_contents("http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v001/?match_id=2288552102&key=055D927499BA3DEBE9FEA6AA89807575");
		//echo $games_string;

	}

	function getJson($url) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$data_string = curl_exec($ch);
		$data_json = json_decode($data_string);
		return $data_json;
	}
?>