package com.birdwind.springBootInit.entity.model;

import com.birdwind.springBootInit.base.annotation.I18nPrefix;
import com.birdwind.springBootInit.base.repo.AbstractModel;
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
@Table(name = "`member_role_relate`")
@I18nPrefix(value = "MemberRoleRelate")
public class MemberRoleRelate extends AbstractModel {

    private static final long serialVersionUID = 1L;

    public MemberRoleRelate(){
        this.relateId = 0;
        this.relateUuid = UUID.randomUUID().toString();
        this.status = true;
        this.createDate = new Date();
        this.updateDate = new Date();
    }

    public MemberRoleRelate(Member member, Role role){
        this();
        this.member = member;
        this.role = role;
    }

    @Id
    @Column(name = "relate_id", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer relateId;

    @Column(name = "relate_uuid", updatable = false, nullable = false)
    private String relateUuid;

    @OneToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @OneToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @CreationTimestamp
    @Column(name = "create_date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @UpdateTimestamp
    @Column(name = "update_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;

    @Column(name = "status", nullable = false)
    private Boolean status;

    @Override
    public Integer getId() {
        return this.relateId;
    }
}