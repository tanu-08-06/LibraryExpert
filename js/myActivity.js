function showMyProfile(){
	$("#section>*").hide();
	$("#userProfile").slideDown();
	var xmlhttp = new XMLHttpRequest();
	var url = "fetchRow.action";
	var param="Id="+$("#userId").text()+"&Table=User";
	xmlhttp.onreadystatechange = function(){
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    		var response=JSON.parse(xmlhttp.responseText);
	    		$("#userProfileFieldFirstName").val(response.firstName);
	    		$("#userProfileFieldLastName").val(response.lastName);
	    		$("#userProfileFieldDateOfBirth").val(dateFormat(response.dob));
	    		$("#userProfileFieldEmail").val(response.email);
	    		$("#userProfileFieldPhone").val(response.phone);
	    		$("#userProfileFieldAddress").val(response.address);
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
function editMyProfile(){
    $('.userProfileFields').prop('disabled', false);
    $('.userProfileButtons').show();
}
function cancelEditProfile(){
	$('.userProfileButtons').hide();
	$('.userProfileFields').prop('disabled', true);
	showHome();
}
function submitMyProfile(){
	var xmlhttp = new XMLHttpRequest();
	var url = "updateUser.action";
	var param=$("#userProfileForm").serialize()+"&userId="+$("#userId").text();
	xmlhttp.onreadystatechange = function(){
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    		var response=(xmlhttp.responseText);
	    		if(response=="success"){
	    			showHome();
	    			window.alert("Your Profile has been updated successfully");
	    		}else{
	    			window.alert(response);
	    		}
	    }
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(param);
}
