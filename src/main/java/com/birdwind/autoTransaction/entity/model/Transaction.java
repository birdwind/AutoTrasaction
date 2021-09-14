package com.birdwind.autoTransaction.entity.model;

import com.birdwind.autoTransaction.base.annotation.I18nPrefix;
import com.birdwind.autoTransaction.base.repo.AbstractModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@I18nPrefix(value = "Transaction")
@Table(name = "`transaction`")
public class Transaction extends AbstractModel {

    private static final long serialVersionUID = 1L;

    public Transaction() {
        this.transactionId = 0;
        this.transactionUuid = UUID.randomUUID().toString();
        this.createDate = new Date();
        this.updateDate = new Date();
        this.status = true;
    }

    @Id
    @Column(name = "transaction_id", updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transactionId;

    @Column(name = "transaction_uuid", updatable = false, nullable = false, unique = true)
    private String transactionUuid;

    @Column(name = "transaction_no", updatable = false, nullable = false, unique = true)
    private String transactionNo;

    @Column(name = "type", updatable = false, nullable = false)
    private int type;

    @OneToOne
    @JoinColumn(name = "currency_id", nullable = false)
    private Currency currency;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "quantity", nullable = false)
    private BigDecimal quantity;

    @Column(name = "total", nullable = false)
    private BigDecimal total;

    @Column(name = "lave", nullable = false)
    private BigDecimal lave;

    @Column(name = "transaction_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date transactionDate;

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

    @OneToOne(fetch = FetchType.LAZY, targetEntity = Earning.class, mappedBy = "transaction")
    @Where(clause = "status = true")
    private Earning earning;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = TransactionInOutRelate.class, mappedBy = "transactionIn")
    @Where(clause = "status = true")
    private List<TransactionInOutRelate> TransactionInRelates;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = TransactionInOutRelate.class, mappedBy = "transactionOut")
    @Where(clause = "status = true")
    private List<TransactionInOutRelate> TransactionOutRelates;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = TransactionBuyerRelate.class, mappedBy = "transaction")
    @Where(clause = "status = true")
    private List<TransactionBuyerRelate> transactionBuyerRelates;

    @Override
    public Integer getId() {
        return transactionId;
    }
}
