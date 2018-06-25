package dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

public class HibernateUtil {
    private static SessionFactory sessionFactory;

    static {
        try {
            //创建配置对象(读取配置文档)
            //创建配置对象
            Configuration config = new Configuration().configure();
            //创建服务注册对象
            //创建会话工厂对象
            sessionFactory = config.buildSessionFactory();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 返回会话工厂对象
    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    // 返回一个会话对象
    public static Session getSession() {
        Session session = null;
        if (sessionFactory != null) {
            session = sessionFactory.openSession();
        }
        return session;

    }

    // 关闭指定的会话对象
    public static void closeSession(Session session) {
        if (session != null) {
            if (session.isOpen()) {
                session.close();
            }
        }
    }
}
