import React, { useState } from 'react';
import axios from 'axios';

const Withdraw = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionPin, setTransactionPin] = useState('');
    const [popupMessage, setPopupMessage] = useState('');

    const handleWithdraw = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3001/transactions/withdraw', {
                accountNumber,
                amount: parseFloat(amount),
                transactionPin
            }, {
                headers: {
                    authorization: `${token}`
                }
            });
            console.log('Withdraw response:', response);
            setPopupMessage(response.data.popupMessage);
        } catch (error) {
            console.error('Withdraw error:', error);
            if (error.response && error.response.data && error.response.data.error === 'Invalid transaction PIN') {
                alert('Invalid transaction PIN. Please try again.');
            } else {
                setPopupMessage('Error occurred during withdrawal. Please try again later.');
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="transaction-container">
                <h2>Withdraw</h2>
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
                <button onClick={handleWithdraw} className="btn btn-danger">Withdraw</button>
                {popupMessage && <p className={popupMessage.includes('successful') ? 'success-message' : 'error-message'}>{popupMessage}</p>}
            </div>
        </div>
    );
};

export default Withdraw;
