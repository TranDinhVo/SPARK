import React from 'react';

export default function DeviceShowcase() {
  // Bạn có thể thay thế các emoji bằng SVG hoặc ảnh thật nếu có
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 24, minHeight: 220 }}>
      {/* Tablet */}
      <div style={{ width: 110, height: 150, background: '#fff', border: '3px solid #222', borderRadius: 12, boxShadow: '0 4px 24px #0002', marginBottom: 12 }} />
      {/* Phone */}
      <div style={{ width: 48, height: 100, background: '#fff', border: '3px solid #222', borderRadius: 18, boxShadow: '0 4px 24px #0002', marginLeft: -30, zIndex: 1 }} />
      {/* Laptop */}
      <div style={{ width: 180, height: 110, background: '#fff', border: '3px solid #222', borderRadius: 10, boxShadow: '0 4px 24px #0002', transform: 'skewX(-12deg)', marginLeft: -20 }} />
    </div>
  );
} 