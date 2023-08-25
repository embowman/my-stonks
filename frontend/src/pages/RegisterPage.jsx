import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utilities.jsx";
import CardHeader from "../components/CardHeader.jsx";

export default function RegisterPage({ user }) {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const register = async (e, u) => {
        e.preventDefault();
        let response = await api.post("register/", {
            'email': userName,
            'password': password,
        });
        // console.log(response);
        let user = response.data.user;
        let token = response.data.token;

        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;

        user = u;
        navigate("/login");
    };
  
    return (
        <>
        <h2>Register</h2>
        <div className="card">

            <CardHeader title="Register" />

            <div className="card-body">

                <form onSubmit={(e) => register(e, user)}>

                    {/* Input email */}
                    <div className="form-body">
                        <input 
                          type="email"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          id="emailInput"
                          className="form-control"
                        />

                        <label htmlFor="emailInput" className="form-label">Email</label>
                    </div>

                    {/* <div className="form-body">
                        <input type="email" id="confirmEmailInput" className="form-control" />
                        <label htmlFor="confirmEmailInput" className="form-label">Confirm Email</label>
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

                        <label htmlFor="passwordInput" className="form-label">Password</label>
                    </div>

                    {/* <div className="form-body">
                        <input type="password" id="confirmPasswordInput" className="form-control" />
                        <label htmlFor="confirmPasswordInput" className="form-label">Confirm Password</label>
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