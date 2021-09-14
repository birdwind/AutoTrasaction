package com.birdwind.autoTransaction.entity.model;

import com.birdwind.autoTransaction.base.repo.AbstractModel;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
@Table(name = "`invest_member_relate`")
public class InvestMemberRelate extends AbstractModel {

    private static final long serialVersionUID = 1L;

    public InvestMemberRelate() {
        this.relateId = 0;
        this.relateUuid = UUID.randomUUID().toString();
        this.status = true;
    }

    public InvestMemberRelate(Invest invest, Member member){
        this();
        this.invest = invest;
        this.member = member;
    }

    @Id
    @Column(name = "relate_id", updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer relateId;

    @Column(name = "relate_uuid", updatable = false, nullable = false, unique = true)
    private String relateUuid;

    @OneToOne
    @JoinColumn(name = "invest_id", nullable = false)
    private Invest invest;

    @OneToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

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
