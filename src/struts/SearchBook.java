package struts;

import java.util.List;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import pojo.Book;
import pojo.Catagory;
import util.HibernateUtil;
import util.JsonUtil;

public class SearchBook {
	private String name;
	private String author;
	private String edition;
	private String catagory;
	private String stream="";
	private String fillUpStatus="";
	Session session=HibernateUtil.getSessionFactory().openSession();
	Criteria c=session.createCriteria(Book.class);
	public String execute(){
		
		try{
			if(fillUpStatus.equals("")){
				ServletActionContext.getResponse().getWriter().write("Please enter atleast one Field");
			}else{
				
				String sql;
			//	sql="from Book book join book.stream s join book.catagory c where ";
				sql="from Book book join book.stream s where ";
				if(!(stream.equals(""))){
					sql=sql+"s.streamName='"+stream+"'";
				}else{
					sql=sql+"s.streamName like '%_%'";
				}
				if(!(catagory==null)){
				//	sql=sql+" and c.catagoryName='"+catagory+"'";
					sql=sql+" and book.catagory.catagoryName='"+catagory+"'";
				}
				if(!(name==null)){
					sql=sql+" and name='"+name+"'";
				}
				if(!(author==null)){
					sql=sql+" and author='"+author+"'";
				}
				if(!(edition==null)){
					sql=sql+" and edition="+ (edition);
				}
				Query query=session.createQuery(sql);
				List<Book> bookList=query.list();
				System.out.println(bookList);
				if(bookList.size()!=0){
					ServletActionContext.getResponse().getWriter().write(JsonUtil.convertObjectToJson(bookList));
				}else{
					ServletActionContext.getResponse().getWriter().write("failed");
				}
			}
		}catch(Exception e){
			System.out.println("Exception caught in SearchBook: "+e);
		}
		return null;
	}
	public void setName(String name) {
		if(!name.equals("")){
		//	c.add(Restrictions.ilike("name", name));
			this.name=name;
			fillUpStatus="name";
		}
	}

	public void setAuthor(String author) {
		if(!author.equals("")){
		//	c.add(Restrictions.ilike("author", author));
			this.author=author;
			fillUpStatus="author";
		}
	}

	
	public void setEdition(String edition) {
		if(!edition.equals("")){
			//c.add(Restrictions.ilike("edition", edition));
			this.edition=edition;
			fillUpStatus="edition";
		}	
	}
	public void setStream(String stream) {
		if(!stream.equals("")){
			//c.add(Restrictions.ilike("edition", edition));
			this.stream=stream;
			fillUpStatus="stream";
		}	
	}
	public void setCatagory(String catagory) {
		if(!catagory.equals("")){
		/*	fillUpStatus="Book catagory not provided";
			Criteria crit=session.createCriteria(Catagory.class);
			crit.add(Restrictions.eq("catagoryName", catagory));
			List<?> catagoryList=crit.list();
			if(catagoryList.size()==0){
				fillUpStatus="Invalid Catagory Name";
			}else{
				this.catagory=((Catagory) catagoryList.get(0));
			}
		*/
			this.catagory=catagory;
			fillUpStatus="catagory";
		}
	
	}	
}

