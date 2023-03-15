function bookTable(objList) {
	for(var i=0;i<objList.length;i++){
		var book=$("<tr />");
		var status;
		if(objList[i].availablity){
			status="yes";
		}else{
			status="no";
		}
		$("#table").append(book);
		book.append($("<td> <input name=book_ID value="+(objList[i].bookId)+" type=checkbox> </td>"));
		book.append($("<td>" + (objList[i].name) + "</td>"));
		book.append($("<td>" + (objList[i].description) + "</td>"));
		book.append($("<td>" + (objList[i].author)  + "</td>"));
		book.append($("<td>" + (objList[i].catagory.catagoryName)  + "</td>"));
		book.append($("<td>" + (objList[i].edition) + "</td>"));
		book.append($("<td>" + status + "</td>"));
		book.append($("<td><button id='markFalse"+i+"' onclick='issueBook("+(objList[i].bookId)+")'>Issue Book</button>"));
		if(status=="no"){
			$("#markFalse"+i+"").attr('disabled',true);
		}
	}
}
/*function bookTable(arr) {
	for(var i=0;i<arr.objList.length;i++){
		var book=$("<tr />");
		var status;
		if(arr.objList[i].availablity){
			status="yes";
		}else{
			status="no";
		}
		$("#table").append(book);
		book.append($("<td> <input name=book_ID value="+(arr.objList[i].bookId)+" type=checkbox> </td>"));
		book.append($("<td>"+ (arr.objList[i].name) + "</td>"));
		book.append($("<td>" + (arr.objList[i].description) + "</td>"));
		book.append($("<td>" + (arr.objList[i].author)  + "</td>"));
		book.append($("<td>" + (arr.objList[i].catagory.catagoryName)  + "</td>"));
		book.append($("<td>" + (arr.objList[i].edition) + "</td>"));
		book.append($("<td>" + status + "</td>"));
		book.append($("<td><button id='markFalse"+i+"' onclick='issueBook("+(arr.objList[i].bookId)+")'>Issue Book</button>"));
		if(status=="no"){
			$("#markFalse"+i+"").attr('disabled',true);
		}
	}
  
} */

function getBookList(pageNumber,status){
	var xmlhttp = new XMLHttpRequest();
	var url = "tableAccess.action";
	var book;
	var param;
	param="TableName=Book&PageNumber="+pageNumber;
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
	       	$("#tableDiv").append("<label>Books</label>");
	      	$("#actionStatus").text(status);
	      	$("#actionStatus").show();
	      	if(myArr.objList[0]==null){
	       		if(countBookRows()==0){
	       			$("#pagination").hide();
	       			$("#tableDiv").hide();
	       			window.alert("no rows found");
	       		}else{
	       			$("#pagination").pagination('prevPage');
	       		}
	     	}else{
	    		book=$("<tr />");
	    		$("#table").append(book);
	    		book.append($("<th></th>"));
	    		book.append($("<th>Name</th>"));
	    		book.append($("<th>Description</th>"));
	    		book.append($("<th>Author</th>"));
	    		book.append($("<th>Catagory</th>"));
	    		book.append($("<th>Edition</th>"));
	    		book.append($("<th>Available</th>"));
	       		book.append($("<th>Action</th>"));
	      
	       			bookTable(myArr.objList);
	       		
	    	}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function deleteBooks(){
	var element=document.getElementsByName("book_ID");
	var count=countRow(element);
	if(count==0){
		window.alert("Please select a row to delete");
	}else{
		for(var i=0;i<element.length;i++){
			if(element.item(i).checked){
				var param="Table=Book&Id="+(element.item(i).value);
				var xmlhttp = new XMLHttpRequest();
				var url = "removeRow.action";
				xmlhttp.onreadystatechange = function(){
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var response = (xmlhttp.responseText);
						$("#pagination").pagination('updateItems', countBookRows());
						getAdminBookList($("#pagination").pagination('getCurrentPage'),response);
					}
				};
				xmlhttp.open("POST", url, true);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send(param);
			}
		}
	}
}
//Count no of rows in book Table
function countBookRows(){
	var xmlhttp = new XMLHttpRequest();
	var url = "countRowsInTable.action";
	var param="TableName=Book";
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
function bookBlock(id){
	var param="Table=Book&Id="+id;
	var xmlhttp = new XMLHttpRequest();
	var url = "blockBook.action";
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = (xmlhttp.responseText);
			getBookList($("#pagination").pagination('getCurrentPage'),response);
		}
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function bookUnblock(id){
	var param="Table=Book&Id="+id;
	var xmlhttp = new XMLHttpRequest();
	var url = "unblockBook.action";
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = (xmlhttp.responseText);
			getBookList($("#pagination").pagination('getCurrentPage'),response);
		}
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function newBook(){
	var param="Table=Book&Id="+id;
	var xmlhttp = new XMLHttpRequest();
	var url = "insertBook.action";
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = (xmlhttp.responseText);
			getAdminBookList($("#pagination").pagination('getCurrentPage'),response);
		}
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function issueBook(e){
	var param="BookId="+e+"&UserId="+$("#userId").text();
	var xmlhttp = new XMLHttpRequest();
	var url = "issueBook.action";
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response=(xmlhttp.responseText);
			getBookList($("#pagination").pagination('getCurrentPage'),response);
		}
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function getAdminBookList(pageNumber,status){
	var xmlhttp = new XMLHttpRequest();
	var url = "tableAccess.action";
	var book;
	var param="TableName=Book&PageNumber="+pageNumber;
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
	       	$("#tableDiv").append("<label>Book</label>");
	       	$("#tableDiv").append("<button style='float: right' onclick='deleteBooks()'>Delete</button>" +
	       			"<button style='float: right' onclick='showNewBook()'>New</button>");
	      	$("#actionStatus").text(status);
	      	$("#actionStatus").show();
	      	if(myArr.objList[0]==null){
	       		if(countBookRows()==0){
	       			$("#pagination").hide();
	       		//	$("#tableDiv").hide();
	       			window.alert("no rows found");
	       		}else{
	       			$("#pagination").pagination('prevPage');
	       		}
	     	}else{
	    		book=$("<tr />");
	    		$("#table").append(book);
	    		book.append($("<th></th>"));
	    		book.append($("<th>Name</th>"));
	    		book.append($("<th>Description</th>"));
	    		book.append($("<th>Author</th>"));
	    		book.append($("<th>Edition</th>"));
	       		book.append($("<th>Action</th>"));
	    		adminBookTable(myArr);
	    	}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function adminBookTable(arr) {
	for(var i=0;i<arr.objList.length;i++){
		var book=$("<tr />");
		$("#table").append(book);
		book.append($("<td> <input name=book_ID value="+(arr.objList[i].bookId)+" type=checkbox> </td>"));
		book.append($("<td>" + (arr.objList[i].name) + "</td>"));
		book.append($("<td>" + (arr.objList[i].description) + "</td>"));
		book.append($("<td>" + (arr.objList[i].author)  + "</td>"));
		book.append($("<td>" + (arr.objList[i].edition) + "</td>"));
		book.append($("<td><button id='"+JSON.stringify(arr.objList[i])+"' onclick='showEditBook(this.id)'>Edit</button></td>"));
	}
  
}
function showNewBook(){
	$("#section>*").hide();
	$("#bookNew").slideDown();
}
function showEditBook(Book){
	var book=JSON.parse(Book);
	
	$("#section>*").hide();
	$("#bookUpdate").slideDown();
	$("#bookUpdateId").text(book.bookId);
	$("#bookUpdateName").val(book.name);
	$("#bookUpdateAuthor").val(book.author);
	$("#bookUpdateEdition").val(book.edition);
	$("#bookUpdateCatagory").val(book.catagory.catagoryName);
	$("#bookUpdateDescription").val(book.description);
}
function submitBookFormNew(){
	var url="insertBook.action";
	var param=$("#bookNewForm").serialize();
	//window.alert(param);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    	if((xmlhttp.responseText)=="success"){
	     		window.alert("Book has been added successfully");
	     		showHome();
	    	}else{
	    		window.alert(xmlhttp.responseText);
	    	}
	    	
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function submitBookFormUpdate(){
	var url="updateBook.action";
	var param=$("#bookUpdateForm").serialize();
	param=param+"&BookId="+$("#bookUpdateId").text();
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    	if(xmlhttp.responseText=="success"){
	    		window.alert("Book has been updated successfully");
	    		showHome();
	    	}
	    	else{
	    		window.alert(xmlhttp.responseText);
	    	}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}

function closeBookForm(){
	$('#bookNew').hide();
	showHome();
}
function submitAdvanceSearchBook(){
	var url="searchBook.action";
	var param=$("#advanceSearchForm").serialize();
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    	if(xmlhttp.responseText=="Please enter atleast one Field"){
	    		window.alert("Please enter atleast one Field");
	    	}else if(xmlhttp.responseText=="failed"){
	    		window.alert("No match for the search");
	    	}else{
	    		$("#section>*").hide();
		    	$("#pagination").show();
		    	$("#table").show();	    	
		    	$("#table tr").remove();
		    	var myArr = JSON.parse(xmlhttp.responseText);
		    	$("#tableDiv").show();
		    	$("#tableDiv").css("align", "right");
		    	$("#tableDiv *").remove();
		       	$("#tableDiv").append("<label>Books</label>");
		      	$("#actionStatus").text(status);
		      	$("#actionStatus").show();
		      	if(myArr[0]==null){
		       		if(countBookRows()==0){
		       			$("#pagination").hide();
		       			$("#tableDiv").hide();
		       			window.alert("no books found");
		       		}else{
		       			$("#pagination").pagination('prevPage');
		       		}
		     	}else{
		    		book=$("<tr />");
		    		$("#table").append(book);
		    		book.append($("<th></th>"));
		    		book.append($("<th>Name</th>"));
		    		book.append($("<th>Description</th>"));
		    		book.append($("<th>Author</th>"));
		    		book.append($("<th>Catagory</th>"));
		    		book.append($("<th>Edition</th>"));
		    		book.append($("<th>Available</th>"));
		       		book.append($("<th>Action</th>"));
		      
		       			advanceSearchBookTable(myArr);
		       		
		    	}
	    		
	    	}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function advanceSearchBookTable(objList){
	for(var i=0;i<objList.length&&i<50;i++){
		var book=$("<tr />");
		var status;
		if(objList[i][0].availablity){
			status="yes";
		}else{
			status="no";
		}
		$("#table").append(book);
		var x=document.getElementsByName("book_ID");
		var sX=false;
		if(x.length>0){
			for(var j=0;j<x.length;j++){
				if(objList[i][0].bookId==x.item(j).value){
					sX=true;
				}
			}
		}
		if(!sX){
			book.append($("<td> <input name=book_ID value="+(objList[i][0].bookId)+" type=checkbox> </td>"));
			book.append($("<td>" + (objList[i][0].name) + "</td>"));
			book.append($("<td>" + (objList[i][0].description) + "</td>"));
			book.append($("<td>" + (objList[i][0].author)  + "</td>"));
			book.append($("<td>" + (objList[i][0].catagory.catagoryName)  + "</td>"));
			book.append($("<td>" + (objList[i][0].edition) + "</td>"));
			book.append($("<td>" + status + "</td>"));
			book.append($("<td><button id='markFalse"+i+"' onclick='issueBook("+(objList[i][0].bookId)+")'>Issue Book</button>"));
			if(status=="no"){
				$("#markFalse"+i+"").attr('disabled',true);
			}
		}
	}
}