$( document ).ready(function(){
	if($("#userType").text()=="admin"){
		$("#navAdmin").show();
	}
	var $imgs = $(".fader").find("img"),
    i = 0;
	function changeImage(){
	    var next = (++i % $imgs.length);
	    $($imgs.get(next - 1)).fadeOut(500);
	    $($imgs.get(next)).fadeIn(500);
	}
	setInterval(changeImage, 2000);
	$( ".catagory" ).autocomplete({
	      source: function( request, response ) {
	        $.ajax({
	          url: "getCatagory.action",
	          dataType: "jsonp",
	          data: {
	            q: request.term
	          },
	          success: function( data ) {
	        	  response(data);
	        	  /*       	  var x=(data);
	        	  var responseData=[];
	           	  var catagogyId=[];
	        	  for (var i=0;i<x.length;i++){
	                 var res=x[i].split(",");
	                 responseData[i]=res[1];
	        	  }
	        	  response(responseData); */
	          }
	        });
	      },
	      minLength: 1,
	      open: function() {
	        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
	      },
	      close: function() {
	        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
	      }
	    });
	//multiple value

	  
	  $(function() {
	    function split( val ) {
	      return val.split( /,\s*/ );
	    }
	    function extractLast( term ) {
	      return split( term ).pop();
	    }
	 
	    $( ".streams" )
	      // don't navigate away from the field on tab when selecting an item
	      .bind( "keydown", function( event ) {
	        if ( event.keyCode === $.ui.keyCode.TAB &&
	            $( this ).autocomplete( "instance" ).menu.active ) {
	          event.preventDefault();
	        }
	      })
	      .autocomplete({
	        source: function( request, response ) {
	          $.getJSON( "getStream.action", {
	            term: extractLast( request.term )
	          }, response );
	        },
	        search: function() {
	          // custom minLength
	          var term = extractLast( this.value );
	          if ( term.length < 1 ) {
	            return false;
	          }
	        },
	        focus: function() {
	          // prevent value inserted on focus
	          return false;
	        },
	        select: function( event, ui ) {
	          var terms = split( this.value );
	          // remove the current input
	          terms.pop();
	          // add the selected item
	          terms.push( ui.item.value );
	          // add placeholder to get the comma-and-space at the end
	          terms.push( "" );
	          this.value = terms.join( ", " );
	          return false;
	        }
	      });
	  });
});
function dateFormat(datemillisec){
	var d = new Date(datemillisec);
	var day = d.getDate();
	var month = d.getMonth()+1;
	var year = d.getFullYear();
	var dateformat=""+day+"/"+month+"/"+year;
	return dateformat;
	
}
//Count the number of rows
function countRow(element){
	var count=0;
	for(var i=0;i<element.length;i++){
		if(element.item(i).checked){
			count++;
		}
	}
	return count;
}
function getTable(pageNumber){
	if($("#tableDiv label").text()=="Users"){
		getUserList(pageNumber,"");
	}else if($("#tableDiv label").text()=="UnregisteredUsers"){
		getUnregisteredUserList(pageNumber,"");
	}else if($("#tableDiv label").text()=="BorrowedBook"){
		getBorrowedBookList(pageNumber,"");
	}else if($("#tableDiv label").text()=="MyBorrowedBook"){
		getMyBorrowedBookList(pageNumber,"");
	}else if($("#tableDiv label").text()=="ComplainDetails"){
		getComplainDetailsList(pageNumber,"");
	}else if($("#tableDiv label").text()=="MyComplainDetails"){
		getMyComplainDetailsList(pageNumber,"");
	}else if($("#tableDiv label").text()=="Book"){
		getAdminBookList(pageNumber,"");
	}else if($("#tableDiv label").text()=="Books"){
		getBookList(pageNumber,"");
	}else if($("#tableDiv label").text()=="UserActivity"){
		getUserActivityList(pageNumber,"");
	}else if($("#tableDiv label").text()=="ReturnedBook"){
		getReturnedBookList(pageNumber,"");
	}else if($("#tableDiv label").text()=="MyRequestBook"){
		getMyRequestBookList(pageNumber,"");
	}
}