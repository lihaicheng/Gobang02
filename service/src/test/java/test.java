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
        userService.reg(userEntity);
    }

    public void init() {
        userEntity.setUsername("chao22");
        userEntity.setPassword("12345a");
    }
}
