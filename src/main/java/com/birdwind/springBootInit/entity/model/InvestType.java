package com.birdwind.springBootInit.entity.model;

import com.birdwind.springBootInit.base.annotation.I18nPrefix;
import com.birdwind.springBootInit.base.repo.AbstractModel;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;
import java.math.BigDecimal;
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
@I18nPrefix(value = "InvestType")
@Table(name = "`invest_type`")
public class InvestType extends AbstractModel {

    private static final long serialVersionUID = 1L;

    public InvestType() {
        this.investTypeId = 0;
        this.investTypeUuid = "0";
        this.status = true;
    }

    @Id
    @Column(name = "invest_type_id", updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer investTypeId;

    @Column(name = "invest_type_uuid", updatable = false, nullable = false, unique = true)
    private String investTypeUuid;

    @Column(name = "invest_type_key", updatable = false, nullable = false, unique = true)
    private String investTypeKey;

    @Column(name = "invest_type_value", updatable = false, nullable = false)
    private String investTypeValue;

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

    @OneToMany(fetch = FetchType.LAZY, targetEntity = Invest.class, mappedBy = "investType")
    @Where(clause = "status = true")
    private List<Invest> invests;

    @Override
    public Integer getId() {
        return investTypeId;
    }
}
