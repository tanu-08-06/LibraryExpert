package struts;
import java.util.List;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import pojo.Book;
import pojo.Catagory;
import util.HibernateUtil;
import DAO.DAO;

import com.opensymphony.xwork2.ActionSupport;
public class UpdateBook extends ActionSupport {
	private static final long serialVersionUID = 1L;
	Book book;
	private String fillUpStatus="";
	private int bookId;
	private String name;
	private String author;
	private String edition;
	private String description;
	private Catagory catagory;
	public String execute(){
		try{
			if(fillUpStatus.equals("")){
				book=(Book) DAO.getRow("Book",bookId);
				book.setAuthor(author);
				book.setCatagory(catagory);
				book.setDescription(description);
				book.setEdition(edition);
				book.setName(name);
				String status=DAO.updateRow(book);
				ServletActionContext.getResponse().getWriter().write(status);
			}else{
				ServletActionContext.getResponse().getWriter().write(fillUpStatus);
			}
		}catch(Exception e){
			System.out.println("Exception caught in UpdateBook: "+e);
		}
		return null;
	}
	public void setBookId(String bookId) {
		System.out.println(bookId);
		if(!bookId.equals("")){
			this.bookId=(Integer.parseInt(bookId));
		}else{
			fillUpStatus="Id missing";
		}
	}

	public void setName(String name) {
		if(name.equals("")){
			fillUpStatus="Book name not provided";
		}else{
			this.name=name;
		}
	}

	public void setAuthor(String author) {
		if(author.equals("")){
			fillUpStatus="Book author not provided";
		}else{
			this.author=author;
		}
	}

	
	public void setEdition(String edition) {
		if(edition.equals("")){
			fillUpStatus="Book edition not provided";
		}else{
			this.edition=edition;
		}
	}
	
	public void setDescription(String description) {
		if(description.equals("")){
			fillUpStatus="Book description not provided";
		}else{
			this.description=description;
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
				this.catagory=((Catagory) catagoryList.get(0));
			}
		}
	
	}	
}
