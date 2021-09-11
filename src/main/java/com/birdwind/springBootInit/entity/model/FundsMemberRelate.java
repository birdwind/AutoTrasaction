package com.birdwind.springBootInit.entity.model;

import com.birdwind.springBootInit.base.repo.AbstractModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "`funds_member_relate`")
public class FundsMemberRelate extends AbstractModel {

    private static final long serialVersionUID = 1L;

    public FundsMemberRelate() {
        this.relateId = 0;
        this.relateUuid = UUID.randomUUID().toString();
        this.status = true;
    }

    public FundsMemberRelate(Funds funds, Member member){
        this();
        this.funds = funds;
        this.member = member;
    }

    @Id
    @Column(name = "relate_id", updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer relateId;

    @Column(name = "relate_uuid", updatable = false, nullable = false, unique = true)
    private String relateUuid;

    @OneToOne
    @JoinColumn(name = "funds_id", nullable = false)
    private Funds funds;

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
