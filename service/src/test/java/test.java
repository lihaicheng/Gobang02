import dao.UserDao;
import dao.impl.UserDaoImpl;
import entity.UserEntity;
import org.junit.Test;
import service.UserService;
import service.impl.UserServiceImpl;

public class test {

    UserService userService = new UserServiceImpl();
    UserDao userDao = new UserDaoImpl();
    UserEntity userEntity = new UserEntity();

    @Test
    public void test() {
        //   userService.loginForSID("chao", "1D044F76572FED2C1C6B83AB7F4BB742");
        init();
        userEntity = userService.getUser("chao2");
        userEntity.setEmail("1231223@qq.com");
        int rs = userService.alter(userEntity, "12345a");
        System.out.println(rs);
    }

    public void init() {

        userEntity.setUid(3);
        userEntity.setUsername("chao");
        userEntity.setPassword("12345a");
    }
}
