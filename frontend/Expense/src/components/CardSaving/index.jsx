import "../../assets/scss/CardSaving.scss";
import { Button, Progress } from "antd";
import { ExpandOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
import { get } from "../../utils/request";

function CardSaving() {
  const [dataGoals, setDataGoals] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await get("small-goals");
      setDataGoals(result);
    };
    fetchApi();
  }, []);
  return (
    <>
      <div className="card__saving">
        <div className="card__list">
          <h4 className="card__list--title">Saving</h4>
          <Button icon={<ExpandOutlined />} className="card__list--button">
            Detail
          </Button>
        </div>
        {dataGoals && (
          <div className="card__list-item">
            <div className="card__list--scrollable">
              {dataGoals.map((item, index) => {
                return (
                  <>
                    <div
                      className={
                        "card__item " +
                        (index % 2 == 1 ? "circlebg--pink" : "circlebg--green")
                      }
                      key={index}
                    >
                      <h5 className="card__item--title">{item.name}</h5>
                      <span className="card__item--target">
                        {Intl.NumberFormat("vi-VN").format(item.target)} VND
                      </span>
                      <div
                        className={
                          "card__item--circle " +
                          (index % 2 == 1 ? "circle--pink" : "circle--green")
                        }
                      >
                        <Progress
                          type="circle"
                          percent={(
                            (100 * parseFloat(item.amountCur)) /
                            parseFloat(item.target)
                          ).toFixed(0)}
                          size={70}
                          strokeColor={index % 2 == 0 ? "#cbff1c" : "#ffb567"}
                          trailColor={index % 2 == 0 ? "#1d7f6b" : "#df4643"}
                          strokeWidth={12}
                          format={(percent) => (
                            <span
                              style={{
                                color: index % 2 == 0 ? "#1d7f6b" : "#df4643",
                                fontSize: "18px",
                                fontFamily: "Arial, sans-serif",
                                fontWeight: "bold",
                              }}
                            >
                              {percent}%
                            </span>
                          )}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default CardSaving;
