package app.reservas.backend.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Enumeration;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        System.out.println("*************************** FILTRO JWT ACTIVADO **************************");
        System.out.println("Solicitud recibida en: "+request.getRequestURI());
        System.out.println("***************************************************************************");

        System.out.println("********************** CABECERAS ***************************");
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String header = headerNames.nextElement();
            System.out.println(header + ": " + request.getHeader(header));
        }
        System.out.println("***************************************************************");

        final String authHeader = request.getHeader("Authorization");
        System.out.println("* authHeader:"+authHeader);
        final String token;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("* palanteeeeeeeeeeeeeeeeeeee...............");
            filterChain.doFilter(request, response);
            return;
        }

        token = authHeader.substring(7); // Quitar "Bearer " del token
        username = jwtService.extractUsername(token); // Extraer usuario

        System.out.println("* username:"+username);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtService.isTokenValid(token, userDetails)) {
                List<GrantedAuthority> authorities = jwtService.extractRoles(token).stream()
                        .map(SimpleGrantedAuthority::new) // Ya tienen "ROLE_" en el token
                        .collect(Collectors.toList());

                System.out.println("************ ROLES AUTENTICADOS ************");
                authorities.forEach(auth -> System.out.println(auth.getAuthority()));
                System.out.println("********************************************");

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, authorities);

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
                System.out.println(" **************** Autenticación establecida en el contexto de seguridad ************************");
            }
        }

        filterChain.doFilter(request, response);
    }
}


