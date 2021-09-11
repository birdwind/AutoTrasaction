package com.birdwind.springBootInit.base.repo;

import org.hibernate.proxy.HibernateProxy;
import org.hibernate.proxy.LazyInitializer;
import java.io.Serializable;

public interface BaseModel extends Serializable {

    Integer getId();

    boolean isCreate();

    void setStatus(Boolean status);

    default void delete() {
        this.setStatus(false);
    }

    @SuppressWarnings("unchecked")
    default <E extends BaseModel> boolean equalsTo(E object) {
        if (object == null) {
            return false;
        }

        if (object instanceof HibernateProxy) {
            HibernateProxy hibernateProxy = (HibernateProxy) object;
            LazyInitializer initializer = hibernateProxy.getHibernateLazyInitializer();
            object = (E) initializer.getImplementation();
        }

        if (object.getClass() != getClass()) {
            return false;
        }

        return this.getId().equals(object.getId());
    }

}
