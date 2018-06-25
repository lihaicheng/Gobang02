package service.impl;

import dao.UserDao;
import dao.impl.UserDaoImpl;
import entity.UserEntity;
import service.UserService;
import tool.MD5Tools;

import java.util.List;

public class UserServiceImpl implements UserService {
    UserDao userDao = new UserDaoImpl();

    @Override
    public int reg(UserEntity user) {
        return 0;
    }

    @Override
    public UserEntity login(String account, String password) {
        if (account == null || password == null) {
            return null;
        }
        password = MD5Tools.MD5(password);
        return userDao.login(account, password);
    }

    @Override
    public UserEntity getUser(String account) {
        return null;
    }

    @Override
    public int alter(UserEntity user, String password) {
        return 0;
    }

    @Override
    public List<UserEntity> getAll(UserEntity user) {
        return null;
    }

    @Override
    public boolean isHaveUsername(String username) {
        return false;
    }

    @Override
    public boolean isHavePhone(String phone) {
        return false;
    }

    @Override
    public boolean isHaveEmail(String email) {
        return false;
    }

    @Override
    public boolean isHaveAccount(String account) {
        return false;
    }

    @Override
    public UserEntity getByUid(int uid) {
        return null;
    }
}
