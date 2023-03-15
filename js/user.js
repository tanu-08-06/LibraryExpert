function userTable(arr) {
	for(var i=0;i<arr.objList.length;i++){
		var user=$("<tr />");
		var status;
		if(arr.objList[i].active==true){
			status="Block";
		}else{
			status="Unblock";
		}
		$("#table").append(user);
		user.append($("<td> <input name=user_ID value="+(arr.objList[i].userId)+" type=checkbox> </td>"));
		user.append($("<td>"+ (arr.objList[i].firstName) + "</td>"));
		user.append($("<td>" + (arr.objList[i].lastName) + "</td>"));
		user.append($("<td>" +  dateFormat(arr.objList[i].dob) + "</td>"));
		user.append($("<td>" + (arr.objList[i].email) + "</td>"));
		user.append($("<td>" + (arr.objList[i].phone) + "</td>"));
		user.append($("<td>" + (arr.objList[i].address) + "</td>"));
		user.append($("<td><button onclick='viewActivity()'>View Activity</button>" +
				"<button id="+(arr.objList[i].userId)+" onclick='user"+status+"(this.id)'>"+status+"</button></td>"));
	}
  
}

function getUserList(pageNumber,status){
	var xmlhttp = new XMLHttpRequest();
	var url = "tableAccess.action";
	var user;
	var param="TableName=User&PageNumber="+pageNumber;
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
	       	$("#tableDiv").append("<label>Users</label>");
	      	$("#tableDiv").append("<button style='float: right' onclick='deleteUsers()'>Delete</button>");
	      	$("#actionStatus").text(status);
	      	$("#actionStatus").show();
	      	if(myArr.objList[0]==null){
	       		if(countUserRows()==0){
	       			$("#pagination").hide();
	       			$("#tableDiv").hide();
	       			window.alert("No Users Found");
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
	       		user.append($("<th>Action</th>"));
	    		userTable(myArr);
	    	}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}

function deleteUsers(){
	var element=document.getElementsByName("user_ID");
	var count=countRow(element);
	if(count==0){
		window.alert("Please select a row to delete");
	}else{
		for(var i=0;i<element.length;i++){
			if(element.item(i).checked){
				var param="Table=User&Id="+(element.item(i).value);
				var xmlhttp = new XMLHttpRequest();
				var url = "removeRow.action";
				xmlhttp.onreadystatechange = function(){
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var response = (xmlhttp.responseText);
						$("#pagination").pagination('updateItems', countUserRows());
						getUserList($("#pagination").pagination('getCurrentPage'),response);
					}
				};
				xmlhttp.open("POST", url, true);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send(param);
			}
		}
	}
}
//Count no of rows in user Table
function countUserRows(){
	var xmlhttp = new XMLHttpRequest();
	var url = "countRowsInTable.action";
	var param="TableName=User";
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
function userBlock(id){
	
	var param="Table=User&Id="+id;
	var xmlhttp = new XMLHttpRequest();
	var url = "blockUser.action";
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = (xmlhttp.responseText);
			getUserList($("#pagination").pagination('getCurrentPage'),response);
		}
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function userUnblock(id){
	var param="Table=User&Id="+id;
	var xmlhttp = new XMLHttpRequest();
	var url = "unblockUser.action";
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = (xmlhttp.responseText);
			getUserList($("#pagination").pagination('getCurrentPage'),response);
		}
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}