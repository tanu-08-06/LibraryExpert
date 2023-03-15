function myMyBorrowedBookTable(arr) {
	for(var i=0;i<arr.objList.length;i++){
		var myMyBorrowedBook=$("<tr />");
		$("#table").append(myMyBorrowedBook);
		myMyBorrowedBook.append($("<td> <input name=myMyBorrowedBook_ID value="+(arr.objList[i].bbId)+" type=checkbox> </td>"));
		myMyBorrowedBook.append($("<td>"+ (arr.objList[i].book.name) + "</td>"));
		myMyBorrowedBook.append($("<td>"+ (arr.objList[i].book.edition) + "</td>"));
		myMyBorrowedBook.append($("<td>"+ (arr.objList[i].book.author) + "</td>"));
		myMyBorrowedBook.append($("<td>" + (arr.objList[i].user.firstName) + "</td>"));
		myMyBorrowedBook.append($("<td>" +  dateFormat(arr.objList[i].borrowDate) + "</td>"));
		myMyBorrowedBook.append($("<td>" +  dateFormat(arr.objList[i].returnDate) + "</td>"));
	}
  
}
function getMyBorrowedBookList(pageNumber,status){
	var xmlhttp = new XMLHttpRequest();
	var url = "tableAccess.action";
	var myMyBorrowedBook;
	var param="TableName=BorrowedBook&PageNumber="+pageNumber+"&userId="+$("#userId").text();
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
	       	$("#tableDiv").append("<label>MyBorrowedBook</label>");
	      	$("#tableDiv").append("<button style='float: right' onclick='viewNewMyBorrowedBooks()'>View New Transactions</button>");
	      	$("#actionStatus").text(status);
	      	$("#actionStatus").show();
	      	if(myArr.objList[0]==null){
	       		if(countMyBorrowedBookRows()==0){
	       			$("#pagination").hide();
	       			$("#tableDiv").hide();
	       			window.alert("No Books Borrowed");
	       			showHome();
	       		}else{
	       			$("#pagination").pagination('prevPage');
	       		}
	     	}else{
	    		myMyBorrowedBook=$("<tr />");
	    		$("#table").append(myMyBorrowedBook);
	    		myMyBorrowedBook.append($("<th></th>"));
	    		myMyBorrowedBook.append($("<th>Book Name</th>"));
	    		myMyBorrowedBook.append($("<th>Edition</th>"));
	    		myMyBorrowedBook.append($("<th>Author</th>"));
	    		myMyBorrowedBook.append($("<th>User Name</th>"));
	    		myMyBorrowedBook.append($("<th>Borrow Date</th>"));
	    		myMyBorrowedBook.append($("<th>Return Date</th>"));
	    		myMyBorrowedBookTable(myArr);
	    	}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
//Count no of rows in myMyBorrowedBook Table
function countMyBorrowedBookRows(){
	var xmlhttp = new XMLHttpRequest();
	var url = "countRowsInTable.action";
	var param="TableName=BorrowedBook&userId="+$("#userId").text();
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