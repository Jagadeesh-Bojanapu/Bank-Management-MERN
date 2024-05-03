import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // Default role is set to 'customer'
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                email,
                password,
                role // Include selected role in the login request
            });
            const { token } = response.data;

            // Store the token securely in localStorage
            localStorage.setItem('token', token);

            if (role === 'customer') {
                navigate('/userlist');
            } else {
                navigate('/adminlist');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="role">Role:</label>
                <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
