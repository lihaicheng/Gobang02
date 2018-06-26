package controler;

import com.google.gson.Gson;
import entity.UserEntity;
import service.UserService;
import service.impl.UserServiceImpl;
import tool.Constants;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet(urlPatterns = {"/webuser/saveUser.action"})
public class UserSaveServlet extends HttpServlet {
    UserService userService = new UserServiceImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String urlStr = req.getRequestURI();
        System.out.println("urlStr:" + urlStr);
        if (urlStr.contains("webUser/saveUser.action")) {
            saveUser(req, resp);
        } else {
            resp.getWriter().println("请检查大小写！");
        }
    }

    private void saveUser(HttpServletRequest req, HttpServletResponse resp) throws IOException {

        String username = CookieUtils.getCookieValue(req, "username");
        String sid = CookieUtils.getCookieValue(req, "SID");

        UserEntity user = userService.loginForSID(username, sid);
        if (user != null) {
            String phone = req.getParameter("phoneNum");
            String email = req.getParameter("email");
            String sign = req.getParameter("sign");
            String password = req.getParameter("password");
            System.out.println("servlet," + username + "," + password);
            UserEntity newUser = new UserEntity();

            //原用户数据
            newUser.setUid(user.getUid());
            newUser.setUsername(user.getUsername());

            // 新用户数据
            newUser.setPhone(phone);
            newUser.setEmail(email);
            newUser.setSign(sign);
            int rs = userService.alter(newUser, password);
            showResult(req, resp, newUser, rs);
        }
    }


    private void showResult(HttpServletRequest req, HttpServletResponse resp, UserEntity user, int rs) throws IOException {
        //登录成功，返回用户信息
        Map<String, Object> map = new HashMap<>();
        map.put("isSave", rs == Constants.Alter_success);
        map.put("status", rs);
        map.put("user", user);
        Gson gson = new Gson();
        String json = gson.toJson(map);
        resp.getWriter().println(json);
    }
}
