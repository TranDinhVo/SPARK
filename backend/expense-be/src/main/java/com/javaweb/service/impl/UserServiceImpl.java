package com.javaweb.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.javaweb.converter.UserConverter;
import com.javaweb.entity.RoleEntity;
import com.javaweb.entity.UserEntity;
import com.javaweb.model.request.RegisterRequestDTO;
import com.javaweb.model.request.UserRegisterRequestDTO;
import com.javaweb.model.response.UserResponseDTO;
import com.javaweb.repository.RoleRepository;
import com.javaweb.repository.UserRepository;
import com.javaweb.service.UserService;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserResponseDTO registerUser(UserRegisterRequestDTO userRegisterRequestDTO) {
    	UserEntity user = modelMapper.map(userRegisterRequestDTO, UserEntity.class);
        user.setPassword(passwordEncoder.encode(userRegisterRequestDTO.getPassword()));
        if (userRegisterRequestDTO.getRoles() == null || userRegisterRequestDTO.getRoles().isEmpty()) {
        	List<RoleEntity> roles = new ArrayList<>();
            RoleEntity defaultRole = roleRepository.findByCode("STAFF")
                .orElseThrow(() -> new RuntimeException("ROLE_USER không tồn tại trong hệ thống"));
            roles.add(defaultRole);
            user.setRoles(roles);
        }
        UserEntity savedUser = userRepository.save(user);
        return UserConverter.convertToDTO(savedUser);
    }
    
    @Override
    public UserResponseDTO registerAuth(RegisterRequestDTO registerRequestDTO) {
    	UserEntity user = modelMapper.map(registerRequestDTO, UserEntity.class);
        user.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));

        RoleEntity defaultRole = roleRepository.findByCode("STAFF")
        	    .orElseThrow(() -> new RuntimeException("Role mặc định 'STAFF' không tồn tại"));

        List<RoleEntity> roles = new ArrayList<>();
        roles.add(defaultRole);
        user.setRoles(roles);
        UserEntity savedUser = userRepository.save(user);
        return UserConverter.convertToDTO(savedUser);
    }


    @Override
    public Optional<UserEntity> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<UserEntity> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        return users.stream()
                .map(UserConverter::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<UserResponseDTO> getUserById(Long id) {
        Optional<UserEntity> userEntity = userRepository.findById(id);
        return userEntity.map(UserConverter::convertToDTO);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
