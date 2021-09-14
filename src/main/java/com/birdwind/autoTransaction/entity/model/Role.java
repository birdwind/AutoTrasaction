package com.birdwind.autoTransaction.entity.model;

import com.birdwind.autoTransaction.base.annotation.I18nPrefix;
import com.birdwind.autoTransaction.base.repo.AbstractModel;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "`role`")
@I18nPrefix(value = "Role")
public class Role extends AbstractModel {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "role_id", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roleId;

    @Column(name = "role_uuid", updatable = false, nullable = false)
    private String roleUuid;

    @Column(name = "role_key", updatable = false, nullable = false)
    private String roleKey;

    @CreationTimestamp
    @Column(name = "create_date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @UpdateTimestamp
    @Column(name = "update_date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;

    @Column(name = "status", nullable = false)
    private Boolean status;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = MemberRoleRelate.class, mappedBy = "role")
    private List<MemberRoleRelate> memberRoleRelates;

    @Override
    public Integer getId() {
        return this.roleId;
    }
}
