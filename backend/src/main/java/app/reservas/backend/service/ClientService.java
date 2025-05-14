package app.reservas.backend.service;

import app.reservas.backend.entity.Client;
import app.reservas.backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getAllClientes() {
        return clientRepository.findAll();
    }
    
    @SuppressWarnings("unchecked")
    public Map<String, Object> gestionarCliente(Map<String, Object> payload) {
        String accion = (String) payload.get("accion");
        Map<String, Object> clienteMap = null;
        Object clienteObj = payload.get("cliente");
        if (clienteObj instanceof Map) {
            clienteMap = (Map<String, Object>) clienteObj;
        }

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
                clientRepository.save(cliente);
                break;
            case "edit":
                if (cliente.getId() != null && clientRepository.existsById(cliente.getId())) {
                    clientRepository.save(cliente);
                }
                break;
            case "delete":
                if (cliente.getId() != null && clientRepository.existsById(cliente.getId())) {
                    clientRepository.deleteById(cliente.getId());
                }
                break;
        }

        List<Client> clientes = clientRepository.findAll();
        return Map.of("clientes", clientes);
    }
}