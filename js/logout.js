function logoutUser(){
	var xmlhttp = new XMLHttpRequest();
	var url = "logout.action";
	xmlhttp.onreadystatechange = function(){
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				window.location.replace("http://localhost:8070/LibraryExpert/Login.jsp");
				window.alert("Logout Successful");
		
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.setRequestHeader("Content-type","application/json");
	xmlhttp.send();
}