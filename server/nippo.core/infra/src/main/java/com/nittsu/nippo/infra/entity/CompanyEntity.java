package com.nittsu.nippo.infra.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.nittsu.nippo.infra.entity.base.BaseEntity;

@Entity
@Table(name = "COMPANY")
public class CompanyEntity extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "COMPANY_CODE")
	public String companyCode;

	@Column(name = "COMPANY_NAME")
	public String companyName;
}