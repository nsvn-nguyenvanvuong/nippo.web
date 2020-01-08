package com.nittsu.nippo.domain.aggregateroot;

import com.nittsu.nippo.domain.base.DomainObject;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Company extends DomainObject {
	private String companyCode;
	private String companyName;
}
