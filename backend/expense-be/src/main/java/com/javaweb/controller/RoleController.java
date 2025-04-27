package com.javaweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.HashMap;
import java.util.Map;

import com.javaweb.ControllerAdvice.CustomException.ResourceNotFoundException;
import com.javaweb.model.request.RoleRequestDTO;
import com.javaweb.model.response.RoleResponseDTO;
import com.javaweb.service.RoleService;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    // Lấy tất cả vai trò
    @GetMapping
    public List<RoleResponseDTO> getAllRoles() {
        return roleService.getAllRoles();
    }
    // Lấy vai trò theo ID
    @GetMapping("/{id}")
    public RoleResponseDTO getRolesById(@PathVariable Long id) {
        RoleResponseDTO role = roleService.getRoleById(id);
        if (role == null) {
            throw new ResourceNotFoundException("Không tìm thấy vai trò theo id: " + id);
        }
        return role;
    }


    // Tạo một vai trò mới
    @PostMapping
    public RoleResponseDTO createRole(@RequestBody RoleRequestDTO roleRequestDTO) {
        return roleService.createRole(roleRequestDTO);
    }

    
    // Cập nhật một vai trò
    @PatchMapping("/{id}")
    public RoleResponseDTO updateRole(@PathVariable Long id, @RequestBody RoleRequestDTO roleRequestDTO) {
        return roleService.updateRole(id, roleRequestDTO);
    }

    // Xóa một vai trò
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Đã xóa vai trò với id: " + id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
