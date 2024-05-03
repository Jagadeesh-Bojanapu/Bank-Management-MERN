import React, { useState } from 'react';
import axios from 'axios';

const CalculateLoanEMI = () => {
    const [amount, setAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [tenureMonths, setTenureMonths] = useState('');
    const [emi, setEMI] = useState('');
    const [error, setError] = useState('');

    const handleCalculateEMI = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from local storage
            const response = await axios.post('http://localhost:3001/loans/calculate-emi', {
                amount,
                interestRate,
                tenureMonths
            },
            {
                headers: {
                    authorization: `${token}`
                }
            });

            setEMI(response.data.emi);
        } catch (error) {
            setError('Failed to calculate EMI');
        }
    };

    return (
        <div>
            <h2>Calculate Loan EMI</h2>
            <div>
                <label>Loan Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
                <label>Interest Rate:</label>
                <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
            </div>
            <div>
                <label>Tenure (in months):</label>
                <input type="number" value={tenureMonths} onChange={(e) => setTenureMonths(e.target.value)} />
            </div>
            <button onClick={handleCalculateEMI}>Calculate EMI</button>
            {emi && <p>EMI: {emi}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default CalculateLoanEMI;
