package struts;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;

import pojo.Stream;
import util.HibernateUtil;
import util.JsonUtil;

public class CountBooksInStream {
	String stream;
	public String execute(){
		try{
			Session session=HibernateUtil.getSessionFactory().openSession();
			Query q=session.createQuery("from Stream where streamName='"+stream+"'");
			Stream stream=(Stream) q.list().get(0);
			ServletActionContext.getResponse().getWriter().write(JsonUtil.convertObjectToJson(stream.getBook()));
		}catch(Exception e){
			System.out.println("Exception caught in CountBooksInStream :"+e);
		}
		
		return null;
		
	}

	public void setStream(String stream) {
		this.stream = stream;
	}
	
}
