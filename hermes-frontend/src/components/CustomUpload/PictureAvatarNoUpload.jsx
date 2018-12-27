import React from "react";

import defaultImage from "assets/img/default-avatar.png";

const PictureAvatarNoUpload = ({ image, loaded }) => {
  return (
    <div className="picture-container picture">
        <img
          src={loaded ? image : defaultImage}
          className="picture-src"
          alt="..."
        />
    </div>
  );
};

export default PictureAvatarNoUpload;
