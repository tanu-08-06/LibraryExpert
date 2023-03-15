package struts;

import java.io.IOException;

import org.apache.struts2.ServletActionContext;
import DAO.DAO;
import com.opensymphony.xwork2.ActionSupport;
public class RemoveRow extends ActionSupport{
	private static final long serialVersionUID = 1L;
	int id;
	String table;
	String status;
	public String execute(){
		Object obj;
		obj=DAO.getRow(table, id);
		try {
			if(obj!=null){
				status=DAO.removeRow(obj);
				if(status.equals("success")){
					ServletActionContext.getResponse().getWriter().write("Successfully deleted");
				}else{
					ServletActionContext.getResponse().getWriter().write("Failed to delete");
				}
			}else{
				ServletActionContext.getResponse().getWriter().write("row not found");
			}
		} catch (IOException e) {
			System.out.println(e);
			e.printStackTrace();
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
