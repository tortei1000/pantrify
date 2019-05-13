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
        <div className="slider_container">
          <h3><img src='https://s3-us-west-1.amazonaws.com/pantrify2/dan-gold-265213-unsplash.jpg' width="100%" alt="error"/></h3>
        </div>
        <div>
          <h3><img src="https://s3-us-west-1.amazonaws.com/pantrify2/create1.jpeg"  width="100%" alt="error"/></h3>
        </div>
        <div>
          <h3><img src='https://s3-us-west-1.amazonaws.com/pantrify2/enjoy1.jpeg' width='100%' alt="error"/></h3>
        </div>
        
      </Slider>
    );
  }
}