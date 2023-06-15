import React, { useEffect } from 'react';
import Contact from '../Contact/Contact';

function ContactListResult({ contacts, setContactList, token, chatID, setChatID }) {

  const deleteContact = async (id) => {
    const response = await fetch('http://localhost:5000/api/Chats/' + id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });
    if (response.ok) {
     
      // Update the contacts list after deleting the contact
      const updatedContacts = contacts.filter(contact => contact.id !== id);
      setContactList(updatedContacts);
    }
  };

  
  
  
  



  
  // Attach event listeners after the component renders
  useEffect(() => {
    const attachEventListeners = () => {
      const chats = document.getElementsByClassName('chats');
    
      // Add a click event listener to each button
      for (let i = 0; i < chats.length; i++) {
        chats[i].addEventListener('click', function (event) {
          // Exclude the click event if the delete button is clicked
          const deleteButton = this.querySelector('.bi-x-square');
          if (deleteButton) {
            deleteButton.addEventListener('click', function (event) {
              if (this.parentElement.classList.contains('active')) {
                setChatID(null);
              }
            });
          }
    
          if (event.target.classList.contains('bi-x-square')) {
            return;
          }
    
          // Remove the "active" class from all buttons
          for (let j = 0; j < chats.length; j++) {
            if (chats[j].classList.contains('active')) {
              chats[j].classList.remove('active');
            }
          }
    
          // Add the "active" class to the button that was pressed
          this.classList.add('active');
          var idText = this.querySelector('.chatID');
          var innerText = idText.innerHTML;
          setChatID(innerText);
        });
      }
    };
    attachEventListeners();
  }, [contacts, setChatID]);

  
  let updatedContactList = contacts;
      
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
 
  const userMap = new Map();
  const uniqueContacts = [];

  // Iterate over contacts to extract unique users
  for (let i = 0; i < updatedContactList.length; i++) {
    const contact = updatedContactList[i];
    const userId = contact.id;
    const user = contact.user;
    // Check if the user is already added to the map
    if (!userMap.has(userId)) {
      userMap.set(userId, user);
      uniqueContacts.push(contact);
    }
  }
  
/// send info about conatact
const contactList = uniqueContacts
.map((contact) => ({
  contact,
  created: contact.lastMessage ? contact.lastMessage.created : null,
}))
.sort((a, b) => {
  // Handle null values by placing them at the end of the sorted list
  if (a.created === null && b.created === null) {
    return 0;
  } else if (a.created === null) {
    return 1;
  } else if (b.created === null) {
    return -1;
  }

  // Sort by the created property in ascending order
  return a.created - b.created;
})
.map(({ contact }) => (
  <Contact
    {...contact.user}
    key={contact.id}
    token={token}
    id={contact.id}
    deleteContact={deleteContact}
    chatID={chatID}
    setChatID={setChatID}
    lastMessage={contact.lastMessage}
  />
));

  return <div className="users_list">{contactList}</div>;
}

export default ContactListResult;
