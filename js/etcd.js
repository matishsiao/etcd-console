var etcdKeys;
var etcdInfos;
var KeyStatus = {"History":[],"Now":""};

function ETCDStatus() {
	
	$.ajax({
		type: "GET",
		url: "etcd.php?cmd=get&url=members&etcd="+$("#etcd-server").val(),								
		success: function(data){	
			etcdInfos = data;
			console.log(etcdInfos);
			if (data!= null){
				if($("#etcd-btn").text() == "Connect") {
					$("#etcd-btn").text("Info");
					$("button#create_btn").attr("disabled", false);
					$("button#go_btn").attr("disabled", false);
					GetETCDKeys("keys");
				} else {
					updateETCDInfo();
				}
			} else {
				alert("Can't connect to ETCD server");
			}
			
			
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(thrownError);								
		}
	});	
}

function updateETCDInfo() {
	var keysbox = $('div#ETCDInfo');
	keysbox.empty();
	keysbox.hide();
	info = '<table border="1" width="100%" class="logView">';
	
	for (idx in etcdInfos.members) {	
		info += '<tr><th colspan="2">'+idx+'</th></tr>';
		node = etcdInfos.members[idx];
		for (nk in node){
			info += '<tr><td style="font-size:10px;">'+nk+'</td><td style="font-size:10px;">'+node[nk]+'</td></tr>';
		}
	}
	info += '<tr><td colspan="2" style="text-align:center;"><button onClick="CloseETCDInfo();" class="btn btn-info">Close</button></td></tr></table>';
	keysbox.append("<p>" + info + "</p>" );
	keysbox.fadeIn('slow');
}


function GetETCDKeys(keys) {
	if(KeyStatus.Now != keys)
		KeyStatus.History.push(keys);
	if(keys != "keys"){
		$('button#parent-btn').removeClass('btn btn-primary disabled').addClass( "btn btn-primary" );
		$("button#parent-btn").attr("disabled", false);
	} else {
		$('button#parent-btn').removeClass('btn btn-primary').addClass( "btn btn-primary disabled" );
		$("button#parent-btn").attr("disabled", true);
	}
	KeyStatus.Now = keys;
	console.log(KeyStatus);
	$.ajax({
		type: "GET",
		url: "etcd.php?cmd=get&url="+keys+"&etcd="+$("#etcd-server").val(),								
		success: function(data){	
			etcdKeys = data;
			updateKeysView();
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(thrownError);								
		}
	});
}

