package struts;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import pojo.AutoComplete;
import pojo.Book;
import pojo.Catagory;
import pojo.Stream;
import util.HibernateUtil;
import util.JsonUtil;

import com.opensymphony.xwork2.ActionSupport;

public class GetStream extends ActionSupport {
	String term;
	public String execute(){
		List<StreamObject> object=new ArrayList<StreamObject>();
		
		try{
			Session session=HibernateUtil.getSessionFactory().openSession();
			Query query=session.createQuery("from Stream s where s.streamName like '%"+term+"%'");
			List<Stream> stream=query.list();
			for(Stream s:stream){
				StreamObject obj=new StreamObject();
				obj.setId(s.getStreamId());
				obj.setLabel((s.getStreamName()).toUpperCase());
				obj.setValue((s.getStreamName()).toUpperCase());
				System.out.println(obj.getLabel());
				object.add(obj);
			}
	
			ServletActionContext.getResponse().getWriter().write(JsonUtil.convertObjectToJson(object));
		}catch(Exception e){
			System.out.println("Exception caught in GetCatagory: "+e);
		}
		return null;
	}
	public String getTerm() {
		return term;
	}
	public void setTerm(String term) {
		this.term = term;
	}
}
class StreamObject{
	int id;
	String label;
	String value;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
}