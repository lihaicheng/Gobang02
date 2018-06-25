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

@WebServlet(urlPatterns = {"/webUser/register.action"})
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
        if (urlStr.contains("webUser/register.action")) {
            register(req, resp);
        }
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
