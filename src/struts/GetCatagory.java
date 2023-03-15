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
import util.HibernateUtil;
import util.JsonUtil;

import com.opensymphony.xwork2.ActionSupport;

public class GetCatagory extends ActionSupport {
	String q;
	String callback;
	private List<String> s=new ArrayList();
	public String execute(){
		try{
			Session session=HibernateUtil.getSessionFactory().openSession();
			Query query=session.createQuery("from Catagory p where p.catagoryName like '%"+q+"%'");
			List<Catagory> res=query.list();
			for(Catagory c:res){
				String str=c.getCatagoryName();
				s.add(str);
				System.out.println(str);
			}
	
			ServletActionContext.getResponse().getWriter().write(callback+"("+(JsonUtil.convertObjectToJson(s))+")");
		}catch(Exception e){
			System.out.println("Exception caught in GetCatagory: "+e);
		}
		return null;
	}
	public void setQ(String q){
		q=(q).toUpperCase();
		this.q=q;
	}
	public void setCallback(String callback){
		this.callback=callback;
	} 
}
