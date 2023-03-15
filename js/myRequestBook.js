function myMyRequestBookTable(arr) {
	for(var i=0;i<arr.objList.length;i++){
		var myMyRequestBook=$("<tr />");
		$("#table").append(myMyRequestBook);
		myMyRequestBook.append($("<td> <input name=myMyRequestBook_ID value="+(arr.objList[i].bookReqId)+" type=checkbox> </td>"));
		myMyRequestBook.append($("<td>"+ (arr.objList[i].bookName) + "</td>"));
		myMyRequestBook.append($("<td>"+ (arr.objList[i].catagory.catagoryName) + "</td>"));
		myMyRequestBook.append($("<td>" + (arr.objList[i].user.userId) + "</td>"));
		myMyRequestBook.append($("<td>" + (arr.objList[i].user.userName) + "</td>"));
		myMyRequestBook.append($("<td>" +  dateFormat(arr.objList[i].date) + "</td>"));
		myMyRequestBook.append($("<td>" + (arr.objList[i].status) + "</td>"));
	}
}
function getMyRequestBookList(pageNumber,status){
	var xmlhttp = new XMLHttpRequest();
	var url = "tableAccess.action";
	var myMyRequestBook;
	var param="TableName=RequestBook&PageNumber="+pageNumber+"&userId="+$("#userId").text();
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
	       	$("#tableDiv").append("<label>MyRequestBook</label>");
	       	$("#actionStatus").text(status);
	      	$("#actionStatus").show();
	      	if(myArr.objList[0]==null){
	       		if(countMyRequestBookRows()==0){
	       			$("#pagination").hide();
	       			$("#tableDiv").hide();
	       			window.alert("no books are requested");
	       			showHome();
	       		}else{
	       			$("#pagination").pagination('prevPage');
	       		}
	     	}else{
	    		myMyRequestBook=$("<tr />");
	    		$("#table").append(myMyRequestBook);
	    		myMyRequestBook.append($("<th></th>"));
	    		myMyRequestBook.append($("<th>Book Name</th>"));
	    		myMyRequestBook.append($("<th>Catagory</th>"));
	    		myMyRequestBook.append($("<th>User Id</th>"));
	    		myMyRequestBook.append($("<th>User Name</th>"));
	    		myMyRequestBook.append($("<th>Request Date</th>"));
	    		myMyRequestBook.append($("<th>Status</th>"));
	    		myMyRequestBookTable(myArr);
	    	}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
//Count no of rows in myMyRequestBook Table
function countMyRequestBookRows(){
	var xmlhttp = new XMLHttpRequest();
	var url = "countRowsInTable.action";
	var param="TableName=RequestBook"+"&userId="+$("#userId").text();
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