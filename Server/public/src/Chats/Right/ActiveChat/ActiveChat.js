import Message from "../Message/Message";
import React, { useEffect, useRef } from 'react';



function ActiveChat({Messages, username}) {

    
    const chatContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the chat container when component updates
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [Messages]);

    const reversedMessages = [...Messages].reverse();

    const messageList = reversedMessages.map((message, index) => (
    <Message {...message} key={index} username={username} />
    ));
      

    return (
        <div className="row-aaa eee">
            <div className="chat-container" ref={chatContainerRef}>
                {messageList}
            </div>
        </div>
    );
};

export default ActiveChat;