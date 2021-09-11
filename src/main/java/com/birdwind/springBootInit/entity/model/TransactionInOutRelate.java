package com.birdwind.springBootInit.entity.model;

import com.birdwind.springBootInit.base.annotation.I18nPrefix;
import com.birdwind.springBootInit.base.repo.AbstractModel;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;
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
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@I18nPrefix(value = "TransactionInOutRelate")
@Table(name = "`transaction_in_out_relate`")
public class TransactionInOutRelate extends AbstractModel {

    private static final long serialVersionUID = 1L;

    public TransactionInOutRelate() {
        this.relateId = 0;
        this.relateUuid = UUID.randomUUID().toString();
        this.createDate = new Date();
        this.updateDate = new Date();
        this.status = true;
    }

    public TransactionInOutRelate(Transaction transactionIn, Transaction transactionOut, BigDecimal quantity) {
        this();
        this.transactionIn = transactionIn;
        this.transactionOut = transactionOut;
        this.quantity = quantity;
    }

    @Id
    @Column(name = "relate_id", updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer relateId;

    @Column(name = "relate_uuid", updatable = false, nullable = false, unique = true)
    private String relateUuid;

    @OneToOne
    @JoinColumn(name = "transaction_in_id", nullable = false)
    private Transaction transactionIn;

    @OneToOne
    @JoinColumn(name = "transaction_out_id", nullable = false)
    private Transaction transactionOut;

    @Column(name = "quantity", nullable = false)
    private BigDecimal quantity;

    @CreationTimestamp
    @Column(name = "create_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @UpdateTimestamp
    @Column(name = "update_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;

    @Column(name = "status")
    private Boolean status;

    @Override
    public Integer getId() {
        return relateId;
    }
}
