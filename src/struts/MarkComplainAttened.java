package struts;

import org.apache.struts2.ServletActionContext;

import pojo.ComplainDetails;
import DAO.DAO;

import com.opensymphony.xwork2.ActionSupport;

public class MarkComplainAttened extends ActionSupport{
	private static final long serialVersionUID = 1L;
	int id;
	public String execute(){
		try{
			ComplainDetails cd=(ComplainDetails) DAO.getRow("ComplainDetails",id);
			cd.setStatus(true);
			String status=DAO.updateRow(cd);
			ServletActionContext.getResponse().getWriter().write(status);
		}catch(Exception e){
			System.out.println("Exception caught in MarkComplainAttened :"+e);
		}
		return null;
	}
	public void setId(int id) {
		this.id = id;
	}
	
}
