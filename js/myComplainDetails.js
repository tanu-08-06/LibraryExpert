function myComplainDetailsTable(arr) {
	for(var i=0;i<arr.objList.length;i++){
		var status;
		if(!(arr.objList[i].status)){
			status="pending";
		}else{
			status="attended";
		}
		var myComplainDetails=$("<tr />");
		$("#table").append(myComplainDetails);
		myComplainDetails.append($("<td> <input name=myComplainDetails_ID value="+(arr.objList[i].complainId)+" type=checkbox> </td>"));
		myComplainDetails.append($("<td>"+ (arr.objList[i].name) + "</td>"));
		myComplainDetails.append($("<td>"+ (arr.objList[i].complain) + "</td>"));
		myComplainDetails.append($("<td>" +  dateFormat(arr.objList[i].date) + "</td>"));
		myComplainDetails.append($("<td>" + (arr.objList[i].user.firstName)+" "+ (arr.objList[i].user.lastName) + "</td>"));
		myComplainDetails.append($("<td>" + status + "</td>"));
	}
  
}
function getMyComplainDetailsList(pageNumber,status){
	var xmlhttp = new XMLHttpRequest();
	var url = "tableAccess.action";
	var myComplainDetails;
	var param="TableName=ComplainDetails&PageNumber="+pageNumber+"&userId="+$("#userId").text();
	xmlhttp.onreadystatechange = function(){
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    	$("#section>*").hide();
	    	$("#pagination").show();
	    	$("#table").show();	    	
	    	$("#table tr").remove();
	    	var myArr = JSON.parse(xmlhttp.responseText);
	    	$("#tableDiv").show();
	    	$("#tableDiv").css("align", "right");
	    	$("#tableDiv *").remove();
	       	$("#tableDiv").append("<label>MyComplainDetails</label>");
	      	$("#tableDiv").append("<button style='float: right' onclick='deleteMyComplainDetails()'>Delete</button>");
	      	$("#actionStatus").text(status);
	      	$("#actionStatus").show();
	      	if(myArr.objList[0]==null){
	       		if(countMyComplainDetailsRows()==0){
	       			$("#pagination").hide();
	       			$("#tableDiv").hide();
	       			showHome();
	       			window.alert("no complains are made");
	       		}else{
	       			$("#pagination").pagination('prevPage');
	       		}
	     	}else{
	    		myComplainDetails=$("<tr />");
	    		$("#table").append(myComplainDetails);
	    		myComplainDetails.append($("<th></th>"));
	    		myComplainDetails.append($("<th>Name</th>"));
	    		myComplainDetails.append($("<th>Complain</th>"));
	    		myComplainDetails.append($("<th>Date</th>"));
	    		myComplainDetails.append($("<th>User</th>"));
	    		myComplainDetails.append($("<th>Status</th>"));
	       		myComplainDetailsTable(myArr);
	    	}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
//Count no of rows in myComplainDetails Table
function countMyComplainDetailsRows(){
	var xmlhttp = new XMLHttpRequest();
	var url = "countRowsInTable.action";
	var param="TableName=ComplainDetails"+"&userId="+$("#userId").text();
	var response=0;
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			response = (Number)(xmlhttp.responseText);
		}
	};
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
	return response;
}
