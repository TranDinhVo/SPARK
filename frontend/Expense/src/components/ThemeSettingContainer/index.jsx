import React, { useState, useEffect } from "react";
import { FaCog, FaTimes } from "react-icons/fa";
import "./ThemeSettingContainer.scss";

const ThemeSettingContainer = () => {
  const [visible, setVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    localStorage.getItem("primary-color")
  );
  const [selectedColorLight, setSelectedColorLight] = useState(
    localStorage.getItem("primary-color-light")
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      selectedColor
    );
    document.documentElement.style.setProperty(
      "--primary-color-light",
      selectedColorLight
    );
    localStorage.setItem("primary-color", selectedColor);
    localStorage.setItem("primary-color", selectedColorLight);
  }, [selectedColor, selectedColorLight]);

  const handleToggle = () => {
    setVisible(!visible);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const colors = [
    {
      color: "#fffff", // mặc định không có màu
      colorLight: "", // nền trắng
      isDefault: true,
    },
    { color: "#F54749", colorLight: "#FEECEC" },
    { color: "#E8AC00", colorLight: "#F6DE99" },
    { color: "#51724E", colorLight: "#B9C7B8" },
    { color: "#FC8019", colorLight: "#FECCA3" },
    { color: "#1E466A", colorLight: "#A5B5C3" },
    { color: "#C6164F", colorLight: "#E8A2B9" },
    { color: "#A1CB46", colorLight: "#D9EAB5" },
    { color: "#8510C8", colorLight: "#E4BEFF" },
    { color: "#343A40", colorLight: "#AEB0B3" },
    { color: "#0265D2", colorLight: "#D4EDF9" },
  ];

  const handleChangPrimary = (item) => {
    setSelectedColor(item.color);
    setSelectedColorLight(item.colorLight);
  };
  return (
    <>
      {visible && (
        <div className="theme-setting__overlay" onClick={handleClose}></div>
      )}

      <button
        className={`theme-setting__floating-btn ${visible ? "move-left" : ""}`}
        onClick={handleToggle}
      >
        <FaCog />
      </button>

      <div className={`theme-setting__panel ${visible ? "visible" : ""}`}>
        <div className="theme-setting__header">
          <h3>Theme Settings</h3>
          <button className="theme-setting__close-btn" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>

        <p>Tuỳ chỉnh giao diện tại đây!</p>

        <div className="color-palette">
          {colors.map((item, index) => (
            <div
              key={index}
              className={`color-wrapper ${
                item.color === selectedColor ? "selected" : ""
              }`}
              // style={{ backgroundColor: item.colorLight }}
              onClick={() => handleChangPrimary(item)}
            >
              <div
                className="color-inner"
                style={{ backgroundColor: item.color }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ThemeSettingContainer;
