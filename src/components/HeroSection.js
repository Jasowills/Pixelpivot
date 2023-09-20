import React from "react";
import image from "../images/undraw_Photo_re_5blb.png";

const Illustration = () => {
  return (
    <div className="illustration">
      <div className="arc top-left"></div>
      <div className="arc bottom-right"></div>
      <img src={image} alt="" className="illustration-images" />
      <p className="caption">
      "Welcome to PixelPivot Gallery! 🎨✨ Explore our pixelated paradise and get inspired!"</p>
    </div>
  );
};

export default Illustration;