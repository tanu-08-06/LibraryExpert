function requestBookTable(arr) {
	for(var i=0;i<arr.objList.length;i++){
		var requestBook=$("<tr />");
		$("#table").append(requestBook);
		var status;
		if(arr.objList[i].status=="pending"){
			status=true;
		}else{
			status=false;
		}
		requestBook.append($("<td> <input name=requestBook_ID value="+(arr.objList[i].bookReqId)+" type=checkbox> </td>"));
		requestBook.append($("<td>"+ (arr.objList[i].bookName) + "</td>"));
		requestBook.append($("<td>"+ (arr.objList[i].catagory.catagoryName) + "</td>"));
		requestBook.append($("<td>" + (arr.objList[i].user.userId) + "</td>"));
		requestBook.append($("<td>" + (arr.objList[i].user.userName) + "</td>"));
		requestBook.append($("<td>" +  dateFormat(arr.objList[i].date) + "</td>"));
		requestBook.append($("<td>" + (arr.objList[i].status) + "</td>"));
		requestBook.append($("<td><button id='markApproveRequestBook"+i+"' onclick=approveNewBookRequest("+(arr.objList[i].bookReqId)+")>Approve</button>" +
				"<button id='markRejectRequestBook"+i+"' onclick=rejectNewBookRequest("+(arr.objList[i].bookReqId)+")>Reject</button></td>"));
		if(!status){
			$("#markApproveRequestBook"+i+"").attr('disabled',true);
			$("#markRejectRequestBook"+i+"").attr('disabled',true);
		}
	}
}
function getRequestBookList(pageNumber,status){
	var xmlhttp = new XMLHttpRequest();
	var url = "tableAccess.action";
	var requestBook;
	var param="TableName=RequestBook&PageNumber="+pageNumber;
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
	       	$("#tableDiv").append("<label>RequestBook</label>");
	      	$("#tableDiv").append("<button style='float: right' onclick='viewNewRequestBooks()'>View New Transactions</button>");
	      	$("#actionStatus").text(status);
	      	$("#actionStatus").show();
	      	if(myArr.objList[0]==null){
	       		if(countRequestBookRows()==0){
	       			$("#pagination").hide();
	       			$("#tableDiv").hide();
	       			window.alert("no books are requested");
	       		}else{
	       			$("#pagination").pagination('prevPage');
	       		}
	     	}else{
	    		requestBook=$("<tr />");
	    		$("#table").append(requestBook);
	    		requestBook.append($("<th></th>"));
	    		requestBook.append($("<th>Book Name</th>"));
	    		requestBook.append($("<th>Catagory</th>"));
	    		requestBook.append($("<th>User Id</th>"));
	    		requestBook.append($("<th>User Name</th>"));
	    		requestBook.append($("<th>Request Date</th>"));
	    		requestBook.append($("<th>Status</th>"));
	    		requestBook.append($("<th>Action</th>"));
	       		requestBookTable(myArr);
	    	}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
//Count no of rows in requestBook Table
function countRequestBookRows(){
	var xmlhttp = new XMLHttpRequest();
	var url = "countRowsInTable.action";
	var param="TableName=RequestBook";
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
function viewNewRequestBooks(){
	getRequestBookList($("#pagination").pagination('getPagesCount'),"");
	
}
function newRequestBook(){
	var xmlhttp = new XMLHttpRequest();
	var url = "insertBookRequest.action";
	var param=$("#newBookRequestForm").serialize();	
	param=param+"&UserId="+$("#userId").text();
	window.alert(param);
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			if(xmlhttp.responseText=="success"){
				window.alert("Your request has been successfully posted");
				showHome();
			}else{
				window.alert(xmlhttp.responseText);
			}
		}
	};
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function approveNewBookRequest(id){
	var xmlhttp = new XMLHttpRequest();
	var url = "approveNewBookRequest.action";
	var param="requestBookId="+id;	
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			if(xmlhttp.responseText=="success"){
				getRequestBookList($("#pagination").pagination('getCurrentPage'),"Successfully Approved");
			}else{
				window.alert(xmlhttp.responseText);
			}
		}
	};
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function rejectNewBookRequest(id){
	var xmlhttp = new XMLHttpRequest();
	var url = "rejectNewBookRequest.action";
	var param="requestBookId="+id;	
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			if(xmlhttp.responseText=="success"){
				getRequestBookList($("#pagination").pagination('getCurrentPage'),"Successfully Rejected");
			}else{
				window.alert(xmlhttp.responseText);
			}
		}
	};
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}