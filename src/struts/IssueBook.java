package struts;

import java.util.Date;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Session;

import pojo.Book;
import pojo.BorrowedBook;
import pojo.ComplainDetails;
import pojo.User;
import pojo.UserActivity;
import util.DateUtil;
import util.HibernateUtil;
import DAO.DAO;

import com.opensymphony.xwork2.ActionSupport;
public class IssueBook extends ActionSupport{
	int bookId;
	int userId;
	public String execute(){
		try{
			User user=(User)DAO.getRow("User",userId);
			if(user.isActive()){
				Book book=(Book)DAO.getRow("Book", bookId);
				BorrowedBook bBook=new BorrowedBook();
				bBook.setBook(book);
				bBook.setUser(user);
				Date borrowDate=new Date();
				Date returnDate=new Date();
				bBook.setBorrowDate(borrowDate);
				bBook.setReturnDate(DateUtil.addDate(returnDate, 1));
				bBook.setReturned(false);
				String status=DAO.updateRow(bBook);
				if(status.equals("success")){
					UserActivity userActivityList=new UserActivity();
					userActivityList.setUserId(userId);
					userActivityList.setUserName(user.getFirstName()+ " "+user.getLastName());
					System.out.println(bookId);
					Session session=HibernateUtil.getSessionFactory().openSession(); 
					BorrowedBook bb=(BorrowedBook) session.createQuery("from BorrowedBook ORDER BY id DESC").setMaxResults(1).uniqueResult();
					userActivityList.setTransactionId(bb.getBbId());
					userActivityList.setTransactionType("Issue Book");
					userActivityList.setDate(new Date());
					status=DAO.updateRow(userActivityList);
					if(status.equals("success")){
						book.setAvailablity(false);
						DAO.updateRow(book);
						ServletActionContext.getResponse().getWriter().write("Book issued successfully");
					}else{
						DAO.removeRow(bBook);
						ServletActionContext.getResponse().getWriter().write("Failed to issue book");
					}
				}
			}else{
				ServletActionContext.getResponse().getWriter().write("You are currently blocked, you can't issue book");
			}
		}catch(Exception e){
			System.out.println("Exception caught in IssueBook :"+e);
		}
		return null;
	}
	public int getBookId() {
		return bookId;
	}
	public void setBookId(int bookId) {
		this.bookId = bookId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
}