import { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "./CustomPieChart.scss";

function CustomPieChart({ percent = 0 }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const COLORS = ["var(--primary-color-light", "var(--primary-color-dark)"];
  const RADIAN = Math.PI / 180;
  const data = [
    { name: "Đã tiết kiệm", value: percent },
    { name: "Chưa hoàn thành", value: 100 - percent },
  ];

  const sortedData = [...data].sort((a, b) => b.value - a.value);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    name,
  }) => {
    const radius = outerRadius * 1.5;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const yOffset = midAngle > 180 ? -5 : 5;

    return (
      <text
        x={x}
        y={y + yOffset}
        fill="#374151"
        fontSize={13}
        fontWeight={500}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${name} ${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-name">{payload[0].name}</p>
          <p className="tooltip-value">{`${payload[0].value.toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="pie-chart-container" onClick={() => setIsModalOpen(true)}>
        <ResponsiveContainer width={350} height={350}>
          <PieChart margin={{ top: 30, right: 40, bottom: 30, left: 40 }}>
            <Pie
              data={sortedData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              label={renderCustomizedLabel}
              labelLine={false}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div ref={modalRef} className="modal-content">
            <button
              onClick={() => setIsModalOpen(false)}
              className="modal-close-button"
            >
              <svg
                className="close-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="modal-title">Chi tiết tiết kiệm</h2>

            <div className="modal-chart">
              <ResponsiveContainer width="100%" height={500}>
                <PieChart margin={{ top: 50, right: 50, bottom: 50, left: 50 }}>
                  <Pie
                    data={sortedData}
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={160}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    label={renderCustomizedLabel}
                    labelLine={false}
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-modal-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Additional stats */}
            <div className="modal-stats">
              <div className="stat-item">
                <div className="stat-label">
                  <div className="color-indicator saved"></div>
                  <span>Đã tiết kiệm</span>
                </div>
                <p className="stat-value saved">{percent.toFixed(1)}%</p>
              </div>
              <div className="stat-item">
                <div className="stat-label">
                  <div className="color-indicator remaining"></div>
                  <span>Chưa hoàn thành</span>
                </div>
                <p className="stat-value remaining">
                  {(100 - percent).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomPieChart;
