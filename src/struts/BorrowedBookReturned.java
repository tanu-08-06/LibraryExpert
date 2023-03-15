package struts;

import java.util.Date;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Session;

import pojo.Book;
import pojo.BorrowedBook;
import pojo.ReturnedBook;
import pojo.UserActivity;
import util.HibernateUtil;
import DAO.DAO;

import com.opensymphony.xwork2.ActionSupport;

public class BorrowedBookReturned extends ActionSupport {
	int borrowedBookId;
	ReturnedBook rb=new ReturnedBook();
	public String execute(){
		try{
			BorrowedBook bb=(BorrowedBook) DAO.getRow("BorrowedBook",borrowedBookId);
			Book book=(Book) DAO.getRow("Book", bb.getBook().getBookId());
			book.setAvailablity(true);
			DAO.updateRow(book);
			rb.setBookId(bb.getBook().getBookId());
			rb.setBookName(bb.getBook().getName());
			rb.setBorrowedDate(bb.getBorrowDate());
			rb.setReturnedDate(new Date());
			rb.setUserId(bb.getUser().getUserId());
			rb.setUserName(bb.getUser().getUserName());
			String status=DAO.updateRow(rb);
			if(status.equals("success")){
				UserActivity userActivityList=new UserActivity();
				userActivityList.setUserId(bb.getUser().getUserId());
				userActivityList.setUserName(bb.getUser().getFirstName()+ " "+bb.getUser().getLastName());
				Session session=HibernateUtil.getSessionFactory().openSession(); 
				ReturnedBook xb=(ReturnedBook) session.createQuery("from ReturnedBook ORDER BY id DESC").setMaxResults(1).uniqueResult();
				userActivityList.setTransactionId(xb.getRbId());
				userActivityList.setTransactionType("Returned Book");
				userActivityList.setDate(new Date());
				DAO.removeRow(bb);
				DAO.updateRow(userActivityList);
			}
			ServletActionContext.getResponse().getWriter().write(status);
		}catch(Exception e){
			System.out.println("Exception caught in BorrowedBookReturned: "+e);
		}
		return null;
	}
	public void setBorrowedBookId(int borrowedBookId) {
		this.borrowedBookId = borrowedBookId;
	}
	
}
