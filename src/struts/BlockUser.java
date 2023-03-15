package struts;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

import pojo.User;
import DAO.DAO;

public class BlockUser extends ActionSupport{
	int id;
	String table;
	String status;
	public String execute(){
		User user;
		user=(User) DAO.getRow(table, id);
		try {
			if(user!=null){
				user.setActive(false);
				status=DAO.updateRow(user);
				if(status.equals("success")){
					ServletActionContext.getResponse().getWriter().write("user has been blocked successfully");
				}else{
					ServletActionContext.getResponse().getWriter().write("failed to block user");
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
