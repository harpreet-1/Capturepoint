import React from "react";

function HeadTitle({ title }) {
  return (
    <div className="head-title">
      <div className="head-title-left">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export default HeadTitle;
