import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/colors")
      .then(res => {
        console.log(`BubblePage.js: res: `, res);
        setColorList(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  console.log(`BubblePage.js: colorList: `, colorList);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
