import { useEffect, useState } from "react";
import { get } from "../../utils/request";
import { Column } from "@ant-design/plots";
import { ExpandOutlined } from "@ant-design/icons";
import "../../assets/scss/SmallExpence.scss";
import { Button } from "antd";

function SmallExpence() {
  const [dataChartExpences, setDataChartExpences] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await get("expences");
      setDataChartExpences(result);
    };
    fetchApi();
  }, []);

  const config = {
    data: dataChartExpences,
    xField: "day",
    yField: "money",
    autoFix: true,
    height: 220,
    colorField: "type",
    state: {
      inactive: { opacity: 0.5 },
    },
    scale: { color: { palette: ["#d890fa", "#93bee6"] } },
    group: true,
    dodgePadding: 0,
  };
  return (
    <>
      <div className="smallExpence">
        <div className="smallExpence__list">
          <h4 className="smallExpence__list--title">
            Regular income and expences
          </h4>
          <Button icon={<ExpandOutlined />} className="smallExpence__button">
            Detail
          </Button>
        </div>

        <Column {...config} />
      </div>
    </>
  );
}
export default SmallExpence;
