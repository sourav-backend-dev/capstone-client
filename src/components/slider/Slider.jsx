import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

export default function SimpleSlider({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    arrows:false
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "600px", margin: "0 auto" }}
            />
          </div>
        ))}
      </Slider>
    </div>

  );
}

// PropTypes for validation
SimpleSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
