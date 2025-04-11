//package com.javaweb.service.impl;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.javaweb.entity.RoleEntity;
//import com.javaweb.model.request.RoleRequestDTO;
//import com.javaweb.model.response.RoleResponseDTO;
//import com.javaweb.repository.RoleRepository;
//import com.javaweb.service.RoleService;
//
//@Service
//public class RoleServiceImpl implements RoleService {
//
//    @Autowired
//    private RoleRepository roleRepository;
//
//    @Override
//    public List<RoleResponseDTO> getAllRoles() {
//        return roleRepository.findAll().stream()
//            .map(role -> new RoleResponseDTO(role.getId(), role.getName(), role.getCode()))
//            .collect(Collectors.toList());
//    }
//
//    @Override
//    public RoleResponseDTO getRoleById(Long id) {
//        RoleEntity roleEntity = roleRepository.findById(id).orElse(null);
//        if (roleEntity != null) {
//            return new RoleResponseDTO(roleEntity.getId(), roleEntity.getName(), roleEntity.getCode());
//        }
//        return null;
//    }
//
//    @Override
//    public RoleResponseDTO createRole(RoleRequestDTO roleRequestDTO) {
//        if (roleRequestDTO.getName() == null || roleRequestDTO.getCode() == null) {
//            throw new IllegalArgumentException("Tên và mã vai trò không được để trống.");
//        }
//
//        // Tạo mới RoleEntity từ DTO
//        RoleEntity roleEntity = new RoleEntity();
//        roleEntity.setName(roleRequestDTO.getName());
//        roleEntity.setCode(roleRequestDTO.getCode());
//
//        // Lưu vào database
//        RoleEntity savedRole = roleRepository.save(roleEntity);
//
//        // Trả về DTO kết quả
//        return new RoleResponseDTO(savedRole.getId(), savedRole.getName(), savedRole.getCode());
//    }
//
//
//    @Override
//    public RoleResponseDTO updateRole(Long id, RoleRequestDTO roleRequestDTO) {
//        return roleRepository.findById(id).map(roleEntity -> {
//            if (roleRequestDTO.getName() != null) {
//                roleEntity.setName(roleRequestDTO.getName());
//            }
//            if (roleRequestDTO.getCode() != null) {
//                roleEntity.setCode(roleRequestDTO.getCode());
//            }
//
//            RoleEntity updatedRole = roleRepository.save(roleEntity);
//            return new RoleResponseDTO(updatedRole.getId(), updatedRole.getName(), updatedRole.getCode());
//        }).orElse(null);
//    }
//
//
//    @Override
//    public void deleteRole(Long id) {
//        roleRepository.deleteById(id);
//    }
//}
