package dao.impl;

import dao.HibernateUtil;
import dao.UserDao;
import entity.UserEntity;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import tool.Constants;

import java.util.List;

public class UserDaoImpl implements UserDao {
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
    public int reg(UserEntity user) {
        init();
        // 1、得到Query对象，并写入hql语句
        session.save(user);
        try {
            transaction.commit();
            return Constants.REG_success;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Constants.REG_unknown_error;
    }

    @Override
    public UserEntity login(String account, String password) {
        init();
        // 1、得到Query对象，并写入hql语句
        Query query = session.createQuery("from UserEntity where username = ? and password = ?");
        query.setParameter(0, account);
        query.setParameter(1, password);
        List<UserEntity> users = query.list();

        if (users != null) {
            for (UserEntity user : users) {
                return user;
            }
        }
        return null;
    }

    @Override
    public UserEntity getUser(String account) {
        init();
        Query query = session.createQuery("from UserEntity where username=?");
        query.setParameter(0, account);
        List<UserEntity> users = query.list();
        if (users != null) {
            for (UserEntity user : users) {
                return user;
            }
        }
        return null;
    }

    @Override
    public int alter(UserEntity user) {
        return 0;
    }

    @Override
    public List<UserEntity> getAll() {
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
    public UserEntity findByID(int uid) {
        return null;
    }

    @Override
    public UserEntity getByUid(int uid) {
        init();
        // 1、得到Query对象，并写入hql语句
        //  Query query = session.createQuery("select new entity.UserEntity(uid,username,email,phone,sign,type,regTime,grade) from UserEntity where uid = ?");
        Query query = session.createQuery("from UserEntity where uid = ?");
        query.setParameter(0, uid);
        List<UserEntity> users = query.list();

        if (users != null) {
            for (UserEntity user : users) {
                return user;
            }
        }
        return null;
    }
}
