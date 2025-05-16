import React from "react";
import { removeVietnameseTones } from "../../helpers/normalize";
import "./HighlightText.scss";

function HighlightText(props) {
  const { text, keyword } = props;
  if (!keyword) return text;
  const normalizedText = removeVietnameseTones(text.toLowerCase());
  const normalizedKeyword = removeVietnameseTones(keyword.toLowerCase());
  const index = normalizedText.indexOf(normalizedKeyword);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <span className="highlight">
        {text.slice(index, index + keyword.length)}
      </span>
      {text.slice(index + keyword.length)}
    </>
  );
}

export default HighlightText;
