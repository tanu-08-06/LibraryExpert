package struts;
import org.apache.struts2.ServletActionContext;

import util.JsonUtil;
import DAO.DAO;

import com.opensymphony.xwork2.ActionSupport;
public class FetchRow extends ActionSupport {
	/**
	 * author: Biswanath Das
	 */
	private static final long serialVersionUID = 1L;
	String table;
	int id;
	public String execute(){
		try{
			Object obj=DAO.getRow(table,id);
			ServletActionContext.getResponse().getWriter().write(JsonUtil.convertObjectToJson(obj));
		}catch(Exception e){
			System.out.println("Exception caught in FetchRow: "+e);
		}
		return null;
	}
	public void setTable(String table) {
		this.table = table;
	}
	public void setId(int id) {
		this.id = id;
	}
	
}
