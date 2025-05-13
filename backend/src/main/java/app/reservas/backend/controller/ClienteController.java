package app.reservas.backend.controller;

import app.reservas.backend.entity.Client;
import app.reservas.backend.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    @Autowired
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping("/all")
    public List<Client> getAllClientes() {
        return clienteService.getAllClientes();
    }

    @PostMapping("/gestionar")
    public ResponseEntity<?> gestionarCliente(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(clienteService.gestionarCliente(payload));
    }
}