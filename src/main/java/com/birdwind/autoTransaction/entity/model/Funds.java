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
import java.util.UUID;

@Getter
@Setter
@Table(name = "`funds`")
@I18nPrefix(value = "Funds")
@Entity
public class Funds extends AbstractModel {

    private static final long serialVersionUID = 1L;

    public Funds() {
        this.fundsId = 0;
        this.fundsUuid = UUID.randomUUID().toString();
        this.amount = BigDecimal.ZERO;
        this.createDate = new Date();
        this.updateDate = new Date();
        this.status = true;
    }

    @Id
    @Column(name = "funds_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fundsId;

    @Column(name = "funds_uuid", nullable = false, unique = true)
    private String fundsUuid;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @CreationTimestamp
    @Column(name = "create_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @UpdateTimestamp
    @Column(name = "update_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;

    @Column(name = "status")
    private Boolean status;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "funds_id")
    @Where(clause = "status = true")
    private FundsMemberRelate fundsMemberRelate;

    @Override
    public Integer getId() {
        return this.fundsId;
    }

}
