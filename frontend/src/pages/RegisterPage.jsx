import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utilities.jsx";
import CardHeader from "../components/CardHeader.jsx";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();

        await api.post("register/", {
            'email': username,
            'password': password,
        });

        navigate("/login");
    };
  
    return (
        <>
        <div className="card">

            <CardHeader title="Register" />

            <div className="card-body">

                <form onSubmit={(e) => register(e)}>

                    {/* Input email */}
                    <div className="form-body">
                        <input 
                          type="email"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          id="emailInput"
                          className="form-control"
                        />

                        <label htmlFor="emailInput" className="form-label">Email</label>
                    </div>

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

                    {/* Button */}
                    <div className="form-body">
                        <button className="card-button" type="submit">Register</button>
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