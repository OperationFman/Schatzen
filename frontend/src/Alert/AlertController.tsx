import { AlertMessage } from "./AlertMessage";
import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";

type Colors = "error" | "warning" | "info" | "success";

export type AlertProps = {
  message: string;
  color: Colors;
};

export const AlertController = () => {
  const [messageList, setMessageList] = useState<AlertProps[]>([]);
  const [messageDisplayed, setMessageDisplayed] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertColor, setAlertColor] = useState<Colors>("info");

  const dataLoaded = useRef(false);
  useEffect(() => {
    if (messageList.length > 0 && !dataLoaded.current) {
      const { message, color } = messageList[0];

      const displayMessage = (message: string, color: Colors) => {
        setAlertText(message);
        setAlertColor(color);
        setMessageDisplayed(true);
      };

      const removeMessage = () => {
        setMessageDisplayed(false);
        setTimeout(() => {
          setMessageList(messageList.slice(1));
        }, 500);
      };

      displayMessage(message, color);
      setTimeout(() => {
        removeMessage();
      }, 2000);
    }
  }, [messageList]);

  const appendMessageList = (message: string, color: Colors) => {
    setMessageList((prevState) => [...prevState, { message, color }]);
  };

  return (
    <>
      <Button
        onClick={() => {
          appendMessageList("Submitted your score", "success");
        }}
      >
        Hurry Up!
      </Button>
      <AlertMessage
        visible={messageDisplayed}
        message={alertText}
        color={alertColor}
      />
    </>
  );
};

// Add tests

// Once this works, setup the webSocket to fill the array instead of the button
