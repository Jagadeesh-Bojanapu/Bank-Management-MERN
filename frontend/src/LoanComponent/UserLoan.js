import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserLoan = () => {
    const [userAccounts, setUserAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserAccounts = async () => {
            try {
                const token = localStorage.getItem('token'); // Get user token from local storage

                // Fetch user's accounts
                const response = await axios.get('http://localhost:3001/loans/', {
                    headers: {
                        authorization: `${token}`
                    }
                });
                setUserAccounts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user accounts:', error);
                setError('Error fetching user accounts. Please try again later.');
                setLoading(false);
            }
        };

        fetchUserAccounts();
    }, []);

    return (
        <div>
            <h2>User Dashboard</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h3>User Loans</h3>
                    {userAccounts.length > 0 ? (
                        userAccounts.map(account => (
                            <div key={account._id}>
                                <h4>Account Number: {account.accountNumber}</h4>
                                <ul>
                                    {account.loans.map(loan => (
                                        <li key={loan._id}>
                                            Loan ID: {loan._id}, Amount: {loan.amount}, Interest Rate: {loan.interestRate}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>No accounts found for the user.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserLoan;
