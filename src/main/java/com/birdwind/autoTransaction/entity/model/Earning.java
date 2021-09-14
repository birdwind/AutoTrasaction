package com.birdwind.autoTransaction.entity.model;

import com.birdwind.autoTransaction.base.annotation.I18nPrefix;
import com.birdwind.autoTransaction.base.repo.AbstractModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@Entity
@I18nPrefix(value = "Earning")
@Table(name = "`earning`")
public class Earning extends AbstractModel {

    private static final long serialVersionUID = 1L;

    public Earning() {
        this.earningId = 0;
        this.earningUuid = UUID.randomUUID().toString();
        this.createDate = new Date();
        this.updateDate = new Date();
        this.status = true;
    }

    public Earning(Currency currency, Transaction transaction, BigDecimal quantity, BigDecimal total){
        this();
        this.currency = currency;
        this.transaction = transaction;
        this.quantity = quantity;
        this.total = total;
    }


    @Id
    @Column(name = "earning_id", updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer earningId;

    @Column(name = "earning_uuid", updatable = false, nullable = false, unique = true)
    private String earningUuid;

    @OneToOne
    @JoinColumn(name = "currency_id", nullable = false)
    private Currency currency;

    @OneToOne
    @JoinColumn(name = "transaction_out_id", nullable = false)
    private Transaction transaction;

    @Column(name = "quantity", nullable = false)
    private BigDecimal quantity;

    @Column(name = "total", nullable = false)
    private BigDecimal total;

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

//    @OneToMany(fetch = FetchType.LAZY, targetEntity = TransactionEarningRelate.class, mappedBy = "earning")
//    @Where(clause = "status = true")
//    private List<TransactionEarningRelate> transactionEarningRelate;

    @Override
    public Integer getId() {
        return earningId;
    }
}
