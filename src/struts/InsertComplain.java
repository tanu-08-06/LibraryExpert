package struts;
import java.util.Date;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Session;

import pojo.ComplainDetails;
import pojo.User;
import pojo.UserActivity;
import util.HibernateUtil;
import DAO.DAO;

import com.opensymphony.xwork2.ActionSupport;
public class InsertComplain extends ActionSupport{
	private static final long serialVersionUID = 1L;
	//private static final long serialVersionUID = 1L;
	ComplainDetails complainDetails=new ComplainDetails();
	String status;
	String complain;
	String name;
	Integer userId;
	String fillUpStatus="";
	public String execute() {
		try{
			User user=(User) DAO.getRow("User", userId);
			complainDetails.setComplain(complain);
			complainDetails.setDate(new Date());
			complainDetails.setName(name);
			complainDetails.setUser(user);
			complainDetails.setStatus(false);
			status=DAO.updateRow(complainDetails);
			UserActivity ua=new UserActivity();
			ua.setDate(new Date());
			ua.setUserId(userId);
			ua.setTransactionType("Complain");
			ua.setUserName(user.getFirstName()+" "+user.getLastName());
			if(status.equals("success")){
				Session session=HibernateUtil.getSessionFactory().openSession(); 
				ComplainDetails cd=(ComplainDetails) session.createQuery("from ComplainDetails ORDER BY id DESC")
                 .setMaxResults(1)
                 .uniqueResult();
				ua.setTransactionId(cd.getComplainId());
				DAO.updateRow(ua);
			}
			ServletActionContext.getResponse().getWriter().write(status);
	
		}catch(Exception e){
			System.out.println("Exception in InsertNewRow "+e);
		}
		return null;
	}
	public void setComplain(String complain) {
		if(!complain.equals(""))
			this.complain = complain;
		else{
			fillUpStatus="Please enter Description";
		}
	}
	public void setName(String name) {
		if(!name.equals(""))
			this.name = name;
		else
			fillUpStatus="Please enter name";
	}
	
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	
	
}
	
