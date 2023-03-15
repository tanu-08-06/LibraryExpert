package struts;

import org.apache.struts2.ServletActionContext;

import DAO.DAO;

import com.opensymphony.xwork2.ActionSupport;

public class CountRowsInTable extends ActionSupport{
	/**
	 * author: Biswanath Das
	 */
	private static final long serialVersionUID = 1L;
	String tableName;
	int userId;
	public String execute(){
		try{
			int count;
			if(userId==0)
				count=DAO.countRows(tableName);
			else{
				count=DAO.countRowsWithId(tableName, userId);
			}
			ServletActionContext.getResponse().getWriter().write(String.valueOf(count));
		}catch(Exception e){
			System.out.println("Exception caught in CountRowsInTable: "+e);
		}
		return null;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	
}
