package date;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 测试脚本
 */
public class TestSCript {

    /**
     * 存储data映射
     */
    private static List<Map<String,Integer>> mapList;

    public static String getURLResult(String date) throws IOException {
        String myurl="http://localhost/pscm/weekday/query/date?date="+date;
        URL url = new URL(myurl);
        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setRequestMethod("GET");
        httpConn.connect();

        BufferedReader reader = new BufferedReader(new InputStreamReader(httpConn.getInputStream()));
        String line;
        StringBuffer buffer = new StringBuffer();
        while ((line = reader.readLine()) != null) {
            buffer.append(line);
        }
        reader.close();
        httpConn.disconnect();
        return buffer.toString();
    }


    /**
     * 获取测试数据集合
     * @param date
     * @param nums
     * @return
     */
    public static List<String > getNextDayString(String date, int nums) {
        List<String> list=new ArrayList<>();
        String day=date.substring(0,4)+"-"+date.substring(4,6)+"-"+date.substring(6);
        DateFormat dft = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date temp = dft.parse(day);
            Calendar cld = Calendar.getInstance();
            cld.setTime(temp);
            list.add(date);
            for (int i = 0; i < nums; i++) {
                cld.add(Calendar.DATE, 1);
                temp = cld.getTime();
                //获得下一天日期字符串
                String nextDay = dft.format(temp);
                list.add(changeStr(nextDay));
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return list;
    }


    private static String changeStr(String str){
        return str.replaceAll("-","");
    }

    public static void main(String[] args) throws IOException {
        List<String> testList=getNextDayString("20200101",365);
        for (String str:testList
             ) {
            String urlResult= getURLResult(str);
            String myResult=WeekDay.getStateOfDate(str,"C:\\Users\\...\\Desktop\\date\\holidays_api\\data\\")+"";
            if (!urlResult.equals(myResult)){
                System.out.println(str+" "+ urlResult+" "+myResult);
            }
        }

//        System.out.println(getURLResult("20200516"));
    }

}
