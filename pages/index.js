import React, { useState, useEffect } from "react";

const ParentWindow = () => {
  const [randomNum, setRandomNum] = useState(0);
  const [newWindow, setNewWindow] = useState(null);

  useEffect(() => {
    if (!!newWindow) {
      newWindow.postMessage(randomNum, "http://localhost:3000/childWindow");
    }
  }, [randomNum]);

  const OpenWindowHandler = () => {
    setNewWindow(
      window.open(
        "http://localhost:3000/childWindow",
        "_blank",
        "width=400,height=600"
      )
    );
  };

  const changeNumHandler = () => {
    setRandomNum(Math.floor(Math.random() * 50));
  };

  const receiveMessage = (e) => {
    if (typeof e.data === "number") {
      setRandomNum(e.data);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("message", receiveMessage, false);
  }

  return (
    <>
      <p>「{randomNum}」</p>
      <button onClick={OpenWindowHandler}>window open!!</button>
      <button onClick={changeNumHandler}>change!!</button>
    </>
  );
};

export default ParentWindow;
