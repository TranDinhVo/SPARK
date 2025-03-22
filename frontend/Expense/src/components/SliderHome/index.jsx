import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../../assets/scss/SliderHome.scss";
import cutDownSlider from "../../assets/images/cutDown_slider.png";
import savingSlider from "../../assets/images/saving_slider.png";
import simpleWaySlider from "../../assets/images/simpleWay_slider.png";
function SliderHome() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slider-item">
          <img src={cutDownSlider} alt="cut-down"></img>
        </div>
        <div className="slider-item">
          <img src={simpleWaySlider} alt="simple-way"></img>
        </div>
        <div className="slider-item">
          <img src={savingSlider} alt="saving"></img>
        </div>
      </Slider>
    </div>
  );
}

export default SliderHome;
