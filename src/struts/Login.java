package struts;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import pojo.User;
import DAO.UserDAO;

import com.opensymphony.xwork2.ActionSupport;

public class Login extends ActionSupport {
	String userName;
	String password;
	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		User user=UserDAO.validateUser(userName, password);
		if(user==null){
			ServletActionContext.getResponse().getWriter().write("failed");
			return null;
		}else{
			HttpServletRequest request=ServletActionContext.getRequest();  
			HttpSession session=request.getSession();  
			return SUCCESS;
		}
		
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
}
