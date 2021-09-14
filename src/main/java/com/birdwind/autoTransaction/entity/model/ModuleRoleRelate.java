package com.birdwind.autoTransaction.entity.model;

import com.birdwind.autoTransaction.base.repo.AbstractModel;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "`module_role_relate`")
public class ModuleRoleRelate extends AbstractModel {

    private static final long serialVersionUID = 1L;

    public ModuleRoleRelate() {
        this.moduleRoleRelateId = 0;
        this.status = true;
    }

    public ModuleRoleRelate(Role role, Module module) {
        this.moduleRoleRelateId = 0;
        this.status = true;
        this.role = role;
        this.module = module;
    }

    @Id
    @Column(name = "module_role_relate_id", updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer moduleRoleRelateId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToOne
    @JoinColumn(name = "module_id")
    private Module module;

    @Column(name = "status")
    private Boolean status;

    @CreationTimestamp
    @Column(name = "create_date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @UpdateTimestamp
    @Column(name = "update_date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;

    @Override
    public Integer getId() {
        return this.moduleRoleRelateId;
    }

}
