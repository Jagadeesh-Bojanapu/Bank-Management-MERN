import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3001/auth/register', {
                email,
                password,
                role,
                fullName,
                address,
                phone
            });
            console.log(response.data.message);
            // Redirect to login page after successful registration
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <select id="role" className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">Select Role</option>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input type="text" id="fullName" className="form-control" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" className="form-control" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="text" id="phone" className="form-control" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                </div>
            </div>
            <button className="btn btn-primary me-2" onClick={handleRegister}>Register</button>
                    <button className="btn btn-secondary" onClick={() => {window.location.href='/login'}}>Login</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default Register;
