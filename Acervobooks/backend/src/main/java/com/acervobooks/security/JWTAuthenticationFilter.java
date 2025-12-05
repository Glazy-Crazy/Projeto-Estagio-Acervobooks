package com.acervobooks.security;

import com.acervobooks.services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JWTUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;

    public JWTAuthenticationFilter(JWTUtils jwtUtils, UserDetailsServiceImpl userDetailsService) {
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        
        // Pula autenticação para rotas públicas
        String path = request.getRequestURI();
        if (path.startsWith("/auth/") || path.startsWith("/h2-console/")) {
            chain.doFilter(request, response);
            return;
        }
        
        try {
            String token = getTokenFromRequest(request);
            System.out.println("=== JWT Filter - Path: " + path + ", Token present: " + (token != null));
            
            if (token != null) {
                System.out.println("Token: " + token.substring(0, Math.min(20, token.length())) + "...");
                boolean isValid = jwtUtils.isTokenValid(token);
                System.out.println("Token valid: " + isValid);
                
                if (isValid) {
                    String username = jwtUtils.getUsername(token);
                    System.out.println("Username from token: " + username);
                    var userDetails = userDetailsService.loadUserByUsername(username);
                    var auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    System.out.println("Authentication set successfully for user: " + username);
                } else {
                    System.out.println("Token is invalid");
                }
            } else {
                System.out.println("No token found in request");
            }
        } catch (Exception e) {
            // Log do erro mas continua o filtro sem autenticar
            System.out.println("Erro ao configurar autenticação: " + e.getMessage());
            e.printStackTrace();
        }
        chain.doFilter(request, response);
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
