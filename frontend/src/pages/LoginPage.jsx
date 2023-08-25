import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utilities.jsx";
import CardHeader from "../components/CardHeader.jsx";

export default function LoginPage({ user }) {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async (e, u) => {
        e.preventDefault();
        let response = await api.post("login/", {
            'email': userName,
            'password': password,
        });

        // console.log(response);
        let user = response.data.user;
        let token = response.data.token;

        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;

        user = u;
        navigate("/");
    };

    return (
        <>
        <h2>Login</h2>
        <div className="card">

            <CardHeader title="Login" />

            <div className="card-body">

                <form onSubmit={(e) => login(e, user)}>

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
                        <button className="form-button" type="submit">Login</button>
                    </div>

                </form>
                
            </div>

            {/* Footer */}
            <div className="card-footer">
                <p>Not a member? <Link to="/register">Register</Link></p>
                <p>Forgot <Link to="/forgot">password?</Link></p>
            </div>

        </div>
        </>
    );
  }