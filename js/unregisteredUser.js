function unregisteredUsertable(arr) {
	for(var i=0;i<arr.objList.length;i++){
		var user=$("<tr />");
		$("#table").append(user);
		user.append($("<td> <input name=unregisteredUser_ID value="+(arr.objList[i].userId)+" type=checkbox> </td>"));
		user.append($("<td>"+ (arr.objList[i].firstName) + "</td>"));
		user.append($("<td>" + (arr.objList[i].lastName) + "</td>"));
		user.append($("<td>" +  dateFormat(arr.objList[i].dob) + "</td>"));
		user.append($("<td>" + (arr.objList[i].email) + "</td>"));
		user.append($("<td>" + (arr.objList[i].phone) + "</td>"));
		user.append($("<td>" + (arr.objList[i].address) + "</td>"));
	}
  
}

function getUnregisteredUserList(pageNumber,status){
	var xmlhttp = new XMLHttpRequest();
	var url = "tableAccess.action";
	var user;
	var param="TableName=UnregisteredUser&PageNumber="+pageNumber;
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
	    	$("#actionStatus").show();
			$("#actionStatus").text(status);
	       	$("#tableDiv").append("<label>UnregisteredUsers</label>");
	    	$("#tableDiv").append("<button style='float: right' onclick='rejectUnregisteredUsers()'>Reject</button>" +
	    			"<button style='float: right' onclick='approveUnregisteredUsers()'>Approve</button>");
	       	if(myArr.objList[0]==null){
	       		if(countUnregisteredUserRows()==0){
	       			$("#pagination").hide();
	       			$("#tableDiv").hide();
	       			window.alert("No Unregistered Users");
	       			showHome();
	       		}else{
	       			$("#pagination").pagination('prevPage');
	       		}
	     	}else{
	      		user=$("<tr />");
	    		$("#table").append(user);
	    		user.append($("<th></th>"));
	    		user.append($("<th>FirstName</th>"));
	    		user.append($("<th>LastName</th>"));
	    		user.append($("<th>DOB</th>"));
	    		user.append($("<th>Email</th>"));
	    		user.append($("<th>Ph_No</th>"));
	       		user.append($("<th>Address</th>"));
	    		unregisteredUsertable(myArr);
	    	}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function registerMe(){
	var xmlhttp=new XMLHttpRequest();
	var url="signUp.action";
	var param= $('#signUpForm').serialize();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
			if(xmlhttp.responseText=="success"){
				showLoginDiv();
				$("#registrationStatus").text("You have register successfully.");
				$("#authenticationFailedStatus").hide();
			}else{
				if(xmlhttp.responseText=="failed")
					$("#registrationStatus").text("Failed to register you, try again!");
				else
					window.alert(xmlhttp.responseText);
			}
	    }
	 };
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
//final
//Function to delete a row from unregisteredUser table
function rejectUnregisteredUsers(){
	var element=document.getElementsByName("unregisteredUser_ID");
	var count=countRow(element);
	if(count==0){
		window.alert("Please select a row to reject");
	}else{
		for(var i=0;i<element.length;i++){
			if(element.item(i).checked){
				var param="Table=UnregisteredUser&Id="+(element.item(i).value);
		
				var xmlhttp = new XMLHttpRequest();
				var url = "removeRow.action";
				xmlhttp.onreadystatechange = function(){
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var response = (xmlhttp.responseText);
						$("#pagination").pagination('updateItems', countUnregisteredUserRows());
						getUnregisteredUserList($("#pagination").pagination('getCurrentPage'),response);
					}
				};
				xmlhttp.open("POST", url, true);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send(param);
			}
		}
	}
}

//Count no of rows in UnregisteredUser Table
function countUnregisteredUserRows(){
	var xmlhttp = new XMLHttpRequest();
	var url = "countRowsInTable.action";
	var param="TableName=UnregisteredUser";
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
function activateAuthenticationstatus(){
	authenticationFailedStatus.show();
}
function approveUnregisteredUsers(){
	var element=document.getElementsByName("unregisteredUser_ID");
	var count=countRow(element);
	if(count==0){
		window.alert("Please select a row to approve");
	}else{
		for(var i=0;i<element.length;i++){
			if(element.item(i).checked){
				var param="Table=UnregisteredUser&Id="+(element.item(i).value);
				var xmlhttp = new XMLHttpRequest();
				var url = "approveUnregisteredUser.action";
				xmlhttp.onreadystatechange = function(){
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var response = (xmlhttp.responseText);
						$("#pagination").show();
						$("#pagination").pagination('updateItems', countUnregisteredUserRows());
						getUnregisteredUserList($("#pagination").pagination('getCurrentPage'),response);
					}
				};
				xmlhttp.open("POST", url, true);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send(param);
			}
		}
	}
}