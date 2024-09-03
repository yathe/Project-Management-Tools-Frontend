import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../redux/authSlice';
import "./registration.css";

const Signin = () => {
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            signin({ email: email, password: password })
        )
        // navigate("/dashboard");
    }
    return (
        <div className='signup-form'>
            <div className="signup-form__wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email" placeholder='Enter Email' value={email} onChange={(e) => SetEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder='Enter Password' value={password} onChange={(e) => SetPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin;
