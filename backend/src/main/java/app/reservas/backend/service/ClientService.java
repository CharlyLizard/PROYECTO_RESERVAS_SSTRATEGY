package app.reservas.backend.service;

import app.reservas.backend.dto.ClientDTO;
import app.reservas.backend.entity.Client;
import app.reservas.backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    // Buscar un cliente por email o crear uno nuevo
    public Client findOrCreateClient(ClientDTO clientDTO) {
        Client client = clientRepository.findByEmail(clientDTO.getEmail());
        if (client == null) {
            client = new Client();
            client.setName(clientDTO.getName());
            client.setEmail(clientDTO.getEmail());
            client.setPhone(clientDTO.getPhone());
            client.setAddress(clientDTO.getAddress());
            client.setCity(clientDTO.getCity());
            client.setPostalCode(clientDTO.getPostalCode());
            client = clientRepository.save(client);
        }
        return client;
    }
}