import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "./TestimonialSlider.css";

export function TestimonialSlider({ testimonials }) {
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
    <Slider {...settings}>
      {testimonials.map((testimonial, index) => (
        <div key={index} className="testimonial-slide">
          <p style={{ fontStyle: "italic", margin: "0 auto", width: "70%" }}>
            "{testimonial}"
          </p>
        </div>
      ))}
    </Slider>
  );
}

// PropTypes for validation
TestimonialSlider.propTypes = {
  testimonials: PropTypes.arrayOf(PropTypes.string).isRequired,
};
