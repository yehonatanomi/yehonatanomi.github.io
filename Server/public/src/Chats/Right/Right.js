import './Right.css'
import ActiveContact from './ActiveContact/ActiveContact';
import ActiveChat from './ActiveChat/ActiveChat';
import React, { useState, useEffect } from 'react';


async function getChats(id, token, setContactList, contactList) {
  if (!id) {
    return [];
  }
  const response = await fetch(`http://localhost:5000/api/Chats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const list = await response.json();

    return list;
    
  } else {
    throw new Error('Failed to fetch messages');
  }
}



async function getMsg(id, token) {
  if (!id) {
    return [];
  }
  const response = await fetch(`http://localhost:5000/api/Chats/${id}/Messages`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const msgArr = await response.json();
    

    const formattedMessages = msgArr.map((msg) => {
      const date = new Date(msg.created);
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
      return {
        id: msg.id,
        created: formattedTime,
        sender: {
          username: msg.sender.username,
        },
        content: msg.content,
      };
    });

    return formattedMessages;
  } else {
    throw new Error('Failed to fetch messages');
  }
}

async function sendMsg(id, token,Msg) {
  if (!id) {
    return [];
  }
  const data = {
    'msg': Msg,
  };
  const response = await fetch(`http://localhost:5000/api/Chats/${id}/Messages`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const jsoon = await response.json();
  return jsoon;
}

function Right({ p, image, contactList, setContactList, token, chatID, username }) {
  const contact = 1;
  const [formattedMessages, setFormattedMessages] = useState([]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await getMsg(chatID, token);
        setFormattedMessages(messages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [chatID, token]);
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  };

  const handleButtonClick = async () => {
    if (inputValue !== '' && chatID !== null) {
      const date = new Date();

      await sendMsg(chatID, token, inputValue)

     

      setInputValue('');

      // Get the active chat element
      const activeContact = document.querySelector('.active');
      const dateElement = activeContact.querySelector('.date');
      const formattedDate = `${date.toLocaleDateString()}, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      dateElement.innerHTML = formattedDate;

      
      
      // Fetch the updated messages from the server after sending the message
      const updatedMessages = await getMsg(chatID, token);
      // Update the formattedMessages state with the updated messages
      setFormattedMessages(updatedMessages);

      
      let updatedContactList = await getChats(chatID, token, setContactList, contactList);
      
      updatedContactList.sort((a, b) => {
        var timeA, timeB;
      
        if (!a.lastMessage) {
          timeA = new Date(0);
        } else {
          timeA = new Date(a.lastMessage.created);
        }
      
        if (!b.lastMessage) {
          timeB = new Date(0);
        } else {
          timeB = new Date(b.lastMessage.created);
        }
      
        if (!a.lastMessage && b.lastMessage) {
          return 1; // a has no message, b has a message (move a down)
        } else if (a.lastMessage && !b.lastMessage) {
          return -1; // a has a message, b has no message (move b down)
        } else {
          return timeB - timeA; // both a and b have messages, sort by created time
        }
      });
      
    
      setContactList(updatedContactList)
      

      
    }

  };
  
  return (
    <>
      <ActiveContact name={p} img={image} chatID={chatID}/>
      {contact && (
        <>
          <ActiveChat Messages={formattedMessages} username={username}/>
          <div className="row-aaa fff" id="footer">
            <input
              type="text"
              placeholder="Type a message"
              id="message-input"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button type="button" className="btn btn-info" onClick={handleButtonClick}>
              <i className="bi bi-send-fill" />
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Right;
