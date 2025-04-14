package com.javaweb.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaweb.entity.UserEntity;
import com.javaweb.model.request.UserRegisterRequestDTO;
import com.javaweb.model.response.UserResponseDTO;
import com.javaweb.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegisterRequestDTO user) {
        Optional<UserEntity> checkEmail = userService.findByEmail(user.getEmail());
        if (checkEmail.isPresent()) {
            return ResponseEntity.badRequest().body("Email đã được sử dụng!");
        }
        Optional<UserEntity> checkUsername = userService.findByUsername(user.getUsername());
        if (checkUsername.isPresent()) {
            return ResponseEntity.badRequest().body("Tên đăng nhập đã được sử dụng!");
        }
        UserResponseDTO newUser = userService.registerUser(user);
        return ResponseEntity.ok(newUser);
    }

    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("Xóa user thành công!");
    }
}
