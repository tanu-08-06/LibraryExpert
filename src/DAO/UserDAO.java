package DAO;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import pojo.UnregisteredUser;
import pojo.User;
import util.HibernateUtil;
public class UserDAO {
	public static void main(String[] args) {
		/*
		 * UnregisteredUser user=new UnregisteredUser(); user.setFirstName("Anish");
		 * DAO.updateRow(user);
		 */
		
		DAO.getRow("User", 1);
	}
	
	public static User validateUser(String userName,String password){
		Session session=HibernateUtil.getSessionFactory().openSession();
		User user=null;
		try{
			session.beginTransaction();
			Criteria crit=session.createCriteria(User.class);
			crit.add(Restrictions.eq("userName", userName)).add(Restrictions.eq("password", password));
			List<?> userList=crit.list();
			if(userList.size()!=0){
				 user=(User) userList.get(0);
			}
			return user;
		}catch(Exception e){
			System.out.println("Exception in UserDao: "+e);
			return null;
		}finally{
			session.close();
		}
	}
	public static String userCheck(String userName){
		Session session=HibernateUtil.getSessionFactory().openSession();
		try{
			session.beginTransaction();
			Criteria crit=session.createCriteria(User.class);
			crit.add(Restrictions.eq("userName", userName));
			List<?> userList=crit.list();
			Criteria crit2=session.createCriteria(UnregisteredUser.class);
			crit2.add(Restrictions.eq("userName", userName));
			List<?> userList2=crit2.list();
			if(userList.size()==0&&userList2.size()==0){
				 return "not found";
			}else{
				return "found";
		}
		}catch(Exception e){
			System.out.println("Exception in UserDao: "+e);
			return "exception caught";
		}finally{
			session.close();
		}
		
	}
}
