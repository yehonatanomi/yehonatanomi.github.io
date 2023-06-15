import './SignUp.css';
import AddPicture from './Addpicture/AddPicture.js';
import Password from './Password/password';
import {Link, useNavigate} from "react-router-dom";
import { useState } from 'react';


async function send(DisplayName, Username, Password, Pic) {
    const data = {
      username: Username,
      password: Password,
      displayName: DisplayName,
      profilePic: Pic
    };
  
    const res = await fetch('http://localhost:5000/api/Users', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  
    if (res.ok) {
      // User registered successfully
      console.log('Registration successful');
      return true; // Return true indicating success
    } else if (res.status === 409) {
      // User already exists with the provided username
      console.log('Username already taken');
      alert('Username already taken!');
      return false; // Return false indicating failure
    } else {
      // Other error occurred
      console.log('Registration failed');
      // Handle the error or display an appropriate message
      // Example: alert('Failed to register. Please try again later.');
      return false; // Return false indicating failure
    }
  }
  
  function SignUp() {
    const [uploadedFile, setUploadedFile] = useState(null);
  
    const history = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
      const displayName = document.getElementById('display-name').value;
      const MyUsername = document.getElementById('username2').value;
      const Mypassword = document.getElementById('psw2').value;
      const repeatPassword = document.getElementById('psw-repeat').value;
  
      if (Mypassword !== repeatPassword) {
        alert('Passwords do not match!');
        return;
      }
  
      if (Mypassword.length < 8 || Mypassword.length > 16) {
        alert('Password should be between 8 and 16 characters long!');
        return;
      }
  
      if (repeatPassword.length < 8 || repeatPassword.length > 16) {
        alert('Password should be between 8 and 16 characters long!');
        return;
      }
  
      if (uploadedFile !== null) {
        const reader = new FileReader();
        reader.onloadend = () => {
          send(displayName, MyUsername, Mypassword, reader.result)
            .then((success) => {
              if (success) {
                history(`/`);
              }
            });
        };
        reader.readAsDataURL(uploadedFile);
      } else {
        fetch('man.png')
          .then((response) => response.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              send(displayName, MyUsername, Mypassword, reader.result)
                .then((success) => {
                  if (success) {
                    history(`/`);
                  }
                });
            };
            reader.readAsDataURL(blob);
          });
      }
    };
  
  

    return (
        <form id="myform" onSubmit={handleSubmit}>
            <div className="container">
                <div id="form-header">
                    <h3>Sign up</h3>
                </div>
                <div id="form-body">
                    <p>Username:</p>
                    <div>
                        <i className="bi bi-person-circle" />
                        <input
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            id="username2"
                            required
                        />
                    </div>
                    <Password />
                    <p>Display name:</p>
                    <div>
                        <i className="bi bi-person-vcard" />
                        <input
                            type="text"
                            placeholder="Enter display name"
                            name="display"
                            id="display-name"
                            required
                        />
                    </div>

                    <AddPicture id ="pic" uploaded={uploadedFile} setUploaded={setUploadedFile}/>

                </div>

                <div id="form-footer">

                    <button  type="submit" className="btn btn-warning signupBtn" id="register">
                        Register
                    </button>

                    <p>
                        Already have an account? <Link to="/"> Sign in</Link>
                    </p>
                </div>
            </div>
        </form>

    );
}

export default SignUp