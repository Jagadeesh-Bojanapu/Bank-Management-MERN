import React, { useState } from 'react';
import axios from 'axios';

const FundTransfer = () => {
    const [sourceAccountNumber, setSourceAccountNumber] = useState('');
    const [destinationAccountNumber, setDestinationAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionPin, setTransactionPin] = useState('');
    const [popupMessage, setPopupMessage] = useState('');

    const handleFundTransfer = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3001/transactions/fund-transfer', {
                sourceAccountNumber,
                destinationAccountNumber,
                amount: parseFloat(amount),
                transactionPin
            }, {
                headers: {
                    authorization: `${token}`
                }
            });
            console.log('Fund Transfer response:', response);
            setPopupMessage(response.data.popupMessage);
        } catch (error) {
            console.error('Fund Transfer error:', error);
            if (error.response && error.response.data && error.response.data.error === 'Invalid transaction PIN') {
                alert('Invalid transaction PIN. Please try again.');
            } else {
                setPopupMessage('Error occurred during fund transfer. Please try again later.');
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="transaction-container">
                <h2>Fund Transfer</h2>
                <div className="form-group">
                    <label htmlFor="sourceAccountNumber">Source Account Number:</label>
                    <input type="text" id="sourceAccountNumber" value={sourceAccountNumber} onChange={e => setSourceAccountNumber(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="destinationAccountNumber">Destination Account Number:</label>
                    <input type="text" id="destinationAccountNumber" value={destinationAccountNumber} onChange={e => setDestinationAccountNumber(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="transactionPin">Transaction PIN:</label>
                    <input type="password" id="transactionPin" value={transactionPin} onChange={e => setTransactionPin(e.target.value)} />
                </div>
                <button onClick={handleFundTransfer} className="btn btn-primary">Transfer Funds</button>
                {popupMessage && <p className={popupMessage.includes('successful') ? 'success-message' : 'error-message'}>{popupMessage}</p>}
            </div>
        </div>
    );
};

export default FundTransfer;
