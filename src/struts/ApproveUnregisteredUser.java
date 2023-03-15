package struts;

import org.apache.struts2.ServletActionContext;

import pojo.UnregisteredUser;
import pojo.User;
import DAO.DAO;

import com.opensymphony.xwork2.ActionSupport;

public class ApproveUnregisteredUser extends ActionSupport {
	int id;
	String table;
	String status;
	public String execute(){
		try{
			UnregisteredUser uUser=(UnregisteredUser) DAO.getRow(table, id);
			User user=new User();
			user.setFirstName(uUser.getFirstName());
			user.setLastName(uUser.getLastName());
			user.setUserName(uUser.getUserName());
			user.setDob(uUser.getDob());
			user.setAddress(uUser.getAddress());
			user.setActive(true);
			user.setPassword(uUser.getPassword());
			user.setPhone(uUser.getPhone());
			user.setEmail(uUser.getEmail());
			user.setType(uUser.getType());
			status=DAO.updateRow(user);
			if(status.equals("success")){
				DAO.removeRow(uUser);
				ServletActionContext.getResponse().getWriter().write("User has been approved");
			}
		}catch(Exception e){
			System.out.println("Exception caught in Approove UnregisteredUser: "+e);
		}
		return null;
	
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setTable(String table) {
		this.table = table;
	}
	
}
