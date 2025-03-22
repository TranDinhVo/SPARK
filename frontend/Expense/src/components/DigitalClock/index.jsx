import React, { useState, useEffect } from "react";
import { Progress } from "antd";
import "../../assets/scss/DigitalClock.scss";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  //   const amPm = time.getHours() >= 12 ? "PM" : "AM";

  return (
    <>
      <div className="clock-container">
        <h4 className="clock-title">TIME CLOCK</h4>
        <div className="clock-content">
          <div className="circle">
            <Progress
              size={80}
              type="circle"
              strokeWidth={6}
              percent={(hours / 12) * 100}
              format={() => (
                <span
                  style={{ color: "white", fontSize: "32px", fontWeight: 900 }}
                >
                  {hours}
                  <span
                    style={{
                      fontSize: "8px",
                      fontWeight: 600,
                      display: "block",
                    }}
                  >
                    Hours
                  </span>
                </span>
              )}
              strokeColor=" #5027ef"
              trailColor="#ddd"
            />
          </div>
          <div className="circle">
            <Progress
              size={80}
              type="circle"
              strokeWidth={6}
              percent={(minutes / 60) * 100}
              format={() => (
                <span
                  style={{ color: "white", fontSize: "32px", fontWeight: 900 }}
                >
                  {minutes}
                  <br />{" "}
                  <span
                    style={{
                      fontSize: "8px",
                      fontWeight: 600,
                      display: "block",
                    }}
                  >
                    Minutes
                  </span>
                </span>
              )}
              strokeColor=" #3b64dc"
              trailColor="#ddd"
            />
          </div>
          <div className="circle">
            <Progress
              size={80}
              type="circle"
              strokeWidth={6}
              percent={(seconds / 60) * 100}
              format={() => (
                <span
                  style={{ color: "white", fontSize: "32px", fontWeight: 900 }}
                >
                  {seconds}
                  <br />{" "}
                  <span
                    style={{
                      fontSize: "8px",
                      fontWeight: 600,
                      display: "block",
                    }}
                  >
                    Seconds
                  </span>
                </span>
              )}
              strokeColor="#1e90d8"
              trailColor="#ddd"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Clock;
