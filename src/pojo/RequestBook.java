package pojo;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
@Entity
@Table(name="Request_Book")
public class RequestBook {
	@Id
	@Column(name="ID", unique = true, nullable = false)
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int bookReqId;
	@Column(name="book_name")
	private String bookName;
	@ManyToOne
	@JoinTable(name="RequestB_Catagory", joinColumns={@JoinColumn(name ="bookReq_Id")},
	inverseJoinColumns={@JoinColumn(name ="catagory_Id")})
	private Catagory Catagory;
	@ManyToOne
	@JoinTable(name="User_BookRequest", joinColumns={@JoinColumn(name ="bookReq_Id")},
	inverseJoinColumns={@JoinColumn(name ="User_Id")})
	private User user;
	@Column(name="Description")
	private String Description;
	@Column(name="Edition")
	private String edition;
	@Column(name="Author")
	private String author;
	@Column(name="Date")
	private Date date;
	@Column(name="Status")
	private String status;
	public int getBookReqId() {
		return bookReqId;
	}
	public void setBookReqId(int bookReqId) {
		this.bookReqId = bookReqId;
	}
	public Catagory getCatagory() {
		return Catagory;
	}
	public void setCatagory(Catagory catagory) {
		Catagory = catagory;
	}
	public String getEdition() {
		return edition;
	}
	public void setEdition(String edition) {
		this.edition = edition;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getBookName() {
		return bookName;
	}
	public void setBookName(String bookName) {
		this.bookName = bookName;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
