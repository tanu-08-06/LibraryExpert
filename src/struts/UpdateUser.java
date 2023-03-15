package struts;

import java.util.Date;

import org.apache.struts2.ServletActionContext;

import pojo.User;
import DAO.DAO;

import com.opensymphony.xwork2.ActionSupport;
public class UpdateUser extends ActionSupport{
	/**
	 * author: Biswanath Das
	 */
	private static final long serialVersionUID = 1L;
	String fillupStatus="";
	private String firstName;
	private String lastName;
	private  Date dob;
	private String email;
	private String address;
	private long phone;
	private int userId;
	public String execute(){
		User user=(User) DAO.getRow("User",userId);
		try{
			if(fillupStatus.equals("")&&user.isActive()){
				user.setFirstName(firstName);
				user.setAddress(address);
				user.setEmail(email);
				user.setPhone(phone);
				user.setDob(dob);
				user.setLastName(lastName);
				String status=DAO.updateRow(user);
				ServletActionContext.getResponse().getWriter().write(status);
			}else{
				if(user.isActive())
					ServletActionContext.getResponse().getWriter().write(fillupStatus);
				else{
					ServletActionContext.getResponse().getWriter().write("You are currently blocked");
				}
			}
		}catch(Exception e){
			System.out.println("Exception caught in UpdateUser: "+e);
		}
		
		return null;
	}
	public void setFirstName(String firstName) {
		if(!firstName.equals("")){
			this.firstName=firstName;
		}else{
			fillupStatus="Please enter your first name";
		}
	}
	public void setUserId(int userId) {
		this.userId=userId;
	}
	public void setLastName(String lastName) {
		if(!lastName.equals("")){
			this.lastName=lastName;
		}else{
			fillupStatus="Please enter your last name";
		}
	}
		
	public void setPhone(String phone) {
		if(phone.equals("")){
			fillupStatus="Please enter phone number";
		}else{
			if(phone.length()==10){
				try{
					this.phone=(Long.parseLong(phone));
				}catch(NumberFormatException e){
					fillupStatus="Please enter a valid phone number";
				}
			}else{
				System.out.println(phone.length());
				fillupStatus="Phone number must be 10digits";
			}
			
		}
	}
	
	
	public void setEmail(String email) {
		if(!email.equals("")){
			if(email.contains("@")&&email.contains(".")){
				this.email=(email);
			}else{
				fillupStatus="Enter a valid email id";
			}
			
		}else{
			fillupStatus="Please Enter email Id";
		}
	}
	
	public void setAddress(String address) {
		if(!address.equals("")){
			this.address=address;
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
					this.dob=(date);
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
