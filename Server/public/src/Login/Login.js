import React from 'react';
import './Login.css'
import {Link, useNavigate} from "react-router-dom";




async function send(Username, Password) {
    const data = {
      username: Username,
      password: Password,
    };
  
    const response = await fetch('http://localhost:5000/api/Tokens', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      const token = await response.text();
      return token;
    } else {
      throw new Error('Invalid username or password');
    }
  }
  
  async function sendRequest(username, password) {
    try {
      const token = await send(username, password);
      return token;
    } catch (error) {
      throw error;
    }
  }
  
  
  
function Login() {
    





    const history = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault(); // prevent the default form submission
        const username = event.target.username.value; // get the value of the username input field
        const password = event.target.psw.value; // get the value of the password input field
        sendRequest(username, password)
            .then((token) => {
            history('/Chats', { state: { username: username, token: token } });
            })
            .catch((error) => {
            alert(error.message); // Show an alert with the error message
            });
        
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div id="container2">
                    <div id="form-header2">
                        <h3>Login</h3>
                    </div>
                    <div id="form-body2">
                        <p>Username:</p>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                id="username"
                                required
                            />
                        </div>
                        <p id="passTitle2">Password:</p>
                        <div>
                            <input
                                type="password"
                                placeholder="Enter password"
                                name="psw"
                                id="psw"
                                required
                            />
                        </div>
                    </div>
                    <div id="form-footer2">
                        <button id="loginBtn" type="submit2" className="btn btn-warning">
                            Log in
                        </button>
                        <p>
                            Not a member? <Link to="/SignUp"> Sign up</Link>
                        </p>
                    </div>
                </div>
            </form>
        </>
    );


}
export default Login