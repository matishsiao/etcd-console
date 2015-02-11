<?php
	$api = "http://127.0.0.1:4001/v2/";
	if($_GET["etcd"]!="")
		$api = $_GET["etcd"];
	header('Content-Type: application/json; charset=utf-8');
	switch ($_GET["cmd"]) {
		case "get":
			$url = "$api".$_GET["url"];
			$res = @file_get_contents($url,0,$ctx);
			echo $res;
		break;
		case "update":
			$url = "$api".$_GET["url"];
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // 不把資訊直接印出來
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
			curl_setopt($curl, CURLOPT_HEADER, false);
			curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/html'));
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // On dev server only!
			curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query( array( "value"=>$_POST["value"]) )); 
			$result = curl_exec($ch); 
			curl_close($ch);
			echo $result;
		break;
		case "del":
			$url = "$api".$_GET["url"];
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // 不把資訊直接印出來
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
			curl_setopt($curl, CURLOPT_HEADER, false);
			curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/html'));
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // On dev server only!
			$result = curl_exec($ch); 
			curl_close($ch);
			echo $result;
		break;
		case "deldir":
			$url = "$api".$_GET["url"]."?dir=true";
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // 不把資訊直接印出來
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
			curl_setopt($curl, CURLOPT_HEADER, false);
			curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/html'));
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // On dev server only!
			$result = curl_exec($ch); 
			curl_close($ch);
			echo $result;
		break;
		case "put":
			$url = "$api".$_GET["url"];
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // 不把資訊直接印出來
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
			curl_setopt($curl, CURLOPT_HEADER, false);
			curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/html'));
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // On dev server only!
			if ($_POST["dir"] != "") 
				curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query( array( "value"=>$_POST["value"],"dir"=>"true") )); 
			else
				curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query( array( "value"=>$_POST["value"]) )); 	
			$result = curl_exec($ch); 
			curl_close($ch);
			echo $result;
		break;	
	}	
?>
