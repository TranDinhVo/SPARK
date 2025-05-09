package com.javaweb.converter;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.javaweb.entity.RecurringTransactionEntity;
import com.javaweb.enums.RecurringTypeEnum;
import com.javaweb.model.dto.RecurrenceStatusDTO;
import com.javaweb.model.request.RecurringTransactionRequestDTO;
import com.javaweb.model.response.RecurringTransactionResponseDTO;
@Component
public class RecurringTransactionConverter {
    @Autowired
    private ModelMapper modelMapper;
    // Chuyển từ Entity sang ResponseDTO
    public RecurringTransactionResponseDTO convertToResponse(RecurringTransactionEntity entity) {
        RecurringTransactionResponseDTO response = modelMapper.map(entity, RecurringTransactionResponseDTO.class);

        // Ánh xạ giá trị cho RecurrenceStatusDTO riêng
        response.setStatus(new RecurrenceStatusDTO(
                entity.getStatus().getCode(), 
                entity.getStatus().getLabel()
        ));
        return response;
    }
    // Chuyển từ danh sách Entity sang danh sách ResponseDTO
    public List<RecurringTransactionResponseDTO> convertToResponseList(List<RecurringTransactionEntity> entities) {
        return entities.stream()
                .map(it -> convertToResponse(it))
                .collect(Collectors.toList());
    }
    // Chuyển từ RequestDTO sang Entity
    public RecurringTransactionEntity convertToEntity(RecurringTransactionRequestDTO requestDTO) {
        RecurringTransactionEntity entity = modelMapper.map(requestDTO, RecurringTransactionEntity.class);
        // Đảm bảo entity không có ID khi đang tạo mới
        entity.setId(null); // Thêm dòng này để đảm bảo ID là null khi tạo mới
        return entity;
    }
    // Cập nhật từ RequestDTO vào Entity khi cần
    public RecurringTransactionEntity updateEntityFromRequest(RecurringTransactionEntity existingEntity, RecurringTransactionRequestDTO requestDTO) {
        if (requestDTO.getRecurrenceType() != null) {
            // Chuyển đổi String thành Enum
            existingEntity.setRecurrenceType(RecurringTypeEnum.valueOf(requestDTO.getRecurrenceType().toUpperCase()));
        }
        if (requestDTO.getName() != null) {
            existingEntity.setName(requestDTO.getName());
        }
        if (requestDTO.getStatus() != null) {
            existingEntity.setStatus(requestDTO.getStatus());
        }
        if (requestDTO.getNextDueDate() != null) {
            existingEntity.setNextDueDate(requestDTO.getNextDueDate());
        }
        if (requestDTO.getCreateAt() != null) {
            existingEntity.setCreateAt(requestDTO.getCreateAt());
        }
        return existingEntity;
    }
}
//tự động tạo giao dịch, tự động cộng dồn ngày, check valid date hợp lệ không