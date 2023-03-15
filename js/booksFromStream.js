function bookWithStreamTable(objList) {
	for(var i=0;i<objList.length;i++){
		var book=$("<tr />");
		var status;
		if(objList[i][0].availablity){
			status="yes";
		}else{
			status="no";
		}
		$("#table").append(book);
		book.append($("<td> <input name=book_ID value="+(objList[i][0].bookId)+" type=checkbox> </td>"));
		book.append($("<td>" + (objList[i][0].name) + "</td>"));
		book.append($("<td>" + (objList[i][0].description) + "</td>"));
		book.append($("<td>" + (objList[i][0].author)  + "</td>"));
		book.append($("<td>" + (objList[i][0].catagory.catagoryName)  + "</td>"));
		book.append($("<td>" + (objList[i][0].edition) + "</td>"));
		book.append($("<td>" + status + "</td>"));
		book.append($("<td><button id='markFalse"+i+"' onclick='issueBook("+(objList[i].bookId)+")'>Issue Book</button>"));
		if(status=="no"){
			$("#markFalse"+i+"").attr('disabled',true);
		}
		
	}
}
function getBookFromStreamList(pageNumber,status,stream){
	var xmlhttp = new XMLHttpRequest();
	var url = "tableAccess.action";
	var book;
	var param="TableName=Book book join book.stream s where s.streamName='"+stream+"'&PageNumber="+pageNumber;
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
	      	//TODO
	      	if(myArr.objList[0] === undefined ){
	       		if(myArr.objList.length==0){
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
	       		bookWithStreamTable(myArr.objList);
	    	}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function countBookFromStreamRows(stream){
	var xmlhttp = new XMLHttpRequest();
	var url = "countBooksInStream.action";
	var param="stream="+stream;
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