import React, { useState } from 'react';
import axios from 'axios';

const ApplyLoan = () => {
    const [loanData, setLoanData] = useState({
        accountNumber: '',
        amount: 0,
        interestRate: 0,
        tenureMonths: 0
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoanData({ ...loanData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3001/loans/apply-loan', loanData, {
                headers: {
                    authorization: `${token}` // Fix syntax for setting authorization header
                }
            });
            setSuccessMessage('Loan application submitted successfully!');
            setErrorMessage('');
            console.log(response.data); // Handle success response
        } catch (error) {
            setErrorMessage('Error applying for loan: ' + error.response.data);
            setSuccessMessage('');
            console.error('Error applying for loan:', error.response.data);
        }
    };

    return (
        <div>
            <h2>Apply for Loan</h2>
            <div>
                <label>Account Number:</label>
                <input type="text" name="accountNumber" value={loanData.accountNumber} onChange={handleChange} />
            </div>
            <div>
                <label>Loan Amount:</label>
                <input type="number" name="amount" value={loanData.amount} onChange={handleChange} />
            </div>
            <div>
                <label>Interest Rate:</label>
                <input type="number" name="interestRate" value={loanData.interestRate} onChange={handleChange} />
            </div>
            <div>
                <label>Tenure (in months):</label>
                <input type="number" name="tenureMonths" value={loanData.tenureMonths} onChange={handleChange} />
            </div>
            <button onClick={handleSubmit}>Apply for Loan</button>
            {successMessage && <p>{successMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default ApplyLoan;
