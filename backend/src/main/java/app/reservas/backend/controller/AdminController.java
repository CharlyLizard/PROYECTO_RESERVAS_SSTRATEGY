package app.reservas.backend.controller;

import app.reservas.backend.entity.Admin;
import app.reservas.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/all")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @PostMapping("/gestionar")
    public ResponseEntity<?> gestionarAdmin(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(adminService.gestionarAdmin(payload));
    }
}