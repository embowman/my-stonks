// import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import CardHeader from "../components/CardHeader.jsx";

export default function LoginForm() {

    return (
        <>
        <h2>Login</h2>
        <div className="card">

            <CardHeader title="Login" />

            <div className="card-body">

                <form>

                    {/* Input email */}
                    <div className="form-body">
                        <input type="email" id="emailInput" className="form-control" />
                        <label for="emailInput" className="form-label">Email</label>
                    </div>

                    {/* Input password */}
                    <div className="form-body">
                        <input type="password" id="passwordInput" className="form-control" />
                        <label for="passwordInput" className="form-label">Password</label>
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