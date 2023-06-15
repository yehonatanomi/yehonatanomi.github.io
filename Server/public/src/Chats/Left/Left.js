import Modal from "./Modal/Modal";
import './Left.css'
import ContactListResult from "./ContactListResult/ContactListResult";
import { useState, useEffect } from "react";

async function getInfo(username, token) {
  const response = await fetch('http://localhost:5000/api/Users/' + username, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  });
  const info = await response.json();

  return info;
}

async function getDetails(username, token) {
  const json = await getInfo(username, token);
  return json;
}

function Left({ username, contactList, setContactList, token, chatID, setChatID }) {
  const [information, setInformation] = useState(null);

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const json = await getDetails(username, token);
        setInformation(json);
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };

    fetchInformation();
  }, [username, token]);

  if (!information) {
    return <div>Loading...</div>;
  }

  const display = information.displayName;
  const pic = information.profilePic;

  return (
    <>
      <div className="left">
        <div className="row-aaa top">
          <img className="side-img" src={pic} alt="" />
          <p id="user">{display}</p>
          <button
            id="addButton"
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="bi bi-person-plus-fill" />
            Add
          </button>
          <Modal contacts={contactList} setContactList={setContactList} MyUsername={username} token={token} />
        </div>
        <ContactListResult contacts={contactList} setContactList={setContactList} token={token} chatID={chatID} setChatID={setChatID} />
      </div>
    </>
  );
}

export default Left;
