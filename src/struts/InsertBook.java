package struts;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import pojo.Book;
import pojo.Catagory;
import pojo.Stream;
import util.HibernateUtil;
import DAO.DAO;

import com.opensymphony.xwork2.ActionSupport;

public class InsertBook extends ActionSupport {
	/**
	 *  author: Indrajit Mondal
	 */
	private static final long serialVersionUID = 1L;
	private Book book=new Book();
	String fillUpStatus="";
	
	public String execute(){
		try{
			if(fillUpStatus.equals("")){
				book.setAvailablity(true);
				String status=DAO.updateRow(book);
				ServletActionContext.getResponse().getWriter().write(status);
			}else{
				ServletActionContext.getResponse().getWriter().write(fillUpStatus);
			}
		}catch(Exception e){
			System.out.println("Exception caught in InsertBook: "+e);
		}
		return null;
	}

	public void setBookId(String bookId) {
		if(!bookId.equals("")){
			book.setBookId(Integer.parseInt(bookId));
		}
	}

	public void setName(String name) {
		if(name.equals("")){
			fillUpStatus="Book name not provided";
		}else{
			book.setName(name);
		}
	}

	public void setAuthor(String author) {
		if(author.equals("")){
			fillUpStatus="Book author not provided";
		}else{
			book.setAuthor(author);
		}
	}

	
	public void setEdition(String edition) {
		if(edition.equals("")){
			fillUpStatus="Book edition not provided";
		}else{
			book.setEdition(edition);
		}
	}
	
	public void setDescription(String description) {
		if(description.equals("")){
			fillUpStatus="Book description not provided";
		}else{
			book.setDescription(description);
		}
	}
	
	public void setCatagory(String catagory) {
		if(catagory.equals("")){
			fillUpStatus="Book catagory not provided";
		}else{
			Session session=HibernateUtil.getSessionFactory().openSession();
			Criteria crit=session.createCriteria(Catagory.class);
			crit.add(Restrictions.eq("catagoryName", catagory));
			List<?> catagoryList=crit.list();
			if(catagoryList.size()==0){
				fillUpStatus="Invalid Catagory Name";
			}else{
				book.setCatagory((Catagory) catagoryList.get(0));
			}
		}
	
	}
	public void setStream(String stream) {
		List<Stream> s=new ArrayList();
		if(stream.equals("")){
			fillUpStatus="Book Stream not provided";
		}else{
			String arr[]=stream.split(", ");
			Session session=HibernateUtil.getSessionFactory().openSession();
			for(int i=0;i<arr.length;i++){
				Criteria crit=session.createCriteria(Stream.class);
				crit.add(Restrictions.eq("streamName", arr[i]));
				List<?> streamList=crit.list();
				if(streamList.size()==0){
					fillUpStatus="Invalid Stream Name";
				}else{
					s.add((Stream) streamList.get(0));
				}
			}
			book.setStream(s);
		}
	
	}
	
}
