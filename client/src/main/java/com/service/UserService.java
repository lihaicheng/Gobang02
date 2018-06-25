package com.service;


import com.entity.UserEntity;

import java.util.List;

/**
 * 用户接口
 *
 * @author Chao
 */
public interface UserService {

    /**
     * 用户登录
     *
     * @author Chao
     */
    public UserEntity login(String account, String password);

    /**
     * 增加积分
     *
     * @param grade
     * @return
     */
    public int addGrade(int grade);

    /**
     * 获得登录用户信息
     *
     * @return
     */
    public UserEntity getUser();

    /**
     * 用户是否登录
     *
     * @return
     */
    public boolean isLogin();

}
