import React, { useState, useEffect } from "react";
import { FaCog, FaTimes } from "react-icons/fa";
import "./ThemeSettingContainer.scss";

const ThemeSettingContainer = () => {
  const defaultColor = "#fc8019";
  const defaultLight = "#ffece1";
  const defaultDark = "#fc8e32";

  const [visible, setVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    localStorage.getItem("primary-color") || defaultColor
  );
  const [selectedColorLight, setSelectedColorLight] = useState(
    localStorage.getItem("primary-color-light") || defaultLight
  );
  const [selectedColorDark, setSelectedColorDark] = useState(
    localStorage.getItem("primary-color-dark") || defaultDark
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

    localStorage.setItem("primary-color", selectedColor);
    localStorage.setItem("primary-color-light", selectedColorLight);
    localStorage.setItem("primary-color-dark", selectedColorDark);
  }, [selectedColor, selectedColorLight, selectedColorDark]);

  const handleToggle = () => {
    setVisible(!visible);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const colorPalettes = [
    {
      color: "#fc8019",
      colorDark: "#fc8e32",
      colorLight: "#ffece1",
      name: "Orange",
    },
    {
      color: "#f54749",
      colorDark: "#f65f61",
      colorLight: "#feecec",
      name: "Red",
    },
    {
      color: "#A1CB46",
      colorDark: "#abd15a",
      colorLight: "#f5faec",
      name: "Green",
    },
    {
      color: "#025d3a",
      colorDark: "#03764a",
      colorLight: "#e5eeeb",
      name: "Forest",
    },
    {
      color: "#1e466a",
      colorDark: "#24537e",
      colorLight: "#e8ecf0",
      name: "Navy",
    },
    {
      color: "#e8ac00",
      colorDark: "#eab41a",
      colorLight: "#fdf7e5",
      name: "Gold",
    },
    {
      color: "#6a1b9a",
      colorDark: "#7b2cbf",
      colorLight: "#f3e5f5",
      name: "Purple",
    },
    {
      color: "#00838f",
      colorDark: "#0097a7",
      colorLight: "#e0f7fa",
      name: "Teal",
    },
    {
      color: "#c2185b",
      colorDark: "#d81b60",
      colorLight: "#fce4ec",
      name: "Pink",
    },
    {
      color: "#5d4037",
      colorDark: "#6d4c41",
      colorLight: "#efebe9",
      name: "Brown",
    },
    {
      color: "#37474f",
      colorDark: "#455a64",
      colorLight: "#eceff1",
      name: "Blue Grey",
    },
    {
      color: "#2e7d32",
      colorDark: "#388e3c",
      colorLight: "#e8f5e9",
      name: "Emerald",
    },
    {
      color: "#f57c00",
      colorDark: "#fb8c00",
      colorLight: "#fff3e0",
      name: "Amber",
    },
    {
      color: "#7b1fa2",
      colorDark: "#8e24aa",
      colorLight: "#f3e5f5",
      name: "Deep Purple",
    },
    {
      color: "#0277bd",
      colorDark: "#0288d1",
      colorLight: "#e1f5fe",
      name: "Light Blue",
    },
  ];

  const handleChangeColor = (item) => {
    setSelectedColor(item.color);
    setSelectedColorLight(item.colorLight);
    setSelectedColorDark(item.colorDark);
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

        <div className="theme-setting__content">
          <p className="theme-setting__description">
            Choose your favorite color theme to customize the application's
            appearance!
          </p>

          <div className="color-palette">
            {colorPalettes.map((item, index) => (
              <div
                key={index}
                className={`color-wrapper ${
                  item.color === selectedColor ? "selected" : ""
                }`}
                onClick={() => handleChangeColor(item)}
              >
                <div
                  className="color-inner"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="color-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeSettingContainer;
