import React from 'react';
import { MessageCircle } from 'lucide-react';
import './SparkLandingPage.scss';

const SparkLandingPage = () => {
  return (
    <div className="spark-landing">
      
      {/* SPARK Background Text */}
      <div className="spark-background">
        <div className="spark-text-container">
          <span className="spark-text-small">
            SPARK
          </span>
          <h1 className="spark-text-large">
            SPARK
          </h1>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="main-container">
        <div className="content-grid">
          
          {/* Left Side - Devices */}
          <div className="devices-section">
            <div className="devices-container">
              
              {/* Tablet - Standing upright */}
              <div className="device tablet">
                <div className="screen"></div>
                <div className="home-button"></div>
              </div>

              {/* Phone - In front of tablet, slightly to the right */}
              <div className="device phone">
                <div className="screen"></div>
                <div className="notch"></div>
              </div>

              {/* Laptop - Open, behind and to the right */}
              <div className="device laptop">
                <div className="laptop-screen">
                  <div className="screen"></div>
                  <div className="keyboard-area"></div>
                </div>
                <div className="laptop-base"></div>
              </div>

            </div>
          </div>

          {/* Right Side - Content */}
          <div className="content-section">
            
            {/* Question Box */}
            <div className="question-box">
              <h2 className="question-title">
                Bạn có câu hỏi?
              </h2>
              <p className="question-text">
                Bạn có câu hỏi cần giải đáp?<br />
                Hãy liên hệ với chúng tôi
              </p>
              <button className="support-button">
                <MessageCircle size={20} />
                Trung tâm hỗ trợ
              </button>
            </div>

            {/* App Description */}
            <div className="app-description">
              <h3 className="app-title">
                Ứng dụng Số thu chi SPARK
              </h3>
              <p className="app-subtitle">
                Quản lý tài chính cá nhân chưa bao giờ dễ dàng và rõ ràng đến thế!
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Decorative floating elements */}
      <div className="floating-element element-1"></div>
      <div className="floating-element element-2"></div>
      <div className="floating-element element-3"></div>
    </div>
  );
};

export default SparkLandingPage;