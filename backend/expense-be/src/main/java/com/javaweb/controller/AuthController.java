package com.javaweb.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaweb.Utils.JWTUtils;
import com.javaweb.entity.UserEntity;
import com.javaweb.model.request.LoginRequestDTO;
import com.javaweb.model.request.RegisterRequestDTO;
import com.javaweb.model.response.LoginResponseDTO;
import com.javaweb.model.response.UserResponseDTO;
import com.javaweb.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // Mã hóa mật khẩu

    @Autowired
    private JWTUtils jwtUtils; // Giả sử bạn có JWTUtil để tạo token

    // Đăng ký người dùng mới
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequestDTO registerDTO) {
        // Kiểm tra username và email đã tồn tại
        if (userService.findByUsername(registerDTO.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Tên đăng nhập đã tồn tại.");
        }
        if (userService.findByEmail(registerDTO.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email đã được sử dụng.");
        }
        // Gọi service để xử lý đăng ký
        UserResponseDTO savedUser = userService.registerAuth(registerDTO);
        return ResponseEntity.ok(savedUser);
    }


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDTO loginRequest) {
        Optional<UserEntity> userOpt = userService.findByUsername(loginRequest.getUsername());

        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();

            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                String token = jwtUtils.generateJwtToken(user.getUsername());

                LoginResponseDTO response = new LoginResponseDTO();
                response.setToken(token);
                response.setUsername(user.getUsername());
                response.setId(user.getId());
                response.setFullname(user.getFullname());

                // Lấy danh sách tên quyền từ roles
                List<String> roleNames = user.getRoles().stream()
                    .map(role -> role.getCode()) 
                    .collect(Collectors.toList());
                response.setRoles(roleNames);

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(401).body("Mật khẩu không đúng.");
            }
        } else {
            return ResponseEntity.status(401).body("Tên đăng nhập không tồn tại.");
        }
    }

}
