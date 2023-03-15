package struts;

import org.apache.struts2.ServletActionContext;

import pojo.Book;
import pojo.RequestBook;
import DAO.DAO;

import com.opensymphony.xwork2.ActionSupport;

public class ApproveNewBookRequest extends ActionSupport {
	/**
	 *  author: Biswanath Das
	 */
	private static final long serialVersionUID = 1L;
	int requestBookId;
	RequestBook requestBook;
	public String execute(){
		Book book=new Book();
		try{
			requestBook=(RequestBook) DAO.getRow("RequestBook",requestBookId);
			book.setAuthor(requestBook.getAuthor());
			book.setAvailablity(true);
			book.setCatagory(requestBook.getCatagory());
			book.setDescription(requestBook.getDescription());
			book.setEdition(requestBook.getEdition());
			book.setName(requestBook.getBookName());
			DAO.updateRow(book);
			requestBook.setStatus("approved");
			DAO.updateRow(requestBook);
			ServletActionContext.getResponse().getWriter().write("success");
		}catch(Exception e){
			System.out.println("Exception caught in ApproveNewBookRequest: "+e);
		}
		return null;
	}
	public void setRequestBookId(int requestBookId) {
		this.requestBookId = requestBookId;
	}
	
}
