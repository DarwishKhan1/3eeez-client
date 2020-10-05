import React from "react";
import Video1 from "../../Assets/videos/whatsapp.mp4";

const Aboutus = (props) => {
  return (
    <div className="container">
      <h2 className="text-center">Who we are and what we can do for you?</h2>
      <div className="row my-5">
        <div className="col-md-6 col-sm-12" align="justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam
          velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate
          commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed
          eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam
          nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet
          quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu
          diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis
          sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula,
          a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci
          ullamcorper at ultricies metus viverra. Pellentesque arcu mauris,
          malesuada quis ornare accumsan, blandit sed.
        </div>
        <div className="col-md-6 col-sm-12">
          <video
            autoPlay
            loop
            controls
            muted
            src={Video1}
            width="100%"
            height="100%"
          ></video>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
