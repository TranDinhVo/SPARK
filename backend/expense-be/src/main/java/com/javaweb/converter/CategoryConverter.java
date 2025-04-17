package com.javaweb.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.javaweb.entity.CategoryEntity;
import com.javaweb.entity.UserEntity;
import com.javaweb.enums.CategoryTypeEnum;
import com.javaweb.model.request.CategoryRequestDTO;
import com.javaweb.model.response.CategoryResponseDTO;

@Component
public class CategoryConverter {
    
    @Autowired
    private ModelMapper modelMapper;
    
    public CategoryResponseDTO convertToResponse(CategoryEntity entity) {
        //mapper từ entity -> response
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        CategoryResponseDTO response = modelMapper.map(entity, CategoryResponseDTO.class);
        
        // Set userId from userCategory
        if (entity.getUserCategory() != null) {
            response.setUserId(entity.getUserCategory().getId());
        }
        
        // Set type string value
        if (entity.getType() != null) {
            response.setType(entity.getType().name());
        }
        
        return response;
    }
    
    public CategoryEntity convertToEntity(CategoryRequestDTO request, UserEntity user) {
        CategoryEntity entity = new CategoryEntity();
        entity.setName(request.getName());
        entity.setColor(request.getColor());
        entity.setIconUrl(request.getIconUrl());
        entity.setUserCategory(user);
        
        // Convert type string to enum
        if (request.getType() != null) {
            try {
                entity.setType(CategoryTypeEnum.valueOf(request.getType()));
            } catch (IllegalArgumentException e) {
                // Handle invalid type
                throw new IllegalArgumentException("Invalid category type: " + request.getType());
            }
        }
        
        return entity;
    }
    
    public void updateEntityFromRequest(CategoryEntity entity, CategoryRequestDTO request) {
        if (request.getName() != null) {
            entity.setName(request.getName());
        }
        if (request.getColor() != null) {
            entity.setColor(request.getColor());
        }
        if (request.getIconUrl() != null) {
            entity.setIconUrl(request.getIconUrl());
        }
        if (request.getType() != null) {
            try {
                entity.setType(CategoryTypeEnum.valueOf(request.getType()));
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid category type: " + request.getType());
            }
        }
    }
    
    public List<CategoryResponseDTO> convertToResponseList(List<CategoryEntity> entities) {
        //return đồng thời add từng entity -> list
        List<CategoryResponseDTO> result = entities.stream()
                .map(entity -> convertToResponse(entity))
                .collect(Collectors.toList()); 
        return result;
    }
}