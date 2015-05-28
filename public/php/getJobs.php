<?php
	$nyckelord = urlencode($_GET['nyckelord']);
	$sida = urlencode($_GET['sida']);
	$antalRader = urlencode($_GET['antalrader']);
	$service_url = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?anstallningstyp=2&nyckelord='.$nyckelord.'&sida='.$sida.'&antalrader='.$antalRader;
	
	if (!empty($_GET['lanid'])) {
		$lanid = urlencode($_GET['lanid']);
		$service_url .= '&lanid='.$lanid;

		if(!empty($_GET['kommunid'])){
			$kommunid = urlencode($_GET['kommunid']);
			$service_url .= '&kommunid='.$kommunid;
		};
	}

	if(!empty($_GET['yrkesomradeid'])){
		$yrkesomrade = urlencode($_GET['yrkesomradeid']);
		$service_url .= '&yrkesomradeid='.$yrkesomrade;
		if(!empty($_GET['yrkesgruppid'])){
			$yrkesgruppid = urlencode($_GET['yrkesgruppid']);
			$service_url .= '&yrkesgruppid='.$yrkesgruppid;
		}
	}



	$curl = curl_init($service_url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl,CURLOPT_HTTPHEADER,array (
         'Accept: application/json',
         'Accept-Language:sv-se,sv',
         'Content-Type: application/json;charset=UTF-8'
     ));

	$curl_response = curl_exec($curl);

	curl_close($curl);
	echo $curl_response;
?>