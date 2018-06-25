package dao.impl;

import dao.HibernateUtil;
import dao.LoginSid;
import dao.UserDao;
import entity.LoginSidEntity;
import entity.UserEntity;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class LoginSidImpl implements LoginSid {
    UserDao userDao = new UserDaoImpl();
    private SessionFactory sessionFactory;
    private Session session;
    private Transaction transaction;

    public void init() {
        session = HibernateUtil.getSession();
        sessionFactory = HibernateUtil.getSessionFactory();
        transaction = session.beginTransaction();
    }

    public void destory() {
        transaction.commit();//事务提交
        session.close();//关闭会话
        sessionFactory.close();//关闭会话工厂
    }

    @Override
    public UserEntity login(int uid, String sid) {
        init();
        Query query = session.createQuery("from LoginSidEntity where uid= ? and sid_md5= ?");
        query.setInteger(0, uid);
        query.setParameter(1, sid);
        List<LoginSidEntity> loginSids = query.list();
        if (loginSids != null) {
            for (LoginSidEntity loginSid : loginSids) {
                return userDao.getByUid(uid);
            }
        }
        return null;
    }

    @Override
    public void saveSid(int uid, String sid) {
        init();
        LoginSidEntity loginSid = new LoginSidEntity();
        loginSid.setUid(uid);
        loginSid.setSidMd5(sid);
        session.save(loginSid);
        transaction.commit();
    }
}
