package pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="UserActivity")
public class UserActivity {
	@Id
	@Column(name="ID", unique = true, nullable = false)
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int userActivityId;
	@Column(name="User_id")
	private int userId;
	@Column(name="User_name")
	private String userName;
	@Column(name="Transaction_Type")
	private String transactionType;
	@Column(name="Transaction_Id")
	private Integer TransactionId;
	@Column(name="Date")
	private Date date;
	

	public int getUserActivityId() {
		return userActivityId;
	}
	public void setUserActivityId(int userActivityId) {
		this.userActivityId = userActivityId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getTransactionType() {
		return transactionType;
	}
	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}
	public Integer getTransactionId() {
		return TransactionId;
	}
	public void setTransactionId(Integer transactionId) {
		TransactionId = transactionId;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}

}
