package struts;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

import pojo.User;
import DAO.DAO;

public class UnblockUser extends ActionSupport{
	int id;
	String table;
	String status;
	public String execute(){
		User user;
		user=(User) DAO.getRow(table, id);
		try {
			if(user!=null){
				user.setActive(true);
				status=DAO.updateRow(user);
				if(status.equals("success")){
					ServletActionContext.getResponse().getWriter().write("user has been activated successfully");
				}else{
					ServletActionContext.getResponse().getWriter().write("failed to activate user");
				}
			}
		}catch(Exception e){
			System.out.println("Exception caught in blockUser "+e);
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
