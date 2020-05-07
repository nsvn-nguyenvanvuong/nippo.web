package com.nittsu.nippo.infra.entity.base;

import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

@MappedSuperclass
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class BaseEntity {
	
	@PrePersist
	private void setInsertingMetaInfo() {
	}

	@PreUpdate
	private void setUpdatingMetaInfo() {
	}
}
