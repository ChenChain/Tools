package date;


import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 *  获取日期对应的工作日节假日状态
 */
public class WeekDay {

    /**
     * 存储data映射 year--dataRules
     */
    private static Map<String,Map<String,Integer>> mapMap;

    /**
     * 返回给定日期是周几
     * @param dates
     * @return
     */
    private static int getWeek(String dates){
//        SimpleDateFormat f=new SimpleDateFormat("yyyy-MM-dd");
//        String day=dates.substring(0,4)+"-"+dates.substring(4,6)+"-"+dates.substring(6);
        SimpleDateFormat f = new SimpleDateFormat("yyyyMMdd");
        String day=dates;
        Calendar calendar=Calendar.getInstance();
        Date date=null;
        try {
             date=f.parse(day);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        calendar.setTime(date);
        int w=calendar.get(Calendar.DAY_OF_WEEK)-1;
        if (w==0) w=7;
        return  w;
    }

    /**
     * 根据日期获取是否是工作日的状态
     * 0--工作日
     * 1--休息日
     * 2--节假日
     * @param date
     * @return
     */
    public static int getStateOfDate(String date, String prefix) throws IOException {
        int state=0;
        int w=getWeek(date);
        if (w>=1&&w<=5){
            state=0;
        }else {
            state =1;
        }
        String year=date.substring(0,4);

        if (getDataRuleMap(year)==null){
            String fileName=prefix+ year+"_data.json";
            Map<String ,Integer> map=Data.getDaysChangeOfYear(fileName);
            mapMap.put(year,map);
        }

//        String fileName=prefix+ year+"_data.json";
//        Map<String ,Integer> map=Data.getDaysChangeOfYear(fileName);
        Map<String ,Integer> map=mapMap.get(year);
        Integer i=map.get(date.substring(4));
        if (i==null){
            return state;
        }
        return i;
    }

    /**
     * 根据年份 强制去更新map中year对应的规则
     * @param year 2020 2021 等四位字符串
     * @param prefix
     */
    public void updateMapByYear(String year,String prefix) throws IOException {
        if (mapMap==null){
            mapMap=new HashMap<>();
        }
        String fileName=prefix+ year+"_data.json";
        Map<String ,Integer> map=Data.getDaysChangeOfYear(fileName);
        mapMap.put(year,map);
    }

    private static Map<String,Integer> getDataRuleMap(String year){
        if (mapMap==null){
            mapMap=new HashMap<>();
        }
        return  mapMap.get(year);
    }


    /**
     * 不优雅的写法
     * @param date
     * @param prefix
     * @return
     * @throws IOException
     */
    public static int noGentleGetStateOfDate(String date, String prefix) throws IOException {
        int state=0;
        int w=getWeek(date);
        if (w>=1&&w<=5){
            state=0;
        }else {
            state =1;
        }
        String year=date.substring(0,4);

        if (getDataRuleMap(year)==null){
            String fileName=prefix+ year+"_data.json";
            Map<String ,Integer> map=Data.getDaysChangeOfYear(fileName);
            mapMap.put(year,map);
        }

//        String fileName=prefix+ year+"_data.json";
//        Map<String ,Integer> map=Data.getDaysChangeOfYear(fileName);
        Map<String ,Integer> map=mapMap.get(year);
        Integer i=map.get(date.substring(4));
        if (i==null){
            return state;
        }
        return i;
    }





    public static void main(String[] args) {
        System.out.println(WeekDay.getWeek("20200516"));
        System.out.println(WeekDay.getWeek("20200517"));
        System.out.println(WeekDay.getWeek("20200518"));
    }

}

class Data {

    /**
     * 获取filename文件中year年的日期变化情况
     * 要求filename的文件格式json
     *
     * ｛
     *  "1010":0,
     *   "1011":1
     * ｝
     *
     * @param
     * @return map映射，特殊变化的值
     */
    protected static Map<String, Integer> getDaysChangeOfYear(String fileName) throws IOException {
        Map<String, Integer> map = new HashMap<>();
        FileReader fileReader = new FileReader(fileName);
        BufferedReader bufferedReader = new BufferedReader(fileReader);
        String str;
        //开始按行读取
        while ((str = bufferedReader.readLine()) != null) {
            str = str.trim();
            if (!(str.equals("{") || str.equals("}"))) {
                String date = str.substring(1, 5);
                String state = str.split(":")[1].substring(0, 1);
                map.put(date, Integer.valueOf(state));
            }
        }
        return map;
    }
}

