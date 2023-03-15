package funtionality;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import pojo.User;
import DAO.UserDAO;
public class LoginFilter implements Filter {

   	public void destroy() {
		// TODO Auto-generated method stub
		System.out.println("Filter 1 is destroyed");
	
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		System.out.println("Start of Filter 1");
		 HttpServletRequest req = null;
		 HttpSession session = null;

		String username=(String)request.getParameter("username");
		String password=(String)request.getParameter("password");
		req = (HttpServletRequest)request;
		session = req.getSession();
		if(session!=null && session.getAttribute("username")!=null) {
			chain.doFilter(req, response);
		}else {
			try{
				if((username!=null)&&(password!=null)){
					User user=UserDAO.validateUser(username, password);
					if(user!=null){
						request.setAttribute("username",null);
						request.setAttribute("password",null);
						req = (HttpServletRequest)request;
						session.setAttribute("username", user.getFirstName());
						session.setAttribute("type",user.getType().toLowerCase());
						session.setAttribute("userId", user.getUserId());
						chain.doFilter(req, response);
					}else{
						request.setAttribute("status", "Incorrect UserName/Password");
						RequestDispatcher requestDispatcher =   request.getRequestDispatcher("/Login.jsp");
						requestDispatcher.forward(request, response);
					}
				}else{
					request.setAttribute("status", "Please enter UserName/Password");
					RequestDispatcher requestDispatcher =   request.getRequestDispatcher("/Login.jsp");
					requestDispatcher.forward(request, response);
				}
			}catch(Exception e){
				RequestDispatcher requestDispatcher =   request.getRequestDispatcher("/login.jsp");
				requestDispatcher.forward(request, response);
			}
		}
		
		
	}
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
		System.out.println("In Filter1 init()");
	}

}
