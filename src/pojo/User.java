package pojo;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;
@Entity
@Table(name="User")
public class User {
	@Id
	@Column(name="ID", unique = true, nullable = false)
	@GeneratedValue(strategy=GenerationType.AUTO)
	int userId;
	@Column(name="First_Name")
	String firstName;
	@Column(name="Last_Name")
	String lastName;
	@Column(name="User_Name")
	String userName;
	@Column(name="Password")
	String password;
	@Column(name="DOB")
	Date dob;
	@Column(name="Email")
	String email;
	@Column(name="Address")
	String address;
	@Column(name="Type")
	String type;
	@Column(name="Phone")
	long phone;
	@Column(name="Active")
	private boolean active;
	
	@JsonIgnore
	@OneToMany( fetch = FetchType.EAGER)
	@JoinTable(name="User_BorrowedBooks", joinColumns={@JoinColumn(name ="User_Id")},
	inverseJoinColumns={@JoinColumn(name ="bb_Id")}) 
	Set<BorrowedBook> borrowedBook;
	
	@JsonIgnore
	@OneToMany( fetch = FetchType.EAGER)
	@JoinTable(name="User_ComplainDetails", joinColumns={@JoinColumn(name ="User_Id")},
	inverseJoinColumns={@JoinColumn(name ="com_Id")})
	Set<ComplainDetails> comdetails;
	
	@JsonIgnore
	@OneToMany( fetch = FetchType.EAGER)
	@JoinTable(name="User_BookRequest", joinColumns={@JoinColumn(name ="User_Id")},
	inverseJoinColumns={@JoinColumn(name ="bookReq_Id")})
	Set<RequestBook> bookreq;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public long getPhone() {
		return phone;
	}

	public void setPhone(long phone) {
		this.phone = phone;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Set<BorrowedBook> getBorrowedBook() {
		return borrowedBook;
	}

	public void setBorrowedBook(Set<BorrowedBook> borrowedBook) {
		this.borrowedBook = borrowedBook;
	}

	public Set<ComplainDetails> getComdetails() {
		return comdetails;
	}

	public void setComdetails(Set<ComplainDetails> comdetails) {
		this.comdetails = comdetails;
	}

	public Set<RequestBook> getBookreq() {
		return bookreq;
	}

	public void setBookreq(Set<RequestBook> bookreq) {
		this.bookreq = bookreq;
	}
	
}
