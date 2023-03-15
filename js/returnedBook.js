function returnedBookTable(arr) {
	for(var i=0;i<arr.objList.length;i++){
		var returnedBook=$("<tr />");
		$("#table").append(returnedBook);
		returnedBook.append($("<td> <input name=returnedBook_ID value="+(arr.objList[i].rbId)+" type=checkbox> </td>"));
		returnedBook.append($("<td>"+ (arr.objList[i].bookId) + "</td>"));
		returnedBook.append($("<td>"+ (arr.objList[i].bookName) + "</td>"));
		returnedBook.append($("<td>"+ (arr.objList[i].userId) + "</td>"));
		returnedBook.append($("<td>" + (arr.objList[i].userName) + "</td>"));
		returnedBook.append($("<td>" +  dateFormat(arr.objList[i].borrowedDate) + "</td>"));
		returnedBook.append($("<td>" +  dateFormat(arr.objList[i].returnedDate) + "</td>"));
	}
  
}
function getReturnedBookList(pageNumber,status){
	var xmlhttp = new XMLHttpRequest();
	var url = "tableAccess.action";
	var returnedBook;
	var param="TableName=ReturnedBook&PageNumber="+pageNumber;
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
	       	$("#tableDiv").append("<label>ReturnedBook</label>");
	      	$("#tableDiv").append("<button style='float: right' onclick='viewNewReturnedBooks()'>View New Transactions</button>");
	      	$("#actionStatus").text(status);
	      	$("#actionStatus").show();
	      	if(myArr.objList[0]==null){
	       		if(countReturnedBookRows()==0){
	       			$("#pagination").hide();
	       			$("#tableDiv").hide();
	       			window.alert("books are returned");
	       		}else{
	       			$("#pagination").pagination('prevPage');
	       		}
	     	}else{
	    		returnedBook=$("<tr />");
	    		$("#table").append(returnedBook);
	    		returnedBook.append($("<th></th>"));
	    		returnedBook.append($("<th>Book Id</th>"));
	    		returnedBook.append($("<th>Book Name</th>"));
	    		returnedBook.append($("<th>User Id</th>"));
	    		returnedBook.append($("<th>User Name</th>"));
	    		returnedBook.append($("<th>Borrowed Date</th>"));
	    		returnedBook.append($("<th>Returned Date</th>"));
	       		returnedBookTable(myArr);
	    	}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
//Count no of rows in returnedBook Table
function countReturnedBookRows(){
	var xmlhttp = new XMLHttpRequest();
	var url = "countRowsInTable.action";
	var param="TableName=ReturnedBook";
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
function viewNewReturnedBooks(){
	getReturnedBookList($("#pagination").pagination('getPagesCount'),"");
	
}
