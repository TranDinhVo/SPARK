import React from "react";
import piggyGif from "../../assets/images/gif-pick.gif";
import "../../assets/scss/DashboardPiggyAnimation.scss";

const DashboardPiggyAnimation = () => (
  <div className="dashboard-piggy-animation">
    <div className="dashboard-piggy-animation__left">
      <h2 className="dashboard-piggy-animation__title">Nâng cấp tài khoản</h2>
      <p className="dashboard-piggy-animation__desc">
        Để cập nhật phiên bản tốt nhất
      </p>
      <button
        className="dashboard-piggy-animation__btn"
        aria-label="Cập nhật tài khoản"
      >
        Cập Nhật
      </button>
    </div>
    <div className="dashboard-piggy-animation__right">
      <img
        src={piggyGif}
        alt="Piggy Animation"
        className="dashboard-piggy-animation__image"
        loading="lazy"
      />
    </div>
  </div>
);

export default DashboardPiggyAnimation;
