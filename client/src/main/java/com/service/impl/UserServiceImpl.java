package com.service.impl;

import com.entity.UserEntity;
import com.google.gson.Gson;
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
            System.out.println("loginJson:" + loginJson);
            user = gson.fromJson(loginJson, UserEntity.class);
            if (user != null) {
                userEntity = user;
                isLogin = true;
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
