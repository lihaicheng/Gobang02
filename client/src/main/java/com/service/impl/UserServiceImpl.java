package com.service.impl;

import com.entity.UserEntity;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.service.UserService;
import com.tool.Constant;
import com.tool.HttpTools;
import com.tool.MD5Tools;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserServiceImpl implements UserService {
    private static UserEntity userEntity = null;
    private static boolean isLogin;

    @Override
    public UserEntity login(String account, String password) {
        UserEntity user = null;
        Gson gson = new Gson();
        Map<String, String> map = new HashMap<String, String>();
        map.put("account", account);
        map.put("password", password);
        try {
            String loginJson = HttpTools.doPost(Constant.WEB_API_login, map);
            System.out.println("登录结果，loginJson:" + loginJson);
            JsonObject jsonObject = (JsonObject) new JsonParser().parse(loginJson);
            isLogin = jsonObject.get("isLogin").getAsBoolean();
            if (isLogin){//登录成功
                JsonObject userObject = jsonObject.get("user").getAsJsonObject();
                user = gson.fromJson(userObject, UserEntity.class);
                if (user != null) {
                    //数据库中可能为空，导致转换成int，会有空指针异常！
                    if (user.getGrade() == null) {
                        user.setGrade(100);
                    }
                    userEntity = user;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return user;
    }

    @Override
    public int addGrade(int grade) {
        return 99;
    }

    @Override
    public UserEntity getUser() {
        return userEntity;
    }

    @Override
    public boolean isLogin() {
        return isLogin;
    }

}
