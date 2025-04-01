import React, { useState } from "react";
import { Select } from "antd";
import { Pie } from "@ant-design/plots";
import "../../../assets/scss/BudgetComparison.scss";

const PlotMaps = {};

function BudgetComparison({ budgets = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("Tổng quan");

  const filteredBudgets = budgets.filter(
    (item) => item.amountLimit > 0 && item.amountCurrent >= 0
  );

  const transformedData =
    selectedCategory === "Tổng quan"
      ? filteredBudgets.map((item) => ({
          category: item.category,
          value: item.amountLimit,
        }))
      : filteredBudgets
          .filter((item) => item.category === selectedCategory)
          .flatMap((item) => [
            { category: "Đã chi tiêu", value: item.amountCurrent },
            {
              category: "Còn lại",
              value: Math.max(0, item.amountLimit - item.amountCurrent),
            },
          ]);

  const showTooltip = (evt, pie) => {
    Object.keys(PlotMaps).forEach((plot) => {
      if (plot !== pie) {
        PlotMaps[plot].chart.emit("tooltip:show", {
          data: evt.data,
        });
        PlotMaps[plot].chart.emit("element:highlight", {
          data: evt.data,
        });
      }
    });
  };

  const hideTooltip = (evt, pie) => {
    Object.keys(PlotMaps).forEach((plot) => {
      if (plot !== pie) {
        PlotMaps[plot].chart.emit("tooltip:hide", {
          data: evt.data,
        });
        PlotMaps[plot].chart.emit("element:unhighlight", {
          data: evt.data,
        });
      }
    });
  };
  const totalValue = transformedData.reduce((sum, item) => sum + item.value, 0);
  const config = {
    data: transformedData,
    angleField: "value",
    colorField: "category",
    radius: 0.9,
    label: {
      text: (datum) => {
        const percent = ((datum.value / totalValue) * 100).toFixed(2) + "%";
        return `${datum.value}\n${percent}`;
      },
      position: "outside",
    },
    tooltip: {
      title: "category",
      formatter: (datum) => ({
        name: datum.category,
        value: `${datum.value.toLocaleString()} VND`,
      }),
    },
    interaction: {
      elementHighlight: true,
    },
    state: {
      inactive: { opacity: 0.5 },
    },
  };

  return (
    <div className="budget-dashboard">
      <div className="budget__header">
        <h3 className="budget__header--title">Báo cáo ngân sách</h3>
        <Select
          className="budget__header--select"
          value={selectedCategory}
          style={{ width: 200, marginBottom: 16 }}
          onChange={setSelectedCategory}
        >
          <Select.Option value="Tổng quan">Tổng quan</Select.Option>
          {[...new Set(filteredBudgets.map((item) => item.category))].map(
            (category) => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            )
          )}
        </Select>
      </div>

      {transformedData.length > 0 ? (
        <div className="budget__chart-container">
          <Pie
            {...config}
            // width={400}
            height={250}
            onReady={(plot) => {
              PlotMaps.pieChart = plot;
              plot.chart.on("interval:pointerover", (evt) => {
                showTooltip(evt, "pieChart");
              });
              plot.chart.on("interval:pointerout", (evt) => {
                hideTooltip(evt, "pieChart");
              });
            }}
          />
        </div>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </div>
  );
}

export default BudgetComparison;
