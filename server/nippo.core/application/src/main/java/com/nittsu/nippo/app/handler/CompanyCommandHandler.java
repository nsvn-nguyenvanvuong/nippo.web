package com.nittsu.nippo.app.handler;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.nittsu.nippo.app.handler.command.CompanyCommand;
import com.nittsu.nippo.domain.aggregateroot.Company;
import com.nittsu.nippo.domain.repository.ICompanyRepository;

@Stateless
public class CompanyCommandHandler {
	@Inject 
	private ICompanyRepository companyRepo;
	
	public void handle (CompanyCommand command){
		Company company = new Company(command.getCompanyCode(), command.getCompanyName());
		this.companyRepo.save(company);
	}
}
