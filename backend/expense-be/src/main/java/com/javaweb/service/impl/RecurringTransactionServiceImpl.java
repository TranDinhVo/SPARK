package com.javaweb.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.converter.RecurringTransactionConverter;
import com.javaweb.entity.RecurringTransactionEntity;
import com.javaweb.enums.RecurringStatusEnum;
import com.javaweb.model.request.RecurringTransactionRequestDTO;
import com.javaweb.model.response.RecurringTransactionResponseDTO;
import com.javaweb.repository.RecurringTransactionRepository;
import com.javaweb.service.RecurringTransactionService;

@Service
public class RecurringTransactionServiceImpl implements RecurringTransactionService {

    @Autowired
    private RecurringTransactionRepository recurringTransactionRepository;

    @Autowired
    private RecurringTransactionConverter recurringTransactionConverter;

    @Override
    public List<RecurringTransactionResponseDTO> getAllRecurringTransaction() {
        List<RecurringTransactionEntity> entities = recurringTransactionRepository.findAll();
        return recurringTransactionConverter.convertToResponseList(entities);
    }

    @Override
    public RecurringTransactionResponseDTO getRecurringTransactionById(Long id) {
        RecurringTransactionEntity entity = recurringTransactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giao dịch định kì có id : " + id));
        return recurringTransactionConverter.convertToResponse(entity);
    }

    @Override
    public RecurringTransactionResponseDTO createRecurringTransaction(RecurringTransactionRequestDTO recurringTransactionRequestDTO) {
        // Chuyển RequestDTO thành Entity
        RecurringTransactionEntity entity = recurringTransactionConverter.convertToEntity(recurringTransactionRequestDTO);

        // Lưu entity vào DB
        RecurringTransactionEntity savedEntity = recurringTransactionRepository.save(entity);

        // Trả về ResponseDTO cho FE
        return recurringTransactionConverter.convertToResponse(savedEntity);
    }

    @Override
    public RecurringTransactionResponseDTO updateRecurringTransaction(Long id, RecurringTransactionRequestDTO recurringTransactionRequestDTO) {
        // Kiểm tra giao dịch có tồn tại hay không
        RecurringTransactionEntity existingEntity = recurringTransactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giao dịch định kì có id : " + id));

        // Cập nhật thông tin giao dịch từ RequestDTO
        existingEntity = recurringTransactionConverter.updateEntityFromRequest(existingEntity, recurringTransactionRequestDTO);

        // Lưu lại thông tin đã cập nhật vào DB
        RecurringTransactionEntity updatedEntity = recurringTransactionRepository.save(existingEntity);

        // Trả về ResponseDTO cho client
        return recurringTransactionConverter.convertToResponse(updatedEntity);
    }

    @Override
    public RecurringTransactionResponseDTO updateRecurringTransactionStatus(Long id, RecurringStatusEnum recurringStatus) {
        // Kiểm tra giao dịch có tồn tại hay không
        RecurringTransactionEntity existingEntity = recurringTransactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giao dịch định kì có id : " + id));

        // Cập nhật trạng thái giao dịch
        existingEntity.setStatus(recurringStatus);

        // Lưu lại thông tin đã cập nhật vào DB
        RecurringTransactionEntity updatedEntity = recurringTransactionRepository.save(existingEntity);

        // Trả về ResponseDTO cho client
        return recurringTransactionConverter.convertToResponse(updatedEntity);
    }

    @Override
    public void deleteRecurringTransaction(Long id) {
        if (!recurringTransactionRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy giao dịch định kì có id : " + id);
        }
        recurringTransactionRepository.deleteById(id);
    }
}
