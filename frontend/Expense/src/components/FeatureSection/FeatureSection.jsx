import React from 'react';

export function FeatureItem({ icon, title, desc, color, highlight }) {
  return (
    <div className={`feature-item${highlight ? ' highlight' : ''}`} style={highlight ? { color } : {}}>
      <div className="feature-icon">{icon}</div>
      <div className="feature-title">{title}</div>
      <div className="feature-desc">{desc}</div>
    </div>
  );
}

export function FeatureList({ features, align }) {
  return (
    <div className={`feature-list feature-list-${align}`}>
      {features.map((f, idx) => (
        <FeatureItem key={idx} {...f} />
      ))}
    </div>
  );
}

export function FeatureCenterImage() {
  return (
    <div className="feature-center-image">
      <img src="/logoSpark.png" alt="SPARK App Screenshot" style={{ width: 260, borderRadius: 16, boxShadow: '0 4px 24px #0001' }} />
    </div>
  );
}

export default function FeatureSection() {
  const leftFeatures = [
    {
      icon: '📝',
      title: 'Ghi chép thu chi thông minh',
      desc: 'Dễ dàng tìm kiếm mọi khoản thu/chi của bạn theo từng hạng mục cụ thể',
      color: '#FF9800',
      highlight: true,
    },
    {
      icon: '📊',
      title: 'Báo cáo trực quan, sinh động',
      desc: 'Thống kê rõ ràng, thông minh mọi khoản thu/chi của bạn',
      color: '#FFD600',
      highlight: true,
    },
  ];
  const rightFeatures = [
    {
      icon: '📋',
      title: 'Lập hạn mức chi tiêu',
      desc: 'Giúp bạn kiểm soát chi tiêu hiệu quả mà không vượt quá ngân sách',
      highlight: false,
    },
    {
      icon: '🔔',
      title: 'Cập nhật chi tiêu mọi lúc, mọi nơi',
      desc: 'Phần mềm cập nhật liên tục tình trạng các khoản chi tiêu',
      highlight: false,
    },
  ];
  return (
    <section className="feature-section">
      <h2 className="feature-title">Tính năng</h2>
      <p className="feature-desc">Việc quản lý tài chính trở nên tiện lợi với những tính năng đa dạng của chúng tôi</p>
      <div className="feature-content">
        <FeatureList features={leftFeatures} align="left" />
        <FeatureCenterImage />
        <FeatureList features={rightFeatures} align="right" />
      </div>
    </section>
  );
} 