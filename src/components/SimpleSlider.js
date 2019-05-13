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
            <img className="image_slide" src='https://s3-us-west-1.amazonaws.com/pantrify2/dan-gold-265213-unsplash.jpg' width="100%" alt="error" />
          </div>
          <div className="slider_container2">
            <img className="image_slide" src="https://s3-us-west-1.amazonaws.com/pantrify2/create1.jpeg" width="100%" alt="error" />
          </div>
          <div className="slider_container3">
            <img className="image_slide" src='https://s3-us-west-1.amazonaws.com/pantrify2/enjoy1.jpeg' width='100%' alt="error" />
          
        </div>
      </Slider>
    );
  }
}