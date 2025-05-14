package app.reservas.backend.service;

import app.reservas.backend.dto.AdminDTO;
import app.reservas.backend.entity.Admin;
import app.reservas.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public AdminDTO convertToDTO(Admin admin) {
        AdminDTO dto = new AdminDTO();
        dto.setId(admin.getId());
        dto.setNombre(admin.getNombre());
        dto.setApellido(admin.getApellido());
        dto.setNombreUsuario(admin.getNombreUsuario());
        dto.setEmail(admin.getEmail());
        dto.setTelefono(admin.getTelefono());
        dto.setTelefonoMovil(admin.getTelefonoMovil());
        dto.setDomicilio(admin.getDomicilio());
        dto.setCiudad(admin.getCiudad());
        dto.setEstado(admin.getEstado());
        dto.setCodigoPostal(admin.getCodigoPostal());
        dto.setNotas(admin.getNotas());
        dto.setCalendario(admin.getCalendario());
        dto.setIdioma(admin.getIdioma());
        dto.setZonaHoraria(admin.getZonaHoraria());
        dto.setRecibirNotificaciones(admin.getRecibirNotificaciones());
        return dto;
    }

    public Admin convertToEntity(AdminDTO dto) {
        Admin admin = new Admin();
        admin.setId(dto.getId());
        admin.setNombre(dto.getNombre());
        admin.setApellido(dto.getApellido());
        admin.setNombreUsuario(dto.getNombreUsuario());
        admin.setEmail(dto.getEmail());
        admin.setTelefono(dto.getTelefono());
        admin.setTelefonoMovil(dto.getTelefonoMovil());
        admin.setDomicilio(dto.getDomicilio());
        admin.setCiudad(dto.getCiudad());
        admin.setEstado(dto.getEstado());
        admin.setCodigoPostal(dto.getCodigoPostal());
        admin.setNotas(dto.getNotas());
        admin.setCalendario(dto.getCalendario());
        admin.setIdioma(dto.getIdioma());
        admin.setZonaHoraria(dto.getZonaHoraria());
        admin.setRecibirNotificaciones(dto.getRecibirNotificaciones());
        return admin;
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> gestionarAdmin(Map<String, Object> payload) {
        String accion = (String) payload.get("accion");
        Map<String, Object> adminMap = null;
        Object adminObj = payload.get("admin");
        if (adminObj instanceof Map<?, ?>) {
            adminMap = (Map<String, Object>) adminObj;
        }
            
        Admin admin = new Admin();
        if (adminMap != null) {
            if (adminMap.get("id") != null) {
                admin.setId(Long.valueOf(adminMap.get("id").toString()));
            }
            admin.setNombre((String) adminMap.get("nombre"));
            admin.setApellido((String) adminMap.get("apellido"));
            admin.setNombreUsuario((String) adminMap.get("nombreUsuario"));
            admin.setEmail((String) adminMap.get("email"));
            admin.setTelefono((String) adminMap.get("telefono"));
            admin.setTelefonoMovil((String) adminMap.get("telefonoMovil"));
            admin.setDomicilio((String) adminMap.get("domicilio"));
            admin.setCiudad((String) adminMap.get("ciudad"));
            admin.setEstado((String) adminMap.get("estado"));
            admin.setCodigoPostal((String) adminMap.get("codigoPostal"));
            admin.setNotas((String) adminMap.get("notas"));
            admin.setCalendario((String) adminMap.get("calendario"));
            admin.setIdioma((String) adminMap.get("idioma"));
            admin.setZonaHoraria((String) adminMap.get("zonaHoraria"));
            admin.setRecibirNotificaciones(adminMap.get("recibirNotificaciones") != null ? Boolean.valueOf(adminMap.get("recibirNotificaciones").toString()) : false);

            if (adminMap.get("password") != null && !((String) adminMap.get("password")).isEmpty()) {
                admin.setPassword(passwordEncoder.encode((String) adminMap.get("password")));
            } else if (admin.getId() != null) {
                admin.setPassword(adminRepository.findById(admin.getId())
                        .map(Admin::getPassword)
                        .orElse(null));
            }
        }

        switch (accion) {
            case "add":
                admin.setId(null);
                adminRepository.save(admin);
                break;
            case "edit":
                if (admin.getId() != null && adminRepository.existsById(admin.getId())) {
                    adminRepository.save(admin);
                }
                break;
            case "delete":
                if (admin.getId() != null && adminRepository.existsById(admin.getId())) {
                    adminRepository.deleteById(admin.getId());
                }
                break;
        }

        List<Admin> administradores = adminRepository.findAll();
        return Map.of("administradores", administradores);
    }

    public AdminDTO actualizarAdmin(AdminDTO adminDto) {
        Admin admin = adminRepository.findById(adminDto.getId()).orElse(null);
        if (admin == null) {
            throw new RuntimeException("Administrador no encontrado");
        }

        admin.setNombre(adminDto.getNombre());
        admin.setApellido(adminDto.getApellido());
        admin.setNombreUsuario(adminDto.getNombreUsuario());
        admin.setEmail(adminDto.getEmail());
        admin.setTelefono(adminDto.getTelefono());
        admin.setTelefonoMovil(adminDto.getTelefonoMovil());
        admin.setDomicilio(adminDto.getDomicilio());
        admin.setCiudad(adminDto.getCiudad());
        admin.setEstado(adminDto.getEstado());
        admin.setCodigoPostal(adminDto.getCodigoPostal());
        admin.setNotas(adminDto.getNotas());
        admin.setCalendario(adminDto.getCalendario());
        admin.setIdioma(adminDto.getIdioma());
        admin.setZonaHoraria(adminDto.getZonaHoraria());
        admin.setRecibirNotificaciones(adminDto.getRecibirNotificaciones());

        adminRepository.save(admin);
        return convertToDTO(admin);
    }
}