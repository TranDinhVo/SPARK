//package com.javaweb.service;
//
//import java.util.List;
//import java.util.Optional;
//
//import com.javaweb.entity.UserEntity;
//import com.javaweb.model.request.RegisterRequestDTO;
//import com.javaweb.model.request.UserRegisterRequestDTO;
//import com.javaweb.model.response.UserResponseDTO;
//
//public interface UserService {
//	UserResponseDTO registerUser(UserRegisterRequestDTO userRegisterRequestDTO);
//	UserResponseDTO registerAuth(RegisterRequestDTO registerRequestDTO );
//	
//    Optional<UserEntity> findByEmail(String email);
//    Optional<UserEntity> findByUsername(String username);
//    public boolean checkPassword(String rawPassword, String encodedPassword);
//    List<UserResponseDTO> getAllUsers();
//    Optional<UserResponseDTO> getUserById(Long id);
//    void deleteUser(Long id);
//    
//}
