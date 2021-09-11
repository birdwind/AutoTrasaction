package com.birdwind.springBootInit.entity.model;

import com.birdwind.springBootInit.base.repo.AbstractModel;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.util.Date;
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
@Table(name = "`module_function_relate`")
@Entity
public class ModuleFunctionRelate extends AbstractModel {

    private static final long serialVersionUID = 1L;

    public ModuleFunctionRelate() {
        this.moduleFunctionRelateId = 0;
    }

    public ModuleFunctionRelate(Module module, Function function) {
        this.moduleFunctionRelateId = 0;
        this.module = module;
        this.function = function;
    }

    @Id
    @Column(name = "module_function_relate_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer moduleFunctionRelateId;

    @OneToOne
    @JoinColumn(name = "module_id")
    private Module module;

    @OneToOne
    @JoinColumn(name = "function_id")
    private Function function;

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

    @Override
    public Integer getId() {
        return this.moduleFunctionRelateId;
    }

}
