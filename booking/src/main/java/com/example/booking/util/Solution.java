package com.example.booking.util;

public class Solution {
    public static int lengthOfLongestSubstring(String s) {

//        String subString = s.substring(0,1);
//        String sub = "" + s.charAt(0);
        char[] sub = new char[s.length()];
        int top=0;
        for (int i = 1; i < s.length(); i++) {

//            for (int j = 0; j < cur; j++) {
//                if(sub[j]==s.charAt(i)){
//
//                }
//            }
            if(s.charAt(i-1)==s.charAt(i)){
                sub[top++]=s.charAt(i);
            }
//            sub[cur++]=s.charAt(i);


        }

        System.out.println(sub);
        return sub.length;
    }

    public static void main(String[] args) {
       System.out.println(lengthOfLongestSubstring("pwwkew"));
    }
}
