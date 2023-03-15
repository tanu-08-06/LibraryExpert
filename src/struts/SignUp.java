package struts;
import java.util.Date;

import org.apache.struts2.ServletActionContext;

import pojo.UnregisteredUser;
import DAO.DAO;
import DAO.UserDAO;

import com.opensymphony.xwork2.ActionSupport;
public class SignUp extends ActionSupport {
	private static final long serialVersionUID = -8693197655762963480L;
	String confirmPwd; //For confirming password.
	String status="";  //to load database save status.
	String fillupStatus="";
	UnregisteredUser user=new UnregisteredUser();
	public String execute() {
		try{
			String checkUser=UserDAO.userCheck(user.getUserName()); 
			if(fillupStatus.equals("")&&checkUser.equals("not found")){
				if(!user.getPassword().equals(confirmPwd)){
					
					fillupStatus="Passwords do not match";
					ServletActionContext.getResponse().getWriter().write(fillupStatus);
					
				}
				else{
					user.setType("user");
					status=DAO.updateRow(user);

					if(status.equals("success")){
						ServletActionContext.getResponse().getWriter().write(status);
					}else{
						ServletActionContext.getResponse().getWriter().write(status);
					}

				}
			}else{
				if(!fillupStatus.equals("")){
					ServletActionContext.getResponse().getWriter().write(fillupStatus);
				}else{
					if(checkUser.equals("found")){
						ServletActionContext.getResponse().getWriter().write("This user name is already occupied");
					}else{
						ServletActionContext.getResponse().getWriter().write("Unable to register, due to some problem");
					}
				}
				
			}
			return null;
		}catch(Exception e){
			System.out.println("Exception Caught in SignUp.Action: "+e);
			return null;
		}
		
	}
	public void setUserName(String userName) {
		if(!userName.equals("")){
			user.setUserName(userName);
		}else{
			fillupStatus="Please enter your user name";
		}
	}

	public void setFirstName(String firstName) {
		if(!firstName.equals("")){
			user.setFirstName(firstName);
		}else{
			fillupStatus="Please enter your first name";
		}
	}
	
	public void setLastName(String lastName) {
		if(!lastName.equals("")){
			user.setLastName(lastName);
		}else{
			fillupStatus="Please enter your last name";
		}
	}
	
	public void setPassword(String password) {
		if(!password.equals("")){
			if(password.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$")) {
				user.setPassword(password);
			}else {
				fillupStatus="Must be 8 digits long. Must contain a special character and alphanumeric. Must contain uppercase and lower case.";
			}
		}else{
			fillupStatus="Please Enter a password";
		}
		
	}
			
	public void setPhone(String phone) {
		if(phone.equals("")){
			fillupStatus="Please enter phone number";
		}else{
			if(phone.length()==10){
				try{
					user.setPhone(Long.parseLong(phone));
				}catch(NumberFormatException e){
					fillupStatus="Please enter a valid phone number";
				}
			}else{
				System.out.println(phone.length());
				fillupStatus="Phone number must be 10digits";
			}
			
		}
	}
	
	
	public void setConfirmPwd(String confirmPwd) {
		if(!confirmPwd.equals("")){
			this.confirmPwd=confirmPwd;
		}else{
			fillupStatus="Please enter confirm password";
		}
	}

	public void setEmail(String email) {
		if(!email.equals("")){
			if(email.contains("@")&&email.contains(".")){
				user.setEmail(email);
			}else{
				fillupStatus="Enter a valid email id";
			}
			
		}else{
			fillupStatus="Please Enter email Id";
		}
	}
	
	public void setAddress(String address) {
		if(!address.equals("")){
			user.setAddress(address);
		}else{
			fillupStatus="Please enter address";
		}
		 
	}
	@SuppressWarnings("deprecation")
	public void setDob(String dob){
		if(!dob.equals("")){
			String arr[]=dob.split("/");
			if(arr.length==3){
				Date date=new Date();
				try{
					if(date.getYear()-(Integer.parseInt(arr[2])-1900)<18){
						System.out.println(date.getYear()-(Integer.parseInt(arr[2])-1900));
						fillupStatus="You must be 18 years old";
					}
					date.setMonth(Integer.parseInt(arr[0])-1);
					date.setDate(Integer.parseInt(arr[1]));
					date.setYear(Integer.parseInt(arr[2])-1900);
					user.setDob(date);
					System.out.println(date.getYear()-(Integer.parseInt(arr[2])-1900));
				}catch(Exception e){
					fillupStatus="Please enter a valid date";
				}
				
			}else{
				fillupStatus="Please enter a valid date";
			}
		}else{
			fillupStatus="Please Enter a date";
		}
	}
	
}
