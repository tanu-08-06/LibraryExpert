function showSignUpDiv(){
	$("#loginDiv").hide();
	$("#signUpDiv").slideDown(500);
}
function hideSignUpDiv(){
	$("#authenticationFailedStatus").text("");
	$("#loginDiv").slideDown(600);
	$("#signUpDiv").hide();
}
function showHome(){
	$("#section>*").hide();
	$("#home").slideDown();
}
function showBooks(){
	$("#section>div").hide();
	$("#showBooks").show();
}
function showAboutUs(){
	$("#section>*").hide();
	$("#aboutUs").show();
}
function showComplain(){
	$("#section>*").hide();
	$("#userComplain").show();
}
function showBookRequest(){
	$("#section>*").hide();
	$("#bookRequest").show();
}
function showContactUs(){
	$("#section>*").hide();
	$("#contactUs").show();
}

function showLoginDiv(){
	$("#loginDiv").slideDown();
	$("#signUpDiv").hide();
}
function showUnregisteredUserTable(){
	getUnregisteredUserList(1,"");
	var count=countUnregisteredUserRows();
	$("#pagination").pagination('updateItems', count);

}
function showUserTable(){
	getUserList(1,"");
	var count=countUserRows();
	$("#pagination").pagination('updateItems', count);
}
function showComplainDetailsTable(){
	getComplainDetailsList(1,"");
	var count=countComplainDetailsRows();
	$("#pagination").pagination('updateItems', count);
}
function showBookTable(){
	getBookList(1,"");
	var count=countBookRows();
	$("#pagination").pagination('updateItems', count);
}
function showAdminBookTable(){
	getAdminBookList(1,"");
	var count=countBookRows();
	$("#pagination").pagination('updateItems', count);
}
function showUserActivityTable(){
	getUserActivityList(1,"");
	var count=countUserActivityRows();
	$("#pagination").pagination('updateItems', count);
}
function showBorrowedBookTable(){
	getBorrowedBookList(1,"");
	var count=countBorrowedBookRows();
	$("#pagination").pagination('updateItems', count);
}
function showReturnedBookTable(){
	getReturnedBookList(1,"");
	var count=countReturnedBookRows();
	$("#pagination").pagination('updateItems', count);
}
function showRequestedBookTable(){
	getRequestBookList(1,"");
	var count=countRequestBookRows();
	$("#pagination").pagination('updateItems', count);
}
function showMyBorrowedBookTable(){
	getMyBorrowedBookList(1,"");
	var count=countMyBorrowedBookRows();
	$("#pagination").pagination('updateItems', count);
}
function showMyRequestBookTable(){
	getMyRequestBookList(1,"");
	var count=countRequestBookRows();
	$("#pagination").pagination('updateItems', count);
}function showMyComplainTable(){
	getMyComplainDetailsList(1,"");
	var count=countMyComplainDetailsRows();
	$("#pagination").pagination('updateItems', count);
}
function showBookOnStream(stream){
	getBookFromStreamList(1,"",stream);
	var count=countMyComplainDetailsRows(stream);
	$("#pagination").pagination('updateItems', count);
}
function showAdvanceSearch(){
	$("#section>*").hide();
	$("#advanceSearch").slideDown();
}