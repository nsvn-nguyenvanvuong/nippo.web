package com.nittsu.nippo.infra.repository;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;

import com.nittsu.nippo.domain.aggregateroot.Company;
import com.nittsu.nippo.domain.repository.ICompanyRepository;
import com.nittsu.nippo.infra.entity.CompanyEntity;
import com.nittsu.nippo.infra.repository.base.BaseRepository;

@Stateless
public class CompanyRepository extends BaseRepository implements ICompanyRepository {
	@Override
	public void save(Company company) {
		CompanyEntity comEtt = new CompanyEntity();
		comEtt.companyCode = company.getCompanyCode();
		comEtt.companyName = company.getCompanyName();

		EntityManager manager = this.getEntityManager();
		manager.persist(comEtt);
	}

	@Override
	public void update(Company company) {
		EntityManager manager = this.getEntityManager();
		CompanyEntity comEtt = manager.find(CompanyEntity.class, company.getCompanyCode());
		comEtt.companyName = company.getCompanyName();
	}

	@Override
	public void remove(Company company) {
		EntityManager manager = this.getEntityManager();
		CompanyEntity comEtt = manager.find(CompanyEntity.class, company.getCompanyCode());
		manager.remove(comEtt);
	}

	@Override
	public Company find(String companyCode) {
		EntityManager manager = this.getEntityManager();
		Company comEtt = manager.find(Company.class, companyCode);
		return new Company(comEtt.getCompanyCode(), comEtt.getCompanyName());
	}

	@Override
	public List<Company> findAll() {
		EntityManager manager = this.getEntityManager();
		return manager.createQuery("SELECT c FROM CompanyEntity c", CompanyEntity.class).getResultList().stream()
				.map(entity -> {
					Company domain = new Company();

					domain.setCompanyCode(entity.companyCode);
					domain.setCompanyName(entity.companyName);

					return domain;
				}).collect(Collectors.toList());
	}
}
