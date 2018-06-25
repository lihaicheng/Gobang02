import com.entity.UserEntity;
import com.service.UserService;
import com.service.impl.UserServiceImpl;
import org.junit.*;

import java.util.List;

public class TestUserLogin {

    @Before
    public void init() {
    }

    @After
    public void destory() {
    }

    @Test
    public void test() {
        UserService userService = new UserServiceImpl();
        UserEntity userEntity = userService.login("chao", "123456");
        System.out.println(userEntity.getUsername());
    }
}
