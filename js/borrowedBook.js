function borrowedBookTable(arr) {
	for(var i=0;i<arr.objList.length;i++){
		var borrowedBook=$("<tr />");
		$("#table").append(borrowedBook);
		borrowedBook.append($("<td> <input name=borrowedBook_ID value="+(arr.objList[i].bbId)+" type=checkbox> </td>"));
		borrowedBook.append($("<td>"+ (arr.objList[i].book.name) + "</td>"));
		borrowedBook.append($("<td>"+ (arr.objList[i].book.edition) + "</td>"));
		borrowedBook.append($("<td>"+ (arr.objList[i].book.author) + "</td>"));
		borrowedBook.append($("<td>" + (arr.objList[i].user.firstName) + "</td>"));
		borrowedBook.append($("<td>" +  dateFormat(arr.objList[i].borrowDate) + "</td>"));
		borrowedBook.append($("<td>" +  dateFormat(arr.objList[i].returnDate) + "</td>"));
		borrowedBook.append($("<td><button onclick='extendDate("+(arr.objList[i].bbId)+")'>Extend Date</button>" +
				"<button onclick='borrowedBookReturned("+(arr.objList[i].bbId)+")'>Returned</button>"));
	}
  
}
function getBorrowedBookList(pageNumber,status){
	var xmlhttp = new XMLHttpRequest();
	var url = "tableAccess.action";
	var borrowedBook;
	var param="TableName=BorrowedBook&PageNumber="+pageNumber;
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
	       	$("#tableDiv").append("<label>BorrowedBook</label>");
	      	$("#tableDiv").append("<button style='float: right' onclick='viewNewBorrowedBooks()'>View New Transactions</button>");
	      	$("#actionStatus").text(status);
	      	$("#actionStatus").show();
	      	if(myArr.objList[0]==null){
	       		if(countBorrowedBookRows()==0){
	       			$("#pagination").hide();
	       			$("#tableDiv").hide();
	       			window.alert("no books are borrowed");
	       			showHome();
	       		}else{
	       			$("#pagination").pagination('prevPage');
	       		}
	     	}else{
	    		borrowedBook=$("<tr />");
	    		$("#table").append(borrowedBook);
	    		borrowedBook.append($("<th></th>"));
	    		borrowedBook.append($("<th>Book Name</th>"));
	    		borrowedBook.append($("<th>Edition</th>"));
	    		borrowedBook.append($("<th>Author</th>"));
	    		borrowedBook.append($("<th>User Name</th>"));
	    		borrowedBook.append($("<th>Borrow Date</th>"));
	    		borrowedBook.append($("<th>Return Date</th>"));
	       		borrowedBook.append($("<th>Action</th>"));
	    		borrowedBookTable(myArr);
	    	}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
//Count no of rows in borrowedBook Table
function countBorrowedBookRows(){
	var xmlhttp = new XMLHttpRequest();
	var url = "countRowsInTable.action";
	var param="TableName=BorrowedBook";
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
function viewNewBorrowedBooks(){
	getBorrowedBookList($("#pagination").pagination('getPagesCount'),"");
	
}
function borrowedBookReturned(id){
	var xmlhttp = new XMLHttpRequest();
	var url = "borrowedBookReturned.action";
	var param="BorrowedBookId="+id;
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			getBorrowedBookList($("#pagination").pagination('getCurrentPage'),"Returned Successfully");
		}
	};
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function extendDate(id){
	var xmlhttp = new XMLHttpRequest();
	var url = "extendBook.action";
	var param="BorrowedBookId="+id;
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			getBorrowedBookList($("#pagination").pagination('getCurrentPage'),"Extended Successfully");
		}
	};
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}