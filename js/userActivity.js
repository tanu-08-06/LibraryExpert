function userActivityTable(arr) {
	for(var i=0;i<arr.objList.length;i++){
		var userActivity=$("<tr />");
		$("#table").append(userActivity);
		userActivity.append($("<td> <input name=userActivity_ID value="+(arr.objList[i].userActivityId)+" type=checkbox> </td>"));
		userActivity.append($("<td>"+ (arr.objList[i].userName) + "</td>"));
		userActivity.append($("<td>" +  (arr.objList[i].transactionType) + "</td>"));
		userActivity.append($("<td>" + dateFormat(arr.objList[i].date) + "</td>"));
	}
}

function getUserActivityList(pageNumber,status){
	var xmlhttp = new XMLHttpRequest();
	var url = "tableAccess.action";
	var userActivity;
	var param="TableName=UserActivity&PageNumber="+pageNumber;
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
	       	$("#tableDiv").append("<label>UserActivity</label>");
	      	$("#tableDiv").append("<button style='float: right' onclick='viewRecentUserActivity()'>View Recent Activities</button>");
	      	$("#actionStatus").text(status);
	      	$("#actionStatus").show();
	      	if(myArr.objList[0]==null){
	       		if(countUserActivityRows()==0){
	       			$("#pagination").hide();
	       			$("#tableDiv").hide();
	       			window.alert("no activity are done");
	       		}else{
	       			$("#pagination").pagination('prevPage');
	       		}
	     	}else{
	    		userActivity=$("<tr />");
	    		$("#table").append(userActivity);
	    		userActivity.append($("<th></th>"));
	    		userActivity.append($("<th>User Name</th>"));
	    		userActivity.append($("<th>Transaction Type</th>"));
	    		userActivity.append($("<th>Date</th>"));
	    		userActivityTable(myArr);
	    	}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function viewRecentUserActivity(){
	var lastPage=$("#pagination").pagination('getPagesCount');	
	$("#pagination").pagination('selectPage', lastPage);

}
function countUserActivityRows(){
	var xmlhttp = new XMLHttpRequest();
	var url = "countRowsInTable.action";
	var param="TableName=UserActivity";
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