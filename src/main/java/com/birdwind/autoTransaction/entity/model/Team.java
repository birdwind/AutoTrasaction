package com.birdwind.autoTransaction.entity.model;

import com.birdwind.autoTransaction.base.annotation.I18nPrefix;
import com.birdwind.autoTransaction.base.repo.AbstractModel;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
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
@Table(name = "`team`")
@I18nPrefix(value = "Team")
public class Team extends AbstractModel {

    public Team() {
        this.teamId = 0;
        this.teamUuid = UUID.randomUUID().toString();
        this.createDate = new Date();
        this.updateDate = new Date();
        this.status = true;
    }

    public Team(String teamNo, Member creator) {
        this();
        this.teamNo = teamNo;
        this.creator = creator;
    }

    @Id
    @Column(name = "team_id", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer teamId;

    @Column(name = "team_uuid", updatable = false, nullable = false)
    private String teamUuid;

    @Column(name = "team_no", updatable = false, nullable = false)
    private String teamNo;

    @Column(name = "team_value", updatable = false, nullable = false)
    private String teamValue;

    @OneToOne
    @JoinColumn(name = "creator")
    private Member creator;

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

    @OneToMany(targetEntity = MemberTeamRelate.class, fetch = FetchType.LAZY, mappedBy = "team")
    private List<MemberTeamRelate> memberTeamRelateList;

    @Override
    public Integer getId() {
        return this.teamId;
    }
}
