package app.reservas.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/protegido") // 🔥 Este endpoint estará protegido
public class ProtectedController {

    @GetMapping
    public String accessProtectedResource() {
        // Obtener usuario autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        return "¡Bienvenido, " + username + "! Has accedido a un recurso protegido.";
    }
}