function updateKeysView() {
	var keysbox = $('div#keys');
	keysbox.empty();
	keysbox.hide();
	if(typeof(etcdKeys.node.nodes) != "undefined") {
		etcdKeys.node.nodes.sort(function(a, b) {return (a.key > b.key)?1:0;});
	}
	info = '<table border="1" width="100%" class="logView">';
	info += '<tr><th width="20%">Action</th><th>Key</th><th>Value</th></tr>';
	for (idx in etcdKeys.node.nodes) {
		
		node = etcdKeys.node.nodes[idx];
		key = node.key.replace(/\//g,"|");
		
		console.log(node.key,key,node.value);
		if (typeof(node.dir) != "undefined") {
			info += '<tr><td>'+returnButton(node.key,"dir")+'</td><td>'+node.key+'</td><td>Directory</td></td></tr>';
		} else {
			value = node.value.replace(/\//g,"");
			console.log(node.key,key,node.value,value);
			info += '<tr><td>'+returnButton(node.key,"node")+'</td><td>'+node.key+'</td><td><input type="text" style="margin-bottom:0px;" id="'+key+'"'+ " value='"+node.value+"'></td></tr>";
		}
	}
	info += '</table>';
	keysbox.append("<p>" + info + "</p>" );
	keysbox.fadeIn('slow');
}

function returnButton(key,mode) {
	result = "";
	if(mode == "node"){
		
		result += '<button onclick=delKeys("'+key+'") class="btn btn-small btn-danger">Delete</button> ';
		result += '<button onclick=KeysInfo("'+key+'") class="btn btn-small btn-info">Info</button> ';
		result += '<button onclick=updateKeys("'+key+'") class="btn btn-small btn-success">Update</button> ';
	} else if(mode == "dir"){
		
		result += '<button onclick=delDirKeys("'+key+'") class="btn btn-small btn-danger">Delete</button> ';
		result += '<button onclick=KeysInfo("'+key+'") class="btn btn-small btn-info">Info</button> ';
		result += '<button onclick=showKeys("'+key+'") class="btn btn-small btn-primary">Directory</button> ';
	}
	return result;
}

function updateETCDKeys(key,value) {
	for (idx in etcdKeys.node.nodes) {
		node = etcdKeys.node.nodes[idx];
		//key = node.key.replace(/\//g,"|");
		if (node.key == key) {
			node.value = value;
			break;
		}
	}
}

function deleteETCDKey(key) {
	for (idx in etcdKeys.node.nodes) {
		node = etcdKeys.node.nodes[idx];
		if (node.key == key) {
			etcdKeys.node.nodes.splice(idx,1);
			break;
		}
	}
}

function showKeys(key) {
	GetETCDKeys("keys"+key);
}

function updateKeys(key) {
	console.log(KeyStatus);
	inputKey = key.replace(/\//g,"|");
	$.ajax({
		type: "POST",
		url: "etcd.php?cmd=update&url=keys"+key+"&etcd="+$("#etcd-server").val(),
		data:"value="+document.getElementById(inputKey).value,					
		success: function(data){
			if(typeof(data.errorCode) == "undefined"){
				updateETCDKeys(data.node.key,data.node.value);
				updateKeysView();
			} else {
				alert("Error:"+data.errorCode+ " Message:"+data.message);
			}
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(thrownError);								
		}
	});
}

function delKeys(key) {
	$.ajax({
		type: "GET",
		url: "etcd.php?cmd=del&url=keys"+key+"&etcd="+$("#etcd-server").val(),			
		success: function(data){
			if(typeof(data.errorCode) == "undefined"){
				deleteETCDKey(data.node.key);
				updateKeysView();
			} else {
				alert("Error:"+data.errorCode+ " Message:"+data.message);
			}
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(thrownError);								
		}
	});
}

function delDirKeys(key) {
	$.ajax({
		type: "GET",
		url: "etcd.php?cmd=deldir&url=keys"+key+"&etcd="+$("#etcd-server").val(),			
		success: function(data){
			if(typeof(data.errorCode) == "undefined"){
				deleteETCDKey(data.node.key);
				updateKeysView();
			} else {
				alert("Error:"+data.errorCode+ " Message:"+data.message);
			}	
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(thrownError);								
		}
	});
}

function AddKey() {
	key = $("#ckey").val();
	if (key == ""){
		alert("Key can't be empty.");
		return;
	}
	value = $("#cvalue").val();
	
	dircmd = "";
	dir = $('input[name="cdir"]:checked').val();
	if(dir == "yes"){
		dircmd = "&dir=true";
	} else {
		if (value == ""){
			alert("value can't be empty.");
			return;
		}
	}
	console.log(key,value,dir);
	$.ajax({
		type: "POST",
		url: "etcd.php?cmd=put&url=keys/"+key+"&etcd="+$("#etcd-server").val(),
		data:"value="+value+dircmd,					
		success: function(data){
			CloseCreateKey();
			if(data != null && typeof(data.errorCode) == "undefined"){
				GetETCDKeys(KeyStatus.Now);
				updateKeysView();
			} else {
				alert("Error:"+data.errorCode+ " Message:"+data.message);
			}	
		},
		error: function(xhr, ajaxOptions, thrownError){
			CloseCreateKey();
			console.log(thrownError);								
		}
	});
}

function KeysInfo(key) {
	var keysbox = $('div#KeyInfo');
	keysbox.empty();
	keysbox.hide();
	info = '<table border="1" width="100%" class="logView">';
	info += '<tr><th width="40%">Item</th><th>Value</th></tr>';
	for (idx in etcdKeys.node.nodes) {
		
		node = etcdKeys.node.nodes[idx];
		if (key == node.key){
			for (nk in node){
				info += '<tr><td style="font-size:10px;">'+nk+'</td><td style="font-size:10px;">'+node[nk]+'</td></tr>';
			}
			break;
		}
	}
	info += '<tr><td colspan="2" style="text-align:center;"><button onClick="CloseInfo();" class="btn btn-info">Close</button></td></tr></table>';
	keysbox.append("<p>" + info + "</p>" );
	keysbox.fadeIn('slow');
}

function ParentDirKey() {
	if (KeyStatus.History.length >= 2 ){
		prvKey = KeyStatus.History[KeyStatus.History.length - 2];
		KeyStatus.History.splice(KeyStatus.History.length-2,2);
		GetETCDKeys(prvKey);
	} else {
		KeyStatus.History.length = 0;
		GetETCDKeys("keys");
	}	
}

function JumpETCDKey() {
	key = $("#etcd-key").val();
	if (key == ""){
		alert("Key can't be empty.");
		return;
	}
	GetETCDKeys("keys"+key);
	
}