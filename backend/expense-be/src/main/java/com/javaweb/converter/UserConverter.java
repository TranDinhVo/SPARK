package com.javaweb.converter;

import java.util.List;
import java.util.stream.Collectors;

import com.javaweb.entity.UserEntity;
import com.javaweb.model.response.UserResponseDTO;

public class UserConverter {
    public static UserResponseDTO convertToDTO(UserEntity userEntity) {
        // Chuyển đổi danh sách roles từ List<RoleEntity> sang List<String>
        List<String> roleNames = userEntity.getRoles().stream()
                                           .map(role -> role.getName())  // Giả sử RoleEntity có phương thức getName()
                                           .collect(Collectors.toList());

        return new UserResponseDTO(
            userEntity.getId(),
            userEntity.getUsername(),
            userEntity.getFullname(),
            userEntity.getEmail(),
            userEntity.getPhone(),
            userEntity.getCurrency(),
            userEntity.getStatus(),
            userEntity.getCreatedAt(),
            roleNames
        );
    }
}
