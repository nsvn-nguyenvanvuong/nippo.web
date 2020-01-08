package  com.nittsu.nippo.domain.repository;

import java.util.List;

import com.nittsu.nippo.domain.aggregateroot.Company;

public interface ICompanyRepository {

	public void save(Company company);
	
	public void update(Company company);
	
	public void remove(Company company);
	
	public Company find(String companyCode);
	
	public List<Company> findAll();
}
