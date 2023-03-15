package struts;

import java.util.Date;
import java.util.List;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import pojo.Catagory;
import pojo.RequestBook;
import pojo.ReturnedBook;
import pojo.User;
import pojo.UserActivity;
import util.HibernateUtil;
import DAO.DAO;

public class InsertBookRequest {
	private RequestBook rb=new RequestBook();
	String fillUpStatus="";
	String name;
	String description;
	Catagory catagory;
	String author;
	String edition;
	User user;
	public String execute(){
		try{
			if(fillUpStatus.equals("")){
				rb.setBookName(name);
				rb.setCatagory(catagory);
				rb.setAuthor(author);
				rb.setStatus("pending");
				rb.setEdition(edition);
				rb.setDate(new Date());
				rb.setUser(user);
				rb.setDescription(description);
				String status=DAO.updateRow(rb);
				if(status.equals("success")){
					UserActivity userActivityList=new UserActivity();
					userActivityList.setUserId(user.getUserId());
					userActivityList.setUserName(user.getFirstName()+ " "+user.getLastName());
					Session session=HibernateUtil.getSessionFactory().openSession(); 
					RequestBook xb=(RequestBook) session.createQuery("from RequestBook ORDER BY id DESC").setMaxResults(1).uniqueResult();
					userActivityList.setTransactionId(xb.getBookReqId());
					userActivityList.setTransactionType("Request Book");
					userActivityList.setDate(new Date());
					DAO.updateRow(userActivityList);
				}
				ServletActionContext.getResponse().getWriter().write(status);
			}else{
				ServletActionContext.getResponse().getWriter().write(fillUpStatus);
			}
		}catch(Exception e){
			System.out.println("Exception caught in InsertBookRequest: "+e);
		}
		return null;
	}

	public void setName(String name) {
		if(name.equals("")){
			fillUpStatus="Book name not provided";
		}else{
			this.name=name;
		}
	}

	public void setUserId(String userId) {
		if(userId.equals("")){
			fillUpStatus="Book edition not provided";
		}else{
			user=(User) DAO.getRow("User", Integer.parseInt(userId));
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
