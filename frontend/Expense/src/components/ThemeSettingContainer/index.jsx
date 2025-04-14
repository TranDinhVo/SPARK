import React, { useState, useEffect } from "react";
import { FaCog, FaTimes } from "react-icons/fa";
import "./ThemeSettingContainer.scss";

const ThemeSettingContainer = () => {
  const defaultNone = "#fc8019";
  const defaultLight = "#ffece1";
  const defaultDark = "#fc8e32";
  const [visible, setVisible] = useState(false);

  const [selectedColor, setSelectedColor] = useState(
    localStorage.getItem("primary-color") || defaultNone
  );
  const [selectedColorLight, setSelectedColorLight] = useState(
    localStorage.getItem("primary-color-light") || defaultLight
  );
  const [selectedColorDark, setSelectedColorDark] = useState(
    localStorage.getItem("primary-color-dark") || defaultDark
  );
  const [selectedColorDarkMode, setSelectedColorDarkMode] = useState(
    localStorage.getItem("primary-color-dark-mode") || "#ffffff"
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
    document.documentElement.style.setProperty(
      "--primary-color-dark",
      selectedColorDark
    );
    document.documentElement.style.setProperty(
      "--primary-color-dark-mode",
      selectedColorDarkMode
    );

    localStorage.setItem("primary-color", selectedColor);
    localStorage.setItem("primary-color-light", selectedColorLight);
    localStorage.setItem("primary-color-dark", selectedColorDark);
    localStorage.setItem("primary-color-dark-mode", selectedColorDarkMode);
  }, [
    selectedColor,
    selectedColorLight,
    selectedColorDark,
    selectedColorDarkMode,
  ]);

  const handleToggle = () => {
    setVisible(!visible);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const colorDarkOrLight = [{ color: "#ffffff" }, { color: "#000000" }];
  const colors = [
    // {
    //   color: "#fffff", // mặc định không có màu
    //   colorLight: "", // nền trắng
    //   isDefault: true,
    // },
    { color: "#fc8019", colorDark: "#fc8e32", colorLight: "#ffece1" },
    { color: "#f54749", colorDark: "#f65f61", colorLight: "#feecec" },
    { color: "#A1CB46", colorDark: "#abd15a", colorLight: "#f5faec" },
    { color: "#025d3a", colorDark: "#03764a", colorLight: "#e5eeeb" },
    { color: "#1e466a", colorDark: "#24537e", colorLight: "#e8ecf0" },
    { color: "#e8ac00", colorDark: "#eab41a", colorLight: "#fdf7e5" },
  ];

  const handleChangPrimary = (item) => {
    setSelectedColor(item.color);
    setSelectedColorLight(item.colorLight);
    setSelectedColorDark(item.colorDark);
  };
  const handleChangeDarkMode = (item) => {
    setSelectedColorDarkMode(item.color);
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
        <div className="Dard-Light">
          <p>Chế độ</p>
          {colorDarkOrLight.map((item, index) => (
            <div
              key={index}
              className={`color-wrapper ${
                item.color === selectedColorDarkMode ? "selected-dark-mod" : ""
              }`}
              onClick={() => handleChangeDarkMode(item)}
            >
              <div
                className="color-inner"
                style={{ backgroundColor: item.color }}
              ></div>
            </div>
          ))}
        </div>

        <div className="color-palette">
          <p>Màu </p>
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
