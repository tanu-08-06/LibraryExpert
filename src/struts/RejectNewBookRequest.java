package struts;

import org.apache.struts2.ServletActionContext;

import pojo.RequestBook;
import DAO.DAO;

import com.opensymphony.xwork2.ActionSupport;

public class RejectNewBookRequest extends ActionSupport {
	/**
	 *  author: Biswanath Das
	 */
	private static final long serialVersionUID = 1L;
	int requestBookId;
	RequestBook requestBook;
	public String execute(){
		try{
			requestBook=(RequestBook) DAO.getRow("RequestBook",requestBookId);
			requestBook.setStatus("rejected");
			DAO.updateRow(requestBook);
			ServletActionContext.getResponse().getWriter().write("success");
		}catch(Exception e){
			System.out.println("Exception caught in RejectNewBookRequest: "+e);
		}
		return null;
	}
	public void setRequestBookId(int requestBookId) {
		this.requestBookId = requestBookId;
	}
	
}