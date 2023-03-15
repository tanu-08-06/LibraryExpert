
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<link rel="stylesheet" href="plugins/datePicker/jquery-ui.css">
<script src="plugins/datePicker/jquery-1.10.2.js"></script>
<script src="plugins/datePicker/jquery-ui.js"></script>
<script>
	$(function() {
		$("#datepicker").datepicker({
			changeMonth : true,
			changeYear : true,
			yearRange : "c-40:c+17"
		});
	});
</script>

<link rel="stylesheet" href="LE.css">

<script src="js/ShowDiv.js"></script>
<script src="js/unregisteredUser.js"></script>

</head>
<body>
	<div id="loginDiv" align="center">

		<h1 id="loginHeader">LibraryExpert Login Page</h1>

		<form id="login_New" action="LibraryExpert.jsp" method="post">
			<table>
				<tr>
					<td>Username:</td>
					<td><input style="margin-bottom: 10px" type=text
						name="username" id="userid"></td>
				</tr>
				<tr>
					<td>Password:</td>
					<td><input style="margin-bottom: 10px" type="password"
						name="password" id="pwd"></td>
				</tr>
			</table>
			
			<p align="center">
				<button onclick="activateAuthenticationstatus()" style="margin-right: 10px; width: 100px" type="submit">Sign-In</button>
			
				<button style="width: 100px" type="button"
				 onclick="showSignUpDiv()">Sign-Up</button>
			</p>
			<p align="right" id="registrationStatus" style="color: green"></p>
			<% if(request.getAttribute("status")!=null){ %>
			<p align="right" id="authenticationFailedStatus" style="color: red"><%= request.getAttribute("status") %></p>
			<% } %>
			</form>
	</div>
	<div id="signUpDiv" align="center">
		<h2 id="signUpFormHeader" align="center">Please Enter the following details:</h2>
		<form id="signUpForm" method="post" onsubmit="return false">

			<table align="center">
				<tr>
					<td class="label">*UserName:</td>
					<td><input name="UserName" type="text"></td>
				</tr>
				<tr>
					<td class="label">*Password:</td>
					<td><input name="Password" type="password"></td>
				</tr>
				<tr>
					<td class="label">*Confirm Password:</td>
					<td><input name="ConfirmPwd" type="password"></td>
				</tr>
				<tr>
					<td class="label">*First Name:</td>
					<td><input name="FirstName" type="text"></td>
				</tr>
				<tr>
					<td class="label">*Last Name:</td>
					<td><input name="LastName" type="text"></td>
				</tr>
				<tr>
					<td class="label">*Date Of Birth:</td>
					<td><input id="datepicker" name="Dob" type="text"></td>
				</tr>
				<tr>
					<td class="label">*Phone:</td>
					<td><input name="Phone" type="text"></td>
				</tr>
				<tr>
					<td class="label">*Email:</td>
					<td><input name="Email" type="text"></td>
				</tr>
				<tr>
					<td class="label">*Address:</td>
					<td><input name="Address" type="text"></td>
				</tr>
			</table>
			<p align="center">
				<button type="submit" onclick="registerMe()"
					style="margin-right: 10px">Save</button>
				<button onclick="hideSignUpDiv()">Cancel</button>
			</p>
			<p align="center" id="signUpStatus" style="color: red"></p>
		</form>

	</div>

</body>
</html>