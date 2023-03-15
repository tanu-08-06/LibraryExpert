package DAO;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import pojo.Book;
import pojo.Catagory;
import pojo.Stream;
import pojo.User;
import util.HibernateUtil;
public class DAO {
	final static int pageSize=5;
	public static void main(String[] args) {
		Session session=HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		/*
		 * Catagory catagory=new Catagory(); catagory.setCatagoryName("DATABASE");
		 * Stream stream=(Stream) getRow("Stream", 1); Stream stream1=new Stream();
		 * Stream stream2=new Stream(); Stream stream3=new Stream();
		 * stream1.setStreamName("M.C.A."); stream2.setStreamName("M.B.A.");
		 * stream3.setStreamName("I.T.");
		 * 
		 * streams.add(stream1); streams.add(stream2); streams.add(stream3);
		 * 
		 * session.save(stream1); session.save(stream2); session.save(stream3);
		 * 
		 * List<Stream> streams=new ArrayList<Stream>(); streams.add(stream);
		 * catagory.setStreams(streams); session.save(catagory);
		 * session.getTransaction().commit();
		 */
		Catagory catagory=(Catagory) DAO.getRow("Catagory", 1);
		Book book=new Book();
		book.setName("x5");
		book.setAuthor("yg");
		book.setCatagory(catagory); 
		book.setDescription("ollalala");
		book.setEdition("3rd");
		book.setAvailablity(true);
		DAO.updateRow(book); 
		User user=new User();
		user.setActive(true);
		user.setFirstName("Biswanath Das");
		user.setPassword("x");
		user.setType("admin");
		user.setUserName("admin");
		updateRow(user); 
		Catagory s=new Catagory();
		s.setCatagoryName("c++");
		updateRow(s);
	}
	public static String updateRow(Object obj){
		Session session=HibernateUtil.getSessionFactory().openSession();
		try{
			session.beginTransaction();
			session.saveOrUpdate(obj);
			session.getTransaction().commit();
			return "success";
		}catch(Exception e){
			System.out.println("Exception in DAO: "+e);
			return "failed";
		}finally{
			session.close();
		}
	}
	@SuppressWarnings("unchecked")
	public static List<?> getRows(String table,int pageNumber){
		Session session=HibernateUtil.getSessionFactory().openSession();
		List<Object> objList=null;
		try{
			Query query= session.createQuery("from "+table);
			query.setFirstResult((pageNumber - 1) * pageSize);
			query.setMaxResults(pageSize);
			objList=query.list();
			return objList;
		}catch(Exception e){
			System.out.println("Exception in DAO: "+e);
			return null;
		}finally{
			session.close();
		}
	}
	public static List<?> getRowsWithId(String table,int pageNumber,int id){
		Session session=HibernateUtil.getSessionFactory().openSession();
		List<Object> objList=null;
		try{
			Query query= session.createQuery("from "+table+" where user.userId='"+id+"'");
			query.setFirstResult((pageNumber - 1) * pageSize);
			query.setMaxResults(pageSize);
			objList=query.list();
			return objList;
		}catch(Exception e){
			System.out.println("Exception in DAO: "+e);
			return null;
		}finally{
			session.close();
		}
	}
	public static String removeRow(Object obj){
		Session session=HibernateUtil.getSessionFactory().openSession();
		try{
			session.beginTransaction();
			session.delete(obj);
			session.getTransaction().commit();
			return "success";
		}catch(Exception e){
			System.out.println("Exception in DAO: "+e);
			return "failed";
		}finally{
			session.close();
		}
	}
	public static Object getRow(String table,int id){
		Object obj=null;
		Session session=HibernateUtil.getSessionFactory().openSession();
		try{
			obj=session.get(Class.forName("pojo."+table), id);
			return obj;
		}catch(Exception e){
			System.out.println("Exception in DAO: "+e);
			return null;
		}finally{
			session.close();
		}
	}
	public static int countRows(String table){
		int count=0;
		Session session=HibernateUtil.getSessionFactory().openSession();
		try{
			table="pojo."+table;
			System.out.println(table);
			count=(int) session.createCriteria(Class.forName(table)).setProjection(Projections.rowCount()).uniqueResult();
			return count;
		}catch(Exception e){
			System.out.println("Exception in DAO: "+e);
			return 0;
		}finally{
			session.close();
		}
	}
	public static int countRowsWithId(String table,int id){
		int count=0;
		Session session=HibernateUtil.getSessionFactory().openSession();
		try{
			table="pojo."+table;
			Criteria c= session.createCriteria(Class.forName(table));
			c.add(Restrictions.eq("user.userId", id));
			count=(int) c.setProjection(Projections.rowCount()).uniqueResult();
			System.out.println(count);
			return count;
		}catch(Exception e){
			System.out.println("Exception in DAO: "+e);
			return 0;
		}finally{
			session.close();
		}
	}
}
