package controler;

import com.google.gson.Gson;
import entity.UserEntity;
import service.UserService;
import service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet(urlPatterns = {"/webuser/login.action", "/webuser/getUser.do"})
public class LoginServlet extends HttpServlet {
    UserService userService = new UserServiceImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String urlStr = req.getRequestURI();
        System.out.println("urlStr:" + urlStr);
        if (urlStr.contains("webuser/login.action")) {
            login(req, resp);
        } else if (urlStr.contains("webuser/getUser.do")) {
            getUser(req, resp);
        } else {
            resp.getWriter().println("Please check the case！"+urlStr);
        }
    }

    private void getUser(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String username = CookieUtils.getCookieValue(req, "username");
        String sid = CookieUtils.getCookieValue(req, "SID");

        UserEntity user = userService.loginForSID(username, sid);
        System.out.println(sid);
        if (user != null) {
            showSuccess(req, resp, user);
        } else {
            showError(req, resp);
        }
    }

    private void login(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        HttpSession session = req.getSession();
        String account = req.getParameter("account");
        String password = req.getParameter("password");
        UserEntity user = userService.login(account, password);
        if (user != null) {
            //保存登录sid
            userService.saveSid(user.getUid(), session.getId());
            showSuccess(req, resp, user);
        } else {
            showError(req, resp);
        }
    }

    /**
     * 用户登录失败
     */
    private void showError(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        //登录失败，返回用户信息
        Map<String, Object> map = new HashMap<>();
        map.put("isLogin", false);
        map.put("SID", req.getSession().getId());
        Gson gson = new Gson();
        String json = gson.toJson(map);
        resp.getWriter().println(json);
    }

    private void showSuccess(HttpServletRequest req, HttpServletResponse resp, UserEntity user) throws IOException {
        //登录成功，返回用户信息
        Map<String, Object> map = new HashMap<>();
        map.put("isLogin", true);
        map.put("SID", req.getSession().getId());
        map.put("user", user);
        Gson gson = new Gson();
        String json = gson.toJson(map);
        resp.getWriter().println(json);
    }
}
