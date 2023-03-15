package pojo;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
@Entity
@Table(name="Book")
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="book_Id")
	private int bookId;
	@Column(name="name")
	private String name;
	@Column(name="author")
	private String author;
	@Column(name="edition")
	private String edition;
	@Column(name="description")
	private String description;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="catagory")
	private Catagory catagory;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name="Book_Stream", joinColumns={@JoinColumn(name ="book_Id")},
	inverseJoinColumns={@JoinColumn(name ="Stream_Id")})
	private List<Stream> stream;
/*	@JsonIgnore
	@OneToOne
	@JoinTable(name="Book_BorrowedBooks", joinColumns={@JoinColumn(name ="book_Id")},
	inverseJoinColumns={@JoinColumn(name ="bb_Id")}) 
	private BorrowedBook borrowedBook; */
	@Column(name="availablity")
	private boolean availablity;
	public int getBookId() {
		return bookId;
	}
	public void setBookId(int bookId) {
		this.bookId = bookId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}

	public String getEdition() {
		return edition;
	}
	public void setEdition(String edition) {
		this.edition = edition;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Catagory getCatagory() {
		return catagory;
	}
	public void setCatagory(Catagory catagory) {
		this.catagory = catagory;
	}
	public boolean isAvailablity() {
		return availablity;
	}
	public void setAvailablity(boolean availablity) {
		this.availablity = availablity;
	}
	public List<Stream> getStream() {
		return stream;
	}
	public void setStream(List<Stream> stream) {
		this.stream = stream;
	}
	
}
