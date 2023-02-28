import React, { useState, useEffect, useRef, useContext } from "react";
import { Icon } from "semantic-ui-react";

import "./Banner.css";
import BannerContext from "../../context/BannerContext/BannerContext";

function Banner(props) {
  const mounted = useRef();
  const [banner, setBanner] = useContext(BannerContext);
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic

      mounted.current = true;
      //console.log(`Search value updated to ${formData}, component mounted!`);
    } else {
      // do componentDidUpdate logic
      //console.log(`Search value updated to ${JSON.stringify(formData)}`);
    }
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic

      mounted.current = true;
      //console.log(` component mounted!`);
    } else {
      // do componentDidUpdate logic
      //console.log(`already mounted!`);
    }
  }, []);

  return (
    <div
      className={`Banner ${banner.show ? "opened" : "closed"} ${
        banner.type == "success" ? "success" : "failure"
      }`}
    >
      <Icon
        name="times"
        className="close"
        onClick={() => {
          setBanner({
            show: false,
            type: "",
            msg: "",
          });
        }}
      />
      {banner.msg && <p>{banner.msg}</p>}
    </div>
  );
}

export default React.memo(Banner);
