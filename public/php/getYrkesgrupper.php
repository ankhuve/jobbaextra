<?php
	$yrkesomradeid = urlencode($_GET['yrkesomradeid']);
	$service_url = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrkesgrupper?yrkesomradeid='.$yrkesomradeid;
	
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