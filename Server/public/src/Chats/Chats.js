import './Chats.css'
import Right from './Right/Right';
import Left from './Left/Left';
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';










function Chats() {
    const location = useLocation();
    const username = location.state.username;
    const token = location.state.token;
    const [chatID, setChatID] = useState(null);
    const [image, setImage] = useState("blank.png");
    const [p, setP] = useState(null);
    const [contactList, setContactList] = useState([]);
    useEffect(() => {
        const fetchChats = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/Chats', {
              method: 'GET',
              headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
              },
            });
            const info = await response.json();
            setContactList(info);
          } catch (error) {
            console.error('Error fetching chats:', error);
          }
        };
      
        fetchChats(); // Call the fetchChats function
      
        // Include 'contactList' in the dependency array
      }, [token]);
      
    const handleActiveContactChange = () => {
         if(!chatID){
          setImage("blank.png");
          setP("");
         }else{
        const active = document.querySelector('.active');
        if (active) {
          const activeImage = active.querySelector('img').getAttribute('src');
          const activeText = active.querySelector('p').textContent;
          setImage(activeImage);
          setP(activeText);
        }
      };
    }

    return (
        <>
            <Link to="/">
                <button id="logout" type="button" className="btn btn-danger">
                        Logout <i className="bi bi-box-arrow-right" />
                </button>
            </Link>
                <div id="container3" onClick={handleActiveContactChange}>
                    <Left username={username} contactList={contactList} setContactList={setContactList} token={token} chatID={chatID} setChatID={setChatID}/>
                    <div className="right" id="right">
                    <Right p={p} image={image} contactList={contactList} setContactList={setContactList} token={token} chatID={chatID}  username={username}/>
                    </div>
                </div>
            </>
    );
}

export default Chats