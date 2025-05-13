package app.reservas.backend.service;

import app.reservas.backend.entity.Client;
import app.reservas.backend.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Client> getAllClientes() {
        return clienteRepository.findAll();
    }

    public Map<String, Object> gestionarCliente(Map<String, Object> payload) {
        String accion = (String) payload.get("accion");
        Map<String, Object> clienteMap = (Map<String, Object>) payload.get("cliente");

        Client cliente = new Client();
        if (clienteMap != null) {
            if (clienteMap.get("id") != null) {
                cliente.setId(Long.valueOf(clienteMap.get("id").toString()));
            }
            cliente.setName((String) clienteMap.get("name"));
            cliente.setEmail((String) clienteMap.get("email"));
            cliente.setPhone((String) clienteMap.get("phone"));
            cliente.setAddress((String) clienteMap.get("address"));
            cliente.setCity((String) clienteMap.get("city"));
            cliente.setPostalCode((String) clienteMap.get("postalCode"));
        }

        switch (accion) {
            case "add":
                cliente.setId(null);
                clienteRepository.save(cliente);
                break;
            case "edit":
                if (cliente.getId() != null && clienteRepository.existsById(cliente.getId())) {
                    clienteRepository.save(cliente);
                }
                break;
            case "delete":
                if (cliente.getId() != null && clienteRepository.existsById(cliente.getId())) {
                    clienteRepository.deleteById(cliente.getId());
                }
                break;
        }

        List<Client> clientes = clienteRepository.findAll();
        return Map.of("clientes", clientes);
    }
}