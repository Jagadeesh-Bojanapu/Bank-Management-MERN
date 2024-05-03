import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/transactions/all', {
          headers: {
            authorization: `${token}`
          }
        });
        setTransactions(response.data.transactions);
      } catch (error) {
        setError('Error fetching transactions. Please try again later.');
      }
    };

    fetchAllTransactions();
  }, []);

  return (
    <div>
      <h2>All Transactions</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <table className="transactions-table"> {/* Add a class for styling */}
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction._id}>
                <td>{transaction._id}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllTransactions;
