package pojo;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;
@Entity
@Table(name="BorrowedBook")
public class BorrowedBook {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="bbId")
	private int bbId;
	@Column(name="Borrow_Date")
	private Date borrowDate;
	@Column(name="Return_Date")
	private Date returnDate;
	@OneToOne
	@JoinTable(name="User_BorrowedBooks", joinColumns={@JoinColumn(name ="bb_Id")},
	inverseJoinColumns={@JoinColumn(name ="User_Id")})
	private User user;
	@OneToOne
	@JoinTable(name="Book_BorrowedBooks", joinColumns={@JoinColumn(name ="bb_Id")},
	inverseJoinColumns={@JoinColumn(name ="Book_Id")})
	private Book book;
	@Column(name="Returned")
	private boolean returned;
	public int getBbId() {
		return bbId;
	}
	public void setBbId(int bbId) {
		this.bbId = bbId;
	}
	public Date getBorrowDate() {
		return borrowDate;
	}
	public void setBorrowDate(Date borrowDate) {
		this.borrowDate = borrowDate;
	}
	public Date getReturnDate() {
		return returnDate;
	}
	public void setReturnDate(Date returnDate) {
		this.returnDate = returnDate;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public boolean isReturned() {
		return returned;
	}
	public void setReturned(boolean returned) {
		this.returned = returned;
	}
	
	public Book getBook() {
		return book;
	}
	public void setBook(Book book) {
		this.book = book;
	}
}