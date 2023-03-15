package struts;

import java.io.IOException;
import java.util.List;

import org.apache.struts2.ServletActionContext;

import pojo.DTO;
import util.JsonUtil;
import DAO.DAO;

import com.opensymphony.xwork2.ActionSupport;
public class TableAccess extends ActionSupport{
	int pageNumber;
	int userId;
	String tableName;
	public String execute() {
		List<Object> objectList=null;
		try {
			if(userId==0)
				objectList=(List<Object>) DAO.getRows(tableName,pageNumber);
			else
				objectList=(List<Object>) DAO.getRowsWithId(tableName,pageNumber,userId);
		
			ServletActionContext.getResponse().getWriter().write(JsonUtil.convertObjectToJson(new DTO(objectList)) );
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
		
	}
	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	
}
