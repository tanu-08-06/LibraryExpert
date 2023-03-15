package util;

import java.util.Date;

public class DateUtil {
	@SuppressWarnings("deprecation")
	public static Date addDate(Date date,int days){
		int month=date.getMonth();
		int year=date.getYear();
		int dateToday=date.getDate();
		int daysInMonth=daysInMonth(month+1,year+1900);
		int returnDate=dateToday+days;
		if(returnDate>daysInMonth){
			date.setMonth(month+1);
			date.setDate(returnDate-daysInMonth);
			if((month+1)>11){
				date.setYear(year+1);
			}
		}else{
			date.setDate(returnDate);
		}
		return date;
	}
	public static boolean checkLeapYear(int year){
		 if((year % 400 == 0) || ((year % 4 == 0) && (year % 100 != 0)))
            return true;
		 else
			 return false;
	}
	public static int daysInMonth(int month,int year){
		int daysInMonth;
		if (month == 4 || month == 6 || month == 9 || month == 11)
			daysInMonth = 30;
		else if (month == 2) 
			daysInMonth = (checkLeapYear(year)) ? 29 : 28;
		else 
			daysInMonth = 31;
		return daysInMonth;
	}
}
