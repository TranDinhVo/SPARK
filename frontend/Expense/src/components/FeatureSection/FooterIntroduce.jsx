import React from 'react';
import { Mail, Youtube, Facebook, Phone, MapPin } from 'lucide-react';
import './FooterIntroduce.scss';

const FooterIntroduce = () => {
  return (
    <footer className="spark-footer">
      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-logo">
          <div className="logo-container">
            <div className="logo-icon">
              <img src="src/assets/images/logoSpark.png" alt="SPARK Logo" />
            </div>
            <div className="logo-text">SPARK</div>
          </div>
          <div className="social-icons">
            <a href="mailto:contact@spark.com" className="social-icon">
              <Mail size={20} />
            </a>
            <a href="#" className="social-icon">
              <Youtube size={20} />
            </a>
            <a href="#" className="social-icon">
              <Facebook size={20} />
            </a>
            <a href="tel:+84123456789" className="social-icon">
              <Phone size={20} />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Thông tin liên hệ</h3>
          <div className="contact-list">
            <div className="contact-item">
              <Mail size={16} className="contact-icon" />
              <a href="mailto:645107102@gst.utc2.edu.vn">645107102@gst.utc2.edu.vn</a>
            </div>
            <div className="contact-item">
              <Mail size={16} className="contact-icon" />
              <a href="mailto:645107102@gst.utc2.edu.vn">645107102@gst.utc2.edu.vn</a>
            </div>
            <div className="contact-item">
              <Mail size={16} className="contact-icon" />
              <a href="mailto:645107108@gst.utc2.edu.vn">645107108@gst.utc2.edu.vn</a>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="footer-section">
          <h3>Trụ sở chính</h3>
          <div className="contact-item">
            <MapPin size={16} className="contact-icon" />
            <p>448 Lê Văn Việt, Tăng Nhơn Phú A<br />Thành Phố Thủ Đức</p>
          </div>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>Chính sách & Dịch vụ</h3>
          <div className="service-links">
            <a href="/privacy-policy">Chính sách bảo mật</a>
            <a href="/terms-of-service">Điều khoản sử dụng</a>
            <a href="/customer-support">Hỗ trợ khách hàng</a>
            <a href="/updates-reports">Cập nhật & Báo cáo</a>
            <a href="/user-guide">Hướng dẫn sử dụng</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>Copyright © Designed by <strong>SPARK</strong> team</p>
      </div>
    </footer>
  );
};

export default FooterIntroduce;