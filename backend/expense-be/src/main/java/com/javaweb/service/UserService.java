package com.javaweb.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.javaweb.entity.UserEntity;
import com.javaweb.repository.UserRepository;

@Service
public class UserService {
	
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Đăng ký user mới
    public UserEntity registerUser(UserEntity user) {
        user.setPassword(passwordEncoder.encode( user.getPassword() ) ); // Mã hóa mật khẩu
        return userRepository.save(user);
    }

    // Tìm user theo email
    public Optional<UserEntity> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    // Tìm user theo username
    public Optional<UserEntity> findByUsername(String email) {
        return userRepository.findByUsername(email);
    }

    // Lấy danh sách tất cả user
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    // Lấy user theo ID
    public Optional<UserEntity> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Xóa user theo ID
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
