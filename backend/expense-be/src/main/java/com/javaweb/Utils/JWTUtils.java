package com.javaweb.Utils;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtils {

    @Value("${jwt.secret}")
    private String secret;

    public String generateJwtToken(String username) {
        // Tạo khóa bí mật an toàn, đảm bảo có độ dài >= 256 bits
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512); // HS512 yêu cầu khóa 512 bits

        // Lấy thời gian hiện tại
        Date now = new Date();

        // Đặt ngày hết hạn là vô hạn
        Date expiryDate = new Date(Long.MAX_VALUE);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now) // Thời gian phát hành token
                .setExpiration(expiryDate) // Thời gian hết hạn (vô hạn)
                .signWith(key) // Sử dụng khóa an toàn đã tạo
                .compact();
    }
}
