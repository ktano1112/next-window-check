import React, { useState, useEffect } from "react";

const ChildWindow = () => {
  const [randomNumFromParent, setRndomNumFromParent] = useState(0);
  const [parentWindow, setParentWindow] = useState(null);

  useEffect(() => {
    setParentWindow(window.opener);
  }, []);

  useEffect(() => {
    if (!!parentWindow) {
      parentWindow.postMessage(randomNumFromParent, "http://localhost:3000/");
    }
  }, [randomNumFromParent]);

  const changeNumHandler = () => {
    setRndomNumFromParent(Math.floor(Math.random() * 50));
  };

  const receiveMessage = (e) => {
    if (typeof e.data === "number") {
      setRndomNumFromParent(e.data);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("message", receiveMessage, false);
  }

  return (
    <>
      <p>「{randomNumFromParent}」</p>
      <button onClick={changeNumHandler}>change!!</button>
    </>
  );
};

export default ChildWindow;
