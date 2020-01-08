package com.nittsu.nippo.ws.api;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.BeanParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.nittsu.nippo.app.finder.CompanyFinder;
import com.nittsu.nippo.app.finder.dto.CompanyDto;
import com.nittsu.nippo.app.handler.CompanyCommandHandler;
import com.nittsu.nippo.app.handler.command.CompanyCommand;
import com.nittsu.nippo.ws.base.WebService;

@Path("company")
@Produces(MediaType.APPLICATION_JSON)
public class CompanyWebService extends WebService {
	@Inject
	private CompanyFinder companyFinder;

	@Inject
	private CompanyCommandHandler addHandler;

	@POST
	@Path("find/{companyCode}")
	public CompanyDto find(@PathParam("companyCode") String companyCode) {
		return this.companyFinder.find(companyCode);
	}

	@POST
	@Path("find")
	public List<CompanyDto> findAll() {
		return this.companyFinder.findAll();
	}

	@POST
	@Path("save")
	public void save(@BeanParam CompanyCommand command) {
		this.addHandler.handle(command);
	}
}
