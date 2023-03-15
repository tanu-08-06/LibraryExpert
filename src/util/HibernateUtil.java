package util;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;
  
public class HibernateUtil {

    private static SessionFactory sessionFactory;

    static {
       try {
           sessionFactory = new AnnotationConfiguration().configure().buildSessionFactory();
        }
        catch(Throwable t) {
            throw new ExceptionInInitializerError(t);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

}
