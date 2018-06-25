package dao;

import entity.UserEntity;

public interface LoginSid {
    /**
     * 通过SID登录
     *
     * @return
     */
    public UserEntity login(int uid, String sid);

    /**
     * 保存sid
     *
     * @param uid
     * @param sid
     */
    public void saveSid(int uid, String sid);
}
