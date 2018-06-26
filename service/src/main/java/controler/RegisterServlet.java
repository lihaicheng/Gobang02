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
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet(urlPatterns = {"/webuser/register.action", "/webuser/regVer.do"})
public class RegisterServlet extends HttpServlet {
    UserService userService = new UserServiceImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String urlStr = req.getRequestURI();
        System.out.println("urlStr:" + urlStr);
        if (urlStr.contains("webuser/register.action")) {
            register(req, resp);
        } else if (urlStr.contains("webuser/regVer.do")) {
            regVer(req, resp);
        }
    }

    /**
     * 验证账号是否存在
     *
     * @param req
     * @param resp
     */
    private void regVer(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String account = req.getParameter("account");
        System.out.println(account);
        Boolean isHave = userService.isHaveAccount(account);
        Map<String, Object> map = new HashMap<>();
        map.put("isHave", isHave);
        map.put("account", account);
        Gson gson = new Gson();
        String json = gson.toJson(map);
        resp.getWriter().println(json);
    }


    private void register(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String phoneNum = req.getParameter("phoneNum");
        UserEntity user = new UserEntity();
        user.setUsername(username);
        user.setPassword(password);
        user.setPhone(phoneNum);

        System.out.println(username + password);

        int rs = userService.reg(user);

        Map<String, Object> map = new HashMap<>();
        map.put("isReg", rs == Constants.REG_success);
        Gson gson = new Gson();
        String json = gson.toJson(map);
        resp.getWriter().println(json);
    }
}
