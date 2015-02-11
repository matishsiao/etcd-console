<!DOCTYPE HTML>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>etcd console</title>
		<!-- Script -->
		<script type="text/javascript" src="js/jquery.min.js"></script>	
		<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/etcd.js"></script>
		<!-- CSS -->
		<link href="bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css" />
		<link href="css/etcd.css" rel="stylesheet" type="text/css" />
		<!-- Init Script -->
		<script type="text/javascript">	
			var version = "0.1";
			var etcdServer = "http://104.155.206.199:4001/v2/";
			$(document).ready(function(){
				$("#etcd-server").val(etcdServer);
				$('button#parent-btn').removeClass('btn btn-primary').addClass( "btn btn-primary disabled" );
				$("button#parent-btn").attr("disabled", true);
				$("button#create_btn").attr("disabled", true);
				$("button#go_btn").attr("disabled", true);
				$("#createKey").hide();
				$("#KeyInfo").hide();
				$("#ETCDInfo").hide();
				
			});
			
			function CreateKey() {
				$("#createKey").hide();
				$("#ckey").val("");
				$("#cvalue").val("");
				$("#createKey").fadeIn("slow");
			}
			
			function CloseCreateKey() {
				$("#createKey").fadeOut("slow");
			}
			
			function CloseInfo(){
				$("#KeyInfo").fadeOut("slow");
			}
			function CloseETCDInfo(){
				$("#ETCDInfo").fadeOut("slow");
			}
			
		</script>
	</head>
<body>
<div id="panel" class="logView">
	<table border="0" class="logView" width="100%">
	<tr>
		<td style="text-align:left;">
		ETCD Server:<input type="text" id="etcd-server" style="margin-bottom:0px;" name="etcd-server" value="http://127.0.0.1:4001" placeholder="http://127.0.0.1:4001">
		&nbsp;<button onclick="ETCDStatus()" class="btn btn-small btn-info" id="etcd-btn" name="etcd-btn">Connect</button>
		</td>
		<td style="text-align:left;">
		Jump:<input type="text" id="etcd-key" style="margin-bottom:0px;" name="etcd-key" placeholder="/">
		&nbsp;<button onclick="JumpETCDKey()" class="btn btn-small btn-info" id="go_btn" name="go_btn">Go</button>
		</td>
		<td style="text-align:right;"><button onclick="CreateKey();" class="btn btn-success" id="create_btn" name="create_btn">Create</button>&nbsp;&nbsp;<button onclick="ParentDirKey();" class="btn btn-success" id="parent-btn" name="parent-btn">Parent Directory</button></td>
	</tr>	
	</table>
</div>
<div id="keys" border="1" class="logView"></div>
<div id="createKey" class="msg-area">
<table border="1" class="logView" width="100%">
<tr><th colspan="2">Add Item</th></tr>
<tr><td>Key</td><td><input type="text" name="ckey" id="ckey" value="" placeholder="keyname/keyname1"></td></tr>
<tr><td>Value</td><td><input type="text" name="cvalue" id="cvalue" value=""></td></tr>
<tr><td>Directory</td><td>Yes:<input type="radio" name="cdir" id="cdir_yes" value="yes" style="margin-bottom:5px;margin-left:5px;"> No:<input type="radio" name="cdir" id="cdir_no" value="no" checked  style="margin-bottom:5px;margin-left:5px;"></td></tr>
<tr><td colspan="2" style="text-align:center;"><button onClick="AddKey();" class="btn btn-success">Add</button> &nbsp;&nbsp;<button onClick="CloseCreateKey();" class="btn btn-info">Cancel</button></td></tr>
</table>
</div>
<div id="KeyInfo" class="msg-area"></div>
<div id="ETCDInfo" class="etcd-area"></div>
</body>
</html>
