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
@I18nPrefix(value = "MemberAuth.Operator")
@Table(name = "`operator`")
public class Operator extends AbstractModel {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "operator_id", updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer operatorId;

    @Column(name = "operator_uuid", updatable = false, unique = true, nullable = false)
    private String operatorUuid;

    @Column(name = "operator_key", unique = true)
    private String operatorKey;

    // 0 = /page, 1 = /api
    @Column(name = "type")
    private Integer type;

    // 0 = GET, 1 = PUT, 2 = POST, 3 = DELETE
    @Column(name = "method")
    private Integer method;

    @Column(name = "url", unique = true)
    private String url;

    @Column(name = "note")
    private String note;

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

    @OneToMany(fetch = FetchType.LAZY, targetEntity = FunctionOperatorRelate.class, mappedBy = "operator")
    private List<FunctionOperatorRelate> functionOperatorRelates;

    @Override
    public Integer getId() {
        return this.operatorId;
    }

}
