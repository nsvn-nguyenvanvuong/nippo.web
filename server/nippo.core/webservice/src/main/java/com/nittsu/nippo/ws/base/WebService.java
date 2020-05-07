package com.nittsu.nippo.ws.base;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class WebService implements ExceptionMapper<Throwable> {

	/**
	 * Handle exceptions
	 */
	@Override
	public Response toResponse(Throwable unhandledError) {
		unhandledError.printStackTrace();
		return Response.status(Response.Status.INTERNAL_SERVER_ERROR).type(MediaType.APPLICATION_JSON).build();
	}
}
