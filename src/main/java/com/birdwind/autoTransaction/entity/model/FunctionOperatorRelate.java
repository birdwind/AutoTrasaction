package com.birdwind.autoTransaction.entity.model;

import com.birdwind.autoTransaction.base.annotation.I18nPrefix;
import com.birdwind.autoTransaction.base.repo.AbstractModel;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@I18nPrefix(value = "MemberAuth.Operator")
@Table(name = "`function_operator_relate`",
    uniqueConstraints = @UniqueConstraint(columnNames = {"function_id", "operator_id"}))
public class FunctionOperatorRelate extends AbstractModel {

    private static final long serialVersionUID = 1L;

    public FunctionOperatorRelate() {
        this.functionOperatorRelateId = 0;
        this.status = true;
    }

    public FunctionOperatorRelate(Function function, Operator operator) {
        this();
        this.function = function;
        this.operator = operator;
    }

    @Id
    @Column(name = "function_operator_relate_id", updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer functionOperatorRelateId;

    @OneToOne
    @JoinColumn(name = "function_id")
    private Function function;

    @OneToOne
    @JoinColumn(name = "operator_id")
    private Operator operator;

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
        return this.functionOperatorRelateId;
    }

}
