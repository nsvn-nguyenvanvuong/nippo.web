package com.nittsu.nippo.app.finder;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.nittsu.nippo.app.finder.dto.CompanyDto;
import com.nittsu.nippo.domain.aggregateroot.Company;
import com.nittsu.nippo.domain.repository.ICompanyRepository;

@Stateless
public class CompanyFinder {
	@Inject
	private ICompanyRepository companyRepo;
	
	public CompanyDto find(String companyCode) {
		Company company = this.companyRepo.find(companyCode);
		return new CompanyDto(company.getCompanyCode(), company.getCompanyName());
	}
	
	public List<CompanyDto> findAll() {
		return this.companyRepo.findAll().stream().map(
				c -> new CompanyDto(c.getCompanyCode(), c.getCompanyName()))
				.collect(Collectors.toList());
	}
}
