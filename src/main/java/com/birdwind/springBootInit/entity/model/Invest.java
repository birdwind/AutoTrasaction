package com.birdwind.springBootInit.entity.model;

import com.birdwind.springBootInit.base.annotation.I18nPrefix;
import com.birdwind.springBootInit.base.repo.AbstractModel;
import com.google.common.collect.Lists;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@I18nPrefix(value = "Invest")
@Table(name = "`invest`")
public class Invest extends AbstractModel {

    private static final long serialVersionUID = 1L;

    public Invest() {
        this.investId = 0;
        this.investUuid = "0";
        this.status = true;
    }

    @Id
    @Column(name = "invest_id", updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer investId;

    @Column(name = "invest_uuid", updatable = false, nullable = false, unique = true)
    private String investUuid;

    @Column(name = "invest_no", updatable = false, nullable = false, unique = true)
    private String investNo;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "amount_note")
    private String amountNote;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invest_type", nullable = false)
    private InvestType investType;

    @Column(name = "invest_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date investDate;

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

    @OneToMany(fetch = FetchType.LAZY, targetEntity = InvestMemberRelate.class, mappedBy = "invest")
    @Where(clause = "status = true")
    private List<InvestMemberRelate> investMemberRelates;

    @Override
    public Integer getId() {
        return investId;
    }
}
