package entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "login_sid")
public class LoginSidEntity {
    private Integer uid;
    private String sidMd5;
    private int id;

    @Basic
    @Column(name = "uid")
    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    @Basic
    @Column(name = "sid_md5")
    public String getSidMd5() {
        return sidMd5;
    }

    public void setSidMd5(String sidMd5) {
        this.sidMd5 = sidMd5;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LoginSidEntity that = (LoginSidEntity) o;
        return Objects.equals(uid, that.uid) &&
                Objects.equals(sidMd5, that.sidMd5);
    }

    @Override
    public int hashCode() {

        return Objects.hash(uid, sidMd5);
    }

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
