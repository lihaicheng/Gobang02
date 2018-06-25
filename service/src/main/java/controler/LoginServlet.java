package controler;

import com.google.gson.Gson;
import entity.UserEntity;
import service.UserService;
import service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(urlPatterns = {"/webuser/login.action"})
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
        }
    }

    private void login(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        PrintWriter out = resp.getWriter();
        String account = req.getParameter("account");
        String password = req.getParameter("password");
        UserEntity user = userService.login(account, password);
        //登录成功，返回用户信息
        Gson gson = new Gson();
        String json = gson.toJson(user);
        out.println(json);
    }
}
