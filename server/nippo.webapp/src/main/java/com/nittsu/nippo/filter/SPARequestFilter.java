package com.nittsu.nippo.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class SPARequestFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String path = httpRequest.getServletPath();

        if (isAllowed(path)) {
            chain.doFilter(httpRequest, response);
        } else {
            httpRequest.getRequestDispatcher("/index.html").forward(request, response);
        }
    }

    private boolean isAllowed(String req) {
        final List<String> allowed = Arrays.asList("/nts.hl.ipo.web/webapi/", "/nts.hl.ipo.web/js/",
                "/nts.hl.ipo.web/css/", "/nts.hl.ipo.web/img/", "/nts.hl.ipo.web/fonts/");

        for (String path : allowed) {
            if (req.startsWith(path)) {
                return true;
            }
        }

        return false;
    }

    @Override
    public void destroy() {

    }
}
