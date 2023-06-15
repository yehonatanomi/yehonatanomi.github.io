import {useNavigate } from "react-router-dom";


async function addContact(Username, token, setContactList, contacts) {
    if (Username === "") {
      return;
    }
    const data = {
      username: Username,
    };
  
    const res = await fetch('http://localhost:5000/api/Chats', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(data)
    });
  
    if (res.ok) {
      const contact = await res.json();
      setContactList((contacts) => [...contacts, contact])
      return true; // Return true indicating success
    } else if (res.status === 401) {
      // User already exists with the provided username
     

      return false; // Return false indicating failure
    } else {
      // Other error occurred
      // Handle the error or display an appropriate message
      // Example: alert('Failed to register. Please try again later.');
      return false; // Return false indicating failure
    }
  }
  

  function Modal({ contacts, setContactList, MyUsername, token }) {
    const history = useNavigate();
  
    function handleAddContact() {
      const usernameInput = document.querySelector('#userToAdd');
      const username = usernameInput.value;
  
      if (!username) {
        alert('Please enter a username');
        return;
      }
  
      addContact(username, token, setContactList, contacts)
        .then((success) => {
          if (success) {
            history(`/Chats`, { state: { username: MyUsername, token: token } });
          } else {
            alert('User not found/U tried to add yourself');
          }
        })
        .catch((error) => {
          console.log('Error occurred:', error);
          // Handle the error or display an appropriate message
        });
    }


    return (
        <>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                 Add contact
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">
                                    Username
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    id="userToAdd"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleAddContact}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal