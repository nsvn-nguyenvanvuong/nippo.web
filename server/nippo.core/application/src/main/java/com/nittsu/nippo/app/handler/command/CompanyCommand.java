package com.nittsu.nippo.app.handler.command;

import javax.ws.rs.FormParam;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyCommand {

	@FormParam("companyCode")
	private String companyCode;

	@FormParam("companyName")
	private String companyName;
}
