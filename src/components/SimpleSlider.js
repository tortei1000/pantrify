import React from "react";
import Slider from "react-slick";

export default class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        
          <div className="slider_container" ></div>
          <div className="slider_container2"></div>
          <div className="slider_container3"></div>
      </Slider>
    );
  }
}