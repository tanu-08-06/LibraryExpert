package pojo;

import java.util.List;

public class DTO {
	private List<Object> objList;
	public DTO(List<Object> objList){
		this.objList=objList;
	}
	public List<Object> getObjList() {
		return objList;
	}
	public void setObjList(List<Object> objList) {
		this.objList = objList;
	}
	
}
