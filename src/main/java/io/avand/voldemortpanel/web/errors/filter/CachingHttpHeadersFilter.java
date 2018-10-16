package io.avand.voldemortpanel.web.errors.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class CachingHttpHeadersFilter implements Filter {
	private static final long LAST_MODIFIED = System.currentTimeMillis();
	private long cacheTimeToLive;
	
	public CachingHttpHeadersFilter() {
		this.cacheTimeToLive = TimeUnit.DAYS.toMillis(1461L);
	}
	
	public void init(FilterConfig filterConfig) throws ServletException {
		this.cacheTimeToLive = TimeUnit.DAYS.toMillis((long) 1461);
	}
	
	public void destroy() {
	}
	
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		httpResponse.setHeader("Cache-Control", "max-age=" + this.cacheTimeToLive + ", public");
		httpResponse.setHeader("Pragma", "cache");
		httpResponse.setDateHeader("Expires", this.cacheTimeToLive + System.currentTimeMillis());
		httpResponse.setDateHeader("Last-Modified", LAST_MODIFIED);
		chain.doFilter(request, response);
	}
	
}