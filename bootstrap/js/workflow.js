// JavaScript Document
var modeId = 0;
function init(){
	$('#myAporvalDetail').on('show', function () {
		console.log(modeId);
		var str = "日期:" + getNowTime() + "\n";
	});
}


function addRows(){
		//取得TABLE的ID
		var table = document.getElementById('t1');
	
		//取得欄位總數
		var myrows = table.rows;
		if(myrows.length < 11)
		{
			table.appendChild(myrows[myrows.length - 1].cloneNode(true));  
		}
		else
		{
			alert('Rows amount is max limit.');
		}
}




function setMode(title, data){
    var urls = "module/process.php";
    $('#myModalLabel').text(title);
	var board = document.getElementById('modal-content');
	board.innerHTML = "Get form infomation....";
	console.log('urls:' + urls);	
    $.ajax({
        url: urls,
        data: data,
        type:"POST",
        dataType:'text',

        success: function(msg){
			var board = document.getElementById('modal-content');
			board.innerHTML = msg;
			console.log('get mode info');
    	},

        error:function(xhr, ajaxOptions, thrownError){ 
            alert('error:' + xhr.status + " message:" + thrownError + " data:" + ajaxOptions);  
        }
    });
}


function sendForm(){
	console.log('sendForm');
	sendData = $("#modal-Form").serialize();
    $.ajax({
        url: "module/dataProcess.php",
        data: sendData,
        type:"POST",
        dataType:'text',

        success: function(msg){
			 showTip(msg);
			 $('#myModal').modal('hide');
    	},

        error:function(xhr, ajaxOptions, thrownError){ 
			
            alert('error:' + xhr.status + " message:" + thrownError + " data:" + ajaxOptions + "status:" + xhr.readyState);  
        }
    });
	return false;
}


function setAction(id){
	console.log("id" + id);	
	switch(id){
		case 1:$("#db_code").val("ment_user_edit");break;
		case 2:$("#db_code").val("ment_user_del");break;
	}
	
	sendData = $("#modal-Form").serialize();
    $.ajax({
        url: "module/dataProcess.php",
        data: sendData,
        type:"POST",
        dataType:'text',

        success: function(msg){
			var board = document.getElementById('modal-content');
			board.innerHTML = msg;
			console.log('get action info');
    	},

        error:function(xhr, ajaxOptions, thrownError){ 
			
            alert('error:' + xhr.status + " message:" + thrownError + " data:" + ajaxOptions + "status:" + xhr.readyState);  
        }
    });
}

function showTip(msg){
	$('#tip').text(msg);
}


function getNowTime(){
	var timeDate= new Date();
	var tMonth = (timeDate.getMonth()+1) > 9 ? (timeDate.getMonth()+1) : '0'+(timeDate.getMonth()+1);
	var tDate = timeDate.getDate() > 9 ? timeDate.getDate() : '0'+timeDate.getDate();
	var tHours = timeDate.getHours() > 9 ? timeDate.getHours() : '0'+timeDate.getHours();
	var tMinutes = timeDate.getMinutes() > 9 ? timeDate.getMinutes() : '0'+timeDate.getMinutes();
	var tSeconds = timeDate.getSeconds() > 9 ? timeDate.getSeconds() : '0'+timeDate.getSeconds();
	return timeDate= timeDate.getFullYear()+'/'+ tMonth +'/'+ tDate +' '+ tHours +':'+ tMinutes +':'+ tSeconds;
}