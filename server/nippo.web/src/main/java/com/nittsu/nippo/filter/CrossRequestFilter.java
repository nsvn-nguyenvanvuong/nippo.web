package com.nittsu.nippo.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.HttpMethod;

public class CrossRequestFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		
		if (httpRequest.getHeader("origin") != null) {
			
			HttpServletResponse httpResponse = (HttpServletResponse) response;
			httpResponse.addHeader("Access-Control-Allow-Origin", httpRequest.getHeader("origin"));
			httpResponse.addHeader("Access-Control-Allow-Headers", "X-Requested-With, origin, content-type, accept, authorization, MOBILE");
			httpResponse.addHeader("Access-Control-Allow-Credentials", "true");
			httpResponse.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
			
			if (httpRequest.getMethod().equals(HttpMethod.OPTIONS)) {
				httpResponse.setStatus(HttpServletResponse.SC_ACCEPTED);
				return;
			}
		}
		
		chain.doFilter(httpRequest, response);
	}

	@Override
	public void destroy() {
		
	}

}
