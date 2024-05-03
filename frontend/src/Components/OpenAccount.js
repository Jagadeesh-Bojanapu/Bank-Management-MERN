import React, { useState } from 'react';
import axios from 'axios';

const CreateAccount = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [balance, setBalance] = useState(0);
  const [transactionPin, setTransactionPin] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3001/accounts', {
       
        name,
        accountType,
        balance,
        transactionPin,
        status
      },
      {
        headers: {
          authorization: `${token}` // Ensure correct format for authorization header
        }
      });
      setAccountNumber(response.data.accountNumber);
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Unknown error occurred');
    }
  }; // <-- Close handleSubmit function properly

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className="create-account-container">
            <h2>Create Account</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="accountType">Account Type:</label>
                <select id="accountType" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                  <option value="">Select Account Type</option>
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                  <option value="investment">Investment</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance:</label>
                <input type="number" id="balance" value={balance} onChange={(e) => setBalance(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="transactionPin">Transaction Pin:</label>
                <input type="password" id="transactionPin" value={transactionPin} onChange={(e) => setTransactionPin(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button type="submit">Create Account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
