<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>Home</title>
		<link rel="stylesheet" href="LE.css">
		<script src="js/jquery-2.1.3.js"></script>
		<script src="js/unregisteredUser.js"></script>
		<script src="js/logout.js"></script>
		<script src="js/book.js"></script>
		<script src="js/userActivity.js"></script>
		<script src="js/borrowedBook.js"></script>
		<script src="js/myBorrowedBook.js"></script>
		<script src="js/commonFunction.js"></script>
		<script src="js/returnedBook.js"></script>
		<script src="js/complainDetails.js"></script>
		<script src="js/myComplainDetails.js"></script>
		<script src="js/user.js"></script>
		<script src="js/myActivity.js"></script>
		<script src="js/booksFromStream.js"></script>
		<script src="js/ShowDiv.js"></script>
		<script src="js/requestBook.js"></script>
		<script src="js/myRequestBook.js"></script>
		<link rel="stylesheet" href="plugins/datePicker/jquery-ui.css">
		<script src="plugins/datePicker/jquery-1.10.2.js"></script>
		<script src="plugins/datePicker/jquery-ui.js"></script>
	  	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  		<script src="//code.jquery.com/jquery-1.10.2.js"></script>
  		<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  		<link type="text/css" rel="stylesheet" href="plugins/pagination/simplePagination.css"/>
		<script type="text/javascript" src="plugins/pagination/jquery.simplePagination.js"></script>
		<script>
		$(document).ready(function(){
			$("#pagination").pagination({
		        items: 0,
		        itemsOnPage: 5,
		        cssStyle: 'light-theme',
		        onPageClick: function(pageNumber, event) {
					// Callback triggered when a page is clicked
					// Page number is given as an optional parameter
					getTable(pageNumber);
				}	
		    });
			$("#userProfileFieldDateOfBirth").datepicker({
				changeMonth : true,
				changeYear : true,
				yearRange : "c-40:c"
			});
		});
		</script>
	</head>
	<body>
		
		<div id="header1" >
			<div id=header2><h1>LibraryExpert.<font color="green">com</font></h1></div> 
			<img src="Book2.jpg" height=135 width=100 style="top:0px; position:fixed; right:5px; top:0px">
			<div id="header3">
				<ul id="menu">
					<li><a href="#" onclick="showHome()">Home</a></li>
					<li><a href="#" onclick="showBookTable()">Books</a></li>
					<li><a href="#" onclick="showAdvanceSearch()">Advance Search</a></li>
					<li><a href="#" onclick="showComplain()">Complain</a></li>
					<li><a href="#" onclick="showBookRequest()">Book Request</a></li>
					<li><a href="#" onclick="showAboutUs()">About us</a></li>
					<li><a href="#" onclick="showContactUs()">Contact us</a></li>
					<li><a href="#" onclick="logoutUser()">LogOut</a></li>
					
				</ul>			
			</div>
		</div>
		<div id="userDetails">
			<label id="userId"><%= request.getSession().getAttribute("userId") %></label>
			<label id="userType"><%= request.getSession().getAttribute("type") %></label>
		</div>
	  	<div align="center" id="header4"> Welcome: <label id="userName"><%= request.getSession().getAttribute("username") %></label></div> 
		<div id="nav">
			<ul id=navmenu>
				<li><a align="center" style="margin-bottom:5px; background-color: orange">My Activity</a>
					<ul>
						<li><a href="#" onclick="showMyProfile()">My Profile</a></li>
						<li><a href="#" onclick="showMyBorrowedBookTable()">My Borrowed Books</a></li>
						<li><a href="#" onclick="showMyRequestBookTable()">My New Book Request</a></li>
						<li><a href="#" onClick="showMyComplainTable()">My Complain</a></li>
					</ul>
				</li>
				<li><a href="#" onclick="showBookOnStream('mba')">M.B.A</a></li>
				<li><a href="#" onclick="showBookOnStream('electrical')">ELECTRICAL</a></li>
				<li><a href="#" onclick="showBookOnStream('it')">I.T.</a></li>
				<li><a href="#" onclick="showBookOnStream('mechanical')">MECHANICAL</a></li>
				<li><a href="#" onclick="showBookOnStream('bca')">B.C.A.</a></li>
			</ul>
		</div>
		
		<div id="navAdmin">
				<ul id=navAdminMenu>
				<li><a id="adminTitle" align="center" style="background-color: orange">Admin Controls</a></li>		
				<li><a href="#" >Users</a>
					<ul>
						<li><a href="#" onclick="showUserTable()">Registered Users</a></li>
						<li><a href="#" onclick="showUnregisteredUserTable()">Unregistered Users</a></li>
						<li><a href="#" onclick="showUserActivityTable()">User Activity</a></li>
					</ul>
				</li>
				<li><a href="#" >Books</a>
					<ul>
						<li><a href="#" onclick="showAdminBookTable()">Organize Book</a></li>
						<li><a href="#" onclick="showBorrowedBookTable()">Borrowed Books</a></li>
						<li><a href="#" onclick="showReturnedBookTable()">Returned Books</a></li>
						<li><a href="#" onclick="showRequestedBookTable()">Requested Books</a></li>
					</ul>
				</li>
				<li><a href="#" onclick="showComplainDetailsTable()">Complain</a></li>
			
			</ul>
		</div>
		<div id="section">
			<div id="userComplain">
				<h3>Please Type Your Complain Below: </h3>
				Complain:<input type="text" id="complainName">
				<h4>Complain Description</h4>
				<textarea style="width:350px; height:150px" id="userComplainDescription"></textarea><br>
				<button onclick="userComplainSubmit()">Submit</button>
				<button onclick="userComplainCancel()">Cancel</button> 
			</div>
			<div id="home">
				<div class="fader">
				    <img src="images/img1.jpg" style="display: block;"/>
				    <img src="images/img2.jpg" />
				    <img src="images/img3.jpg" />
				    <img src="images/img4.jpg" />
				    <img src="images/img5.jpg" />
				</div>
				<div id="homeStatus">
					<h3>Welcome to Libery Expert.</h3>
				</div>
			</div>
			<div id="aboutUs">
				<h1>Welcome to Library Expert.</h1>	
				<p align="justify">
					<b>Be amazed by the collection of books that you need for your Studies. We provide you all books
					required for Engineering Studies.</b> 
				</p>
				<p align="justify">
					Easy-to-Use Design: Developed in consultation with users to deliver intuitive navigation and easy
					access to articles, chapters, references, and supplementary information.  
				</p>
				<p align="justify">
					We focus on customer satisfaction. If you face any kind of problem, you can immediately post
					your complain to us. Our moderators will take care of your problem as soon as possible. You can
					also request for a book if it is not available in our site. And you will get a notification as 
					soon as that book get updated in our database.
				</p>
			</div>
			<div id="contactUs">
				<br><br><br><br><br><br><br><br><br><br><br><br><br>
				<pre>    <font size="5" color="green">Customer care number: +917830698706</font></pre>
				<pre>   <i> <font size="5" color="green">Email id: libraryexpert@gmail.com</font></i></pre>
			
			</div>
			<div id="advanceSearch" align="center">
				<h3>Advance  Search</h3>
				Search books by filling one or more fields
				<form id="advanceSearchForm">
					<table id="bookFormTable">
						<tr><td>Book Name:</td><td align="center"><input type="text" name="name"></td></tr>
						<tr><td>Author:</td><td align="center"><input type="text" name="author"></td></tr>
						<tr><td>Catagory:</td><td align="center"><input id="bookNewCatagor" class="catagory" type="text" name="catagory"></td></tr>
						<tr><td>Edition:</td><td align="center"><input type="text" name="edition"></td></tr>
						<tr><td><label for="streams">Stream:</label></td><td align="center"><input class="streams" name="stream" size="20"></td></tr>
					</table>
				</form>
				<br>
				<div align="center"><button type="button" onclick="submitAdvanceSearchBook()">Submit</button><button onclick="closeBookForm()">Cancel</button> </div>
			</div>
			<div id="bookNew" class="bookForm" align="center">
				<h2>New Book Form</h2>
				<div class="ui-widget">
				<form id="bookNewForm">
					<b>Please Enter the following details</b> 
					<table id="bookFormTable">
						<tr><td>Book Name:</td><td align="center"><input type="text" name="name"></td></tr>
						<tr><td>Author:</td><td align="center"><input type="text" name="author"></td></tr>
						<tr><td>Catagory:</td><td align="center"><input id="bookNewCatagor" class="catagory" type="text" name="catagory"></td></tr>
						<tr><td>Edition:</td><td align="center"><input type="text" name="edition"></td></tr>
						<tr><td>Description:</td><td align="center"><input type="text" name="description"></td></tr>
						<tr><td><label for="streams">Stream: </label></td><td align="center"><input class="streams" name="stream" size="20"></td></tr>
					</table>
				</form></div>
				<div align="center">	<button type="button" onclick="submitBookFormNew()">Submit</button><button onclick="closeBookForm()">Cancel</button> </div>			
			</div>
			<div id="bookRequest" class="bookForm" align="center">
				<h2>Please enter the following details</h2>
				
				<form id="newBookRequestForm">
					<table id="bookFormTable">
						<tr><td>Book Name:</td><td align="center"><input type="text" name="name"></td></tr>
						<tr><td>Author:</td><td align="center"><input type="text" name="author"></td></tr>
						<tr><td>Catagory:</td><td align="center"><input class="catagory" type="text" name="catagory"></td></tr>
						<tr><td>Edition:</td><td align="center"><input type="text" name="edition"></td></tr>
						<tr><td>Description:</td><td align="center"><input type="text" name="description"></td></tr>
						
					</table>
				</form>
				<p align="center">	<button type="button" onclick="newRequestBook()">Submit</button><button onclick="showHome()">Cancel</button> </p>
			</div>
			<div id="bookUpdate" class="bookForm" align="center">
				<h2>Please enter the following details</h2><label id="bookUpdateId"></label>
				<form id="bookUpdateForm">
					<table id="bookFormTable">
						<tr><td>Book Name:</td><td align="center"><input id="bookUpdateName" type="text" name="name"></td></tr>
						<tr><td>Author:</td><td align="center"><input id="bookUpdateAuthor" type="text" name="author"></td></tr>
						<tr><td>Catagory:</td><td align="center"><input id="bookUpdateCatagory" class="catagory" type="text" name="catagory"></td></tr>
						<tr><td>Edition:</td><td align="center"><input id="bookUpdateEdition" type="text" name="edition"></td></tr>
						<tr><td>Description:</td><td align="center"><input id="bookUpdateDescription" type="text" name="description"></td></tr>
					</table>
				</form>
				<p align="center">	<button type="button" onclick="submitBookFormUpdate()">Submit</button><button onclick="closeBookForm()">Cancel</button> </p>
			</div>
			<div id="userProfile" align="center"> 
				<label style="font-size: 1.2em"><b>User Profile</b></label><button style="float:right" type="button" onclick="editMyProfile()">Edit</button>
				<form id="userProfileForm">
					<table id="userProfileTable">
						<tr><td>First Name:</td><td align="center"><input disabled="disabled" class="userProfileFields" id="userProfileFieldFirstName"  name="firstName"></td></tr>
						<tr><td>Last Name:</td><td align="center"><input disabled="disabled" class="userProfileFields" id="userProfileFieldLastName"  name="lastName"></td></tr>
						<tr><td>Date of Birth:</td><td align="center"><input disabled="disabled" class="userProfileFields" id="userProfileFieldDateOfBirth"  name="dob"></td></tr>
						<tr><td>Email id:</td><td align="center"><input disabled="disabled" class="userProfileFields" id="userProfileFieldEmail"  name="email"></td></tr>
						<tr><td>Phone No:</td><td align="center"><input disabled="disabled" class="userProfileFields" id="userProfileFieldPhone"  name="phone"></td></tr>
						<tr><td>Address:</td><td align="center"><input disabled="disabled" class="userProfileFields" id="userProfileFieldAddress"  name="address"></td></tr>
					</table>	
				</form><br>
				<button style="float:right" type="button" class="userProfileButtons" onclick="cancelEditProfile()">Cancel</button>
				<button style="float:right" type="button" class="userProfileButtons" onclick="submitMyProfile()">Submit</button><br>
			</div>
			
			<div id="tableDiv"></div>
				<table id="table">
				</table>
			<div id="pagination"></div>
			<div id="actionStatus"></div>
			
		</div>
		
	
		<div id="footer">
			Most Happy To Help You
		</div>
	
	
	</body>
</html>