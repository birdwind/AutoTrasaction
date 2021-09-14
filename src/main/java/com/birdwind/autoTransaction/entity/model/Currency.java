package com.birdwind.autoTransaction.entity.model;

import com.birdwind.autoTransaction.base.annotation.I18nPrefix;
import com.birdwind.autoTransaction.base.repo.AbstractModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "`currency`")
@I18nPrefix(value = "Currency")
public class Currency extends AbstractModel {

    private static final long serialVersionUID = 1L;

    public Currency() {
        this.currencyId = 0;
        this.currencyUuid = UUID.randomUUID().toString();
        this.createDate = new Date();
        this.updateDate = new Date();
        this.status = true;
    }

    public Currency(String currencyName) {
        this();
        this.currencyName = currencyName;
    }

    @Id
    @Column(name = "currency_id", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer currencyId;

    @Column(name = "currency_uuid", updatable = false, nullable = false)
    private String currencyUuid;

    @Column(name = "currency_name", updatable = false, nullable = false)
    private String currencyName;

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

    @OneToMany(fetch = FetchType.LAZY, targetEntity = Transaction.class, mappedBy = "currency")
    @Where(clause = "status = true")
    private List<Transaction> transactions;

    @Override
    public Integer getId() {
        return currencyId;
    }
}
