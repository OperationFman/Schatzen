import { AlertMessage } from "./AlertMessage";
import React, { useEffect, useState } from 'react';

type Colors = "error" | "warning" | "info" | "success"

export type AlertProps = {
    message: string;
    color: Colors;
}

export const AlertController = () => {
    const [messageList, setMessageList] = useState([])
    
    const [messageDisplayed, setMessageDisplayed] = useState(false);
    const [alertText, setAlertText] = useState("You shouldn't be able to see this");
    const [alertColor, setAlertColor] = useState<Colors>("info");

    useEffect(() => {
        if (messageList.length > 0) {
            const displayMessage = (message: string, color: Colors) => {
                setAlertText(message);
                setAlertColor(color);
                setMessageDisplayed(true);
            }

            const {message, color} = messageList[0]
            displayMessage(message, color)
            setTimeout(() => { setMessageDisplayed(false) }, 5000)
            setMessageList(messageList.slice(1));
        }
    }, [messageList])

    return (
        <>
            <AlertMessage visible={messageDisplayed} message={alertText} color={alertColor}/>
        </>
    )
}

// What was I doing?
    // Trying to test the above useEffect by adding a button that will push a new message/color to the messageList
    // This SHOULD trigger the useEffect
    // It should make AlertMessage appear, wait 5 seconds and hide it
    // Then the messageList should be empty and the useEffect will stop (So the Alert will stay disappeared)
    // Clicking the button multiple times should trigger the useEffect to keep running until the array is empty
    // It would be great if displayMessage didn't need to be inside the useEffect
    // Finally, add tests

// Once this works, setup the webSocket to fill the array instead of the button