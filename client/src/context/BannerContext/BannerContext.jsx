import React, { useState, useEffect, createContext } from "react";

const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
  const [banner, setbanner] = useState({
    show: false,
    style: {},
    code: "",
    type: "",
    msg: "",
  });

  useEffect(() => {}, []);

  useEffect(() => {
    console.log("Banner updated to ");
    console.log(banner);
  }, [banner]);

  return (
    <BannerContext.Provider value={[banner, setbanner]}>
      {children}
    </BannerContext.Provider>
  );
};

export default BannerContext;
