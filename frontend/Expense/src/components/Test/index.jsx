import React from "react";
import { Card, Progress, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const GoalCard = ({ name, target, progress, startDate, endDate }) => {
  return (
    <Card
      style={{
        width: 250,
        borderRadius: "20px",
        textAlign: "center",
        background: "linear-gradient(to bottom, #e0ffb3, #b3f075)",
        padding: "15px",
        position: "relative",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
      bodyStyle={{ padding: 0 }}
    >
      {/* Vùng trên có hình cây */}
      <div
        style={{
          background: "#f0f9da",
          borderRadius: "100px 100px 0 0",
          padding: "20px 0",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/2903/2903559.png"
          alt="goal"
          style={{ width: "50px", height: "50px" }}
        />
      </div>

      {/* Thông tin chi tiết */}
      <div style={{ padding: "10px" }}>
        <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Name <span style={{ float: "right" }}>{name}</span>
        </p>
        <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Target{" "}
          <span style={{ float: "right" }}>{target.toLocaleString()} VND</span>
        </p>
        <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Process <span style={{ float: "right" }}>{progress}%</span>
        </p>

        {/* Thanh tiến trình */}
        <Progress percent={progress} status="active" showInfo={false} />

        <p style={{ marginTop: "10px", fontSize: "12px", fontWeight: "bold" }}>
          {startDate} - {endDate}
        </p>

        {/* Nút chỉnh sửa, xóa, thông tin */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          <Button
            icon={<EditOutlined />}
            shape="circle"
            style={{ background: "#fff", border: "none" }}
          />
          <Button
            icon={<DeleteOutlined />}
            shape="circle"
            danger
            style={{ border: "none" }}
          />
          <Button
            icon={<InfoCircleOutlined />}
            shape="circle"
            style={{ background: "#fff", border: "none" }}
          />
        </div>
      </div>
    </Card>
  );
};

export default GoalCard;
