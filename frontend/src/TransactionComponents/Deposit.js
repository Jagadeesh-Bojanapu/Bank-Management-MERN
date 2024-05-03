import React, { useState } from 'react';
import axios from 'axios';

const Deposit = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionPin, setTransactionPin] = useState('');
    const [popupMessage, setPopupMessage] = useState('');

    const handleDeposit = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3001/transactions/deposit', {
                accountNumber,
                amount: parseFloat(amount),
                transactionPin
            }, {
                headers: {
                    authorization: `${token}`
                }
            });
            console.log('Deposit response:', response);
            setPopupMessage(response.data.popupMessage,'Deposit is successfully'); // Set success message
        } catch (error) {
            console.error('Deposit error:', error);
            if (error.response && error.response.data && error.response.data.error === 'Invalid transaction PIN') {
                alert('Invalid transaction PIN. Please try again.');
            } else {
                setPopupMessage('Error occurred during deposit. Please try again later.');
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="transaction-container">
                <h2>Deposit</h2>
                <div className="form-group">
                    <label htmlFor="accountNumber">Account Number:</label>
                    <input type="text" id="accountNumber" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="transactionPin">Transaction PIN:</label>
                    <input type="password" id="transactionPin" value={transactionPin} onChange={e => setTransactionPin(e.target.value)} />
                </div>
                <button onClick={handleDeposit}>Deposit</button>
                {popupMessage && <div className="success-message">{popupMessage}</div>} {/* Render success message */}
            </div>
        </div>
    );
};

export default Deposit;
