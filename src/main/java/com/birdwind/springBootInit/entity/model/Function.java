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
@Entity
@Table(name = "`function`")
@I18nPrefix(value = "Function")
public class Function extends AbstractModel {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "function_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer functionId;

    @Column(name = "function_uuid", updatable = false, nullable = false, unique = true)
    private String functionUuid;

    @Column(name = "function_no", updatable = false, nullable = false, unique = true)
    private String functionNo;

    @Column(name = "function_key", unique = true)
    private String functionKey;

    @Column(name = "function_value", nullable = false)
    private String functionValue;

    @Column(name = "status", nullable = false)
    private Boolean status;

    @Column(name = "note")
    private String note;

    @CreationTimestamp
    @Column(name = "create_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @Column(name = "back_url")
    private String backUrl;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = ModuleFunctionRelate.class, mappedBy = "function")
    private List<ModuleFunctionRelate> moduleFunctionRelates;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = FunctionOperatorRelate.class, mappedBy = "function")
    private List<FunctionOperatorRelate> functionOperatorRelates;

    @Override
    public Integer getId() {
        return this.functionId;
    }

}
