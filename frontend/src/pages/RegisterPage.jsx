import { useState, useContext } from "react";
import { userContext } from "../App.jsx";

import { Link } from "react-router-dom";
// import React from "react";
import CardHeader from "../components/CardHeader.jsx";

// RegisterPage.jsx
import { postData } from "../utilities.jsx";
// ...
// const navigate = useNavigate();

const register = (e) => {
  e.preventDefault();
  let response = postData('register/');
  console.log(response);
  let user = response.data.user;
  let token = response.data.token;
  // Store the token securely (e.g., in localStorage or HttpOnly cookies)
  localStorage.setItem("token", token);
  // api.defaults.headers.common["Authorization"] = `Token ${token}`;
  // set the user using with useContext to allow all other pages that need user information
  // setUser(user);
  // navigate("/home");
};

// ...

export default function RegisterForm() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(userContext);
  
    return (
        <>
        <h2>Register</h2>
        <div className="card">

            <CardHeader title="Register" />

            <div className="card-body">
                {/* had onSubmit register() */}
                <form onSubmit={(e) => setUser(userName)}>

                    {/* Input email */}
                    <div className="form-body">
                        <input 
                          type="email"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          id="emailInput"
                          className="form-control"
                        />
                        <label for="emailInput" className="form-label">Email</label>
                    </div>

                    {/* <div className="form-body">
                        <input type="email" id="confirmEmailInput" className="form-control" />
                        <label for="confirmEmailInput" className="form-label">Confirm Email</label>
                    </div> */}

                    {/* Input password */}
                    <div className="form-body">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          id="passwordInput"
                          className="form-control"
                        />
                        <label for="passwordInput" className="form-label">Password</label>
                    </div>

                    {/* <div className="form-body">
                        <input type="password" id="confirmPasswordInput" className="form-control" />
                        <label for="confirmPasswordInput" className="form-label">Confirm Password</label>
                    </div> */}

                    {/* Button */}
                    <div className="form-body">
                        <button className="form-button" type="submit">Register</button>
                    </div>

                </form>
                
            </div>

            {/* Footer */}
            <div className="card-footer">
                <p>Already a member? <Link to="/login">Login</Link></p>
            </div>

        </div>
        </>
    );
  }