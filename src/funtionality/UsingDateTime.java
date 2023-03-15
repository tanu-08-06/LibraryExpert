package funtionality;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class UsingDateTime {
	@SuppressWarnings("deprecation")
	public static void main(String[] args) {
		Date d = new Date();
		Calendar cal=Calendar.getInstance();
		cal.set(Calendar.YEAR, 1996);
		cal.set(Calendar.HOUR, 16);
		System.out.println(cal.get(Calendar.HOUR));
		System.out.println(Calendar.getInstance());
		d.setYear(107);
		d.setHours(14);
		d.setDate(14);
		d.setMonth(5);
		Date date2=new Date();
		System.out.println(date2.getDay()+"/"+date2.getMonth()+"/"+date2.getYear());
		String str="abc@5d";
		System.out.println(str.contains("@"));
		if(str.matches(".*\\d.*")){
			System.out.println("ok");
		}
		System.out.println(d);
	//	System.out.println(d.getTime());
		DateFormat df=DateFormat.getDateInstance(DateFormat.MEDIUM);
		System.out.println( df.format(d) );
		DateFormat tf=DateFormat.getTimeInstance
		(DateFormat.FULL);
		System.out.println (tf.format (d));
		SimpleDateFormat sdf=	new SimpleDateFormat("hh:mm:ss");
		System.out.println( sdf.format(d) );
		String abc="abc";
		int a=Integer.parseInt(abc);
		System.out.println(a);
	}
	
}
