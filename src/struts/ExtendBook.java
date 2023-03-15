package struts;

import org.apache.struts2.ServletActionContext;

import pojo.BorrowedBook;
import util.DateUtil;
import DAO.DAO;
import com.opensymphony.xwork2.ActionSupport;
public class ExtendBook extends ActionSupport{

	private static final long serialVersionUID = 1L;
	int borrowedBookId;
	public String execute(){
		try{
			BorrowedBook bb=(BorrowedBook) DAO.getRow("BorrowedBook",borrowedBookId);
			bb.setReturnDate(DateUtil.addDate(bb.getReturnDate(),1));
			String status=DAO.updateRow(bb);
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
