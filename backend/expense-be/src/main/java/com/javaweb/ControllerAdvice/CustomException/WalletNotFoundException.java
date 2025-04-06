package com.javaweb.ControllerAdvice.CustomException;

public class WalletNotFoundException extends RuntimeException {
	// Constructor mặc định
    public WalletNotFoundException() {
        super("Wallet not found");
    }

    // Constructor có tham số
    public WalletNotFoundException(String message) {
        super(message);
    }

    // Constructor có tham số cho phép thêm Throwable cause
    public WalletNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    // Constructor cho phép thêm Throwable cause mà không cần message
    public WalletNotFoundException(Throwable cause) {
        super(cause);
    }
}
