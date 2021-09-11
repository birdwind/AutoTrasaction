package com.birdwind.springBootInit.entity.model;

import com.birdwind.springBootInit.base.annotation.I18nPrefix;
import com.birdwind.springBootInit.base.repo.AbstractModel;
import org.hibernate.annotations.CreationTimestamp;
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
@Table(name = "`module`")
@Entity
@I18nPrefix(value = "Module")
public class Module extends AbstractModel {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "module_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer moduleId;

    @Column(name = "module_uuid", updatable = false, nullable = false, unique = true)
    private String moduleUuid;

    @Column(name = "module_no")
    private String moduleNo;

    @Column(name = "module_key")
    private String moduleKey;

    @Column(name = "module_value")
    private String moduleValue;

    @Column(name = "module_icon")
    private String moduleIcon;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "note")
    private String note;

    @CreationTimestamp
    @Column(name = "create_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = ModuleRoleRelate.class, mappedBy = "module")
    private List<ModuleRoleRelate> moduleRoleRelates;

    // @OneToMany(fetch = FetchType.LAZY, targetEntity = ModuleGroupRelate.class, mappedBy = "module")
    // private List<ModuleGroupRelate> moduleGroupRelates;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = ModuleFunctionRelate.class, mappedBy = "module")
    private List<ModuleFunctionRelate> moduleFunctionRelates;

    @Override
    public Integer getId() {
        return this.moduleId;
    }

}
