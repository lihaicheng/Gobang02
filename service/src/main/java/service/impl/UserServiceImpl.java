package service.impl;

import dao.LoginSid;
import dao.UserDao;
import dao.impl.LoginSidImpl;
import dao.impl.UserDaoImpl;
import entity.UserEntity;
import service.UserService;
import tool.CheckUtil;
import tool.Constants;
import tool.MD5Tools;

import java.util.List;

public class UserServiceImpl implements UserService {
    UserDao userDao = new UserDaoImpl();
    LoginSid loginSid = new LoginSidImpl();

    @Override
    public int reg(UserEntity user) {
        if (user != null) {
            user.setPassword(MD5Tools.MD5(user.getPassword()));
            return userDao.reg(user);
        }
        return Constants.REG_unknown_error;
    }

    @Override
    public UserEntity login(String account, String password) {
        if (account == null || password == null) {
            return null;
        }
        password = MD5Tools.MD5(password);
        UserEntity userEntity= userDao.login(account, password);
        userEntity.setPassword(null);
        return  userEntity;
    }

    @Override
    public void saveSid(int uid, String sid) {
        sid = MD5Tools.MD5(sid);
        loginSid.saveSid(uid, sid);
    }

    @Override
    public UserEntity loginForSID(String account, String SID) {
        if (account == null || SID == null) {
            return null;
        }
        SID = MD5Tools.MD5(SID);
        UserEntity user = getUser(account);
        System.out.println(SID + "," + user.getUid());
        if (user != null) {
            UserEntity userEntity= loginSid.login(user.getUid(), SID);
            userEntity.setPassword(null);
            return  userEntity;
        }
        return null;
    }

    @Override
    public UserEntity getUser(String account) {
        return userDao.getUser(account);
    }

    @Override
    public int alter(UserEntity newUser, String password) {
        System.out.println("alter," + newUser.getUsername() + "," + password);
        UserEntity oldUser = login(newUser.getUsername(), password);
        if (oldUser != null) {//登录成功！
            if (!CheckUtil.checkEmpty(newUser.getPhone())) {
                oldUser.setPhone(newUser.getPhone());
            }
            if (!CheckUtil.checkEmpty(newUser.getEmail())) {
                oldUser.setEmail(newUser.getEmail());
            }
            if (!CheckUtil.checkEmpty(newUser.getSign())) {
                oldUser.setSign(newUser.getSign());
            }
            return userDao.alter(oldUser);
        } else {
            //密码错误
            return Constants.Login_error;
        }
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
        if (account != null) {
            return userDao.isHaveAccount(account);
        }
        return true;
    }

    @Override
    public UserEntity getByUid(int uid) {
        return userDao.getByUid(uid);
    }
}
