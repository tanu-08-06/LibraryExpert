function complainDetailsTable(arr) {
	for(var i=0;i<arr.objList.length;i++){
		var status;
		if(!(arr.objList[i].status)){
			status="pending";
		}else{
			status="attended";
		}
		var complainDetails=$("<tr />");
		$("#table").append(complainDetails);
		complainDetails.append($("<td> <input name=complainDetails_ID value="+(arr.objList[i].complainId)+" type=checkbox> </td>"));
		complainDetails.append($("<td>"+ (arr.objList[i].name) + "</td>"));
		complainDetails.append($("<td>"+ (arr.objList[i].complain) + "</td>"));
		complainDetails.append($("<td>" +  dateFormat(arr.objList[i].date) + "</td>"));
		complainDetails.append($("<td>" + (arr.objList[i].user.firstName)+" "+ (arr.objList[i].user.lastName) + "</td>"));
		complainDetails.append($("<td>" + status + "</td>"));
		complainDetails.append($("<td><button onclick='viewUser("+arr.objList[i].user+")'>View User</button>" +
				"<button id='markAttenedComplain"+i+"' onclick='attendComplain("+(arr.objList[i].complainId)+")'>Mark Attened</button></td>"));
		if(status=="attended"){
			$("#markAttenedComplain"+i+"").attr('disabled',true);
		}
	}
  
}
function attendComplain(e){
	var xmlhttp = new XMLHttpRequest();
	var url = "markComplainAttened.action";
	var param="Id="+e;
	xmlhttp.onreadystatechange = function(){
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    		response=(xmlhttp.responseText);
	    		if(respose="success"){
	    			getComplainDetailsList($("#pagination").pagination('getCurrentPage'),"Marked Successfully");
	    		}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}

function getComplainDetailsList(pageNumber,status){
	var xmlhttp = new XMLHttpRequest();
	var url = "tableAccess.action";
	var complainDetails;
	var param="TableName=ComplainDetails&PageNumber="+pageNumber;
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
	       	$("#tableDiv").append("<label>ComplainDetails</label>");
	      	$("#tableDiv").append("<button style='float: right' onclick='deleteComplainDetails()'>Delete</button>");
	      	$("#actionStatus").text(status);
	      	$("#actionStatus").show();
	      	if(myArr.objList[0]==null){
	       		if(countComplainDetailsRows()==0){
	       			$("#pagination").hide();
	       			$("#tableDiv").hide();
	       			showHome();
	       			window.alert("no complains found");
	       		}else{
	       			$("#pagination").pagination('prevPage');
	       		}
	     	}else{
	    		complainDetails=$("<tr />");
	    		$("#table").append(complainDetails);
	    		complainDetails.append($("<th></th>"));
	    		complainDetails.append($("<th>Name</th>"));
	    		complainDetails.append($("<th>Complain</th>"));
	    		complainDetails.append($("<th>Date</th>"));
	    		complainDetails.append($("<th>User</th>"));
	    		complainDetails.append($("<th>Status</th>"));
	       		complainDetails.append($("<th>Action</th>"));
	       		complainDetailsTable(myArr);
	    	}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}

function deleteComplainDetails(){
	var element=document.getElementsByName("complainDetails_ID");
	var count=countRow(element);
	if(count==0){
		window.alert("Please select a row to delete");
	}else{
		for(var i=0;i<element.length;i++){
			if(element.item(i).checked){
				var param="Table=ComplainDetails&Id="+(element.item(i).value);
				var xmlhttp = new XMLHttpRequest();
				var url = "removeRow.action";
				xmlhttp.onreadystatechange = function(){
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var response = (xmlhttp.responseText);
						$("#pagination").pagination('updateItems', countComplainDetailsRows());
						getComplainDetailsList($("#pagination").pagination('getCurrentPage'),response);
					}
				};
				xmlhttp.open("POST", url, true);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send(param);
			}
		}
	}
}
//Count no of rows in complainDetails Table
function countComplainDetailsRows(){
	var xmlhttp = new XMLHttpRequest();
	var url = "countRowsInTable.action";
	var param="TableName=ComplainDetails";
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
function userComplainSubmit(){
	var xmlhttp = new XMLHttpRequest();
	var url = "insertComplain.action";
	var param="Name="+$("#complainName").val()+
	"&Complain="+$("#userComplainDescription").val()+"&UserId="+$("#userId").text();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = (xmlhttp.responseText);
			$("#actionStatus").show();
			if(response=="success"){
				window.alert("Your Complain has been successfully added");
				showHome();
			}else{
				$("#actionStatus").text("Failed to add your Complain").css("color","red");
			}
		}
	};
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}