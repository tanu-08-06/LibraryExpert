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
import javax.persistence.Table;
@Entity
@Table(name="Catagory")
public class Catagory{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="catagory_Id")
	private int catagoryId;
	@Column(name="catagory_name",unique=true)
	private String catagoryName;
	/*
	@ManyToMany( fetch = FetchType.EAGER)
	@JoinTable(name="Stream_Catagory", joinColumns={@JoinColumn(name ="catagory_Id")},
	inverseJoinColumns={@JoinColumn(name ="Stream_Id")}) 
	private List<Stream> streams; */
	public String getCatagoryName() {
		return catagoryName;
	}
	public void setCatagoryName(String catagoryName) {
		this.catagoryName = catagoryName;
	}
/*	public List<Stream> getStreams() {
		return streams;
	}
	public void setStreams(List<Stream> streams2) {
		this.streams = streams2;
	} */
	public int getCatagoryId() {
		return catagoryId;
	}
	public void setCatagoryId(int catagoryId) {
		this.catagoryId = catagoryId;
	}
		
}
