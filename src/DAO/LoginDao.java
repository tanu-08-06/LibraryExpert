package DAO;



import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import pojo.User;

import java.util.List;

import util.HibernateUtil;

public class LoginDao {

	public static User checkLogin(String userName,String password){
		Session session=(Session) HibernateUtil.getSessionFactory().openSession();
		User user=null;
		try{
			@SuppressWarnings("unchecked")
			List<User> userList=session.createCriteria(User.class)
					.add(Restrictions.eq("userName", userName))
					.add(Restrictions.eq("password", password)).list();
			if(userList!=null){
				user=userList.get(0);
			}
			session.close();
			return user;
		}catch(Exception e){
			session.close();
			System.out.println("Exception Caught: "+e);
			return null;
		}
	}
}
