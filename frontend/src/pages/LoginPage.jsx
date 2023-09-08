import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../utilities.jsx";
import CardHeader from "../components/CardHeader.jsx";

export default function LoginPage() {
    const [[user, setUser], [watchlist, setWatchlist]] = useOutletContext();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const response = await api.post("login/", {
            'email': username,
            'password': password,
        })
        .catch(() => {
            alert("Incorrect Credentials");
        })

        if (response) {
            const user = response.data.user;
            const token = response.data.token;

            setUser(user);

            localStorage.setItem("token", token);
            api.defaults.headers.common["Authorization"] = `Token ${token}`;

            navigate("/watchlist");
        }
    };

    return (
        <>
        <div className="card">

            <CardHeader title="Login" />

            <div className="card-body">

                <form onSubmit={(e) => login(e)}>

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
                        <button className="card-button" type="submit">Login</button>
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