import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/transactions', {
          headers: {
            authorization: `${token}`
          }
        }); // Update the URL to match your backend endpoint
        setTransactions(response.data.transactions);
      } catch (error) {
        setError(error.response.data.error);
      }
    };
    fetchUserTransactions();
  }, []);

  const handleSearch = () => {
    // Filter transactions based on the search term
    const filteredTransactions = transactions.filter(transaction =>
      transaction._id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTransactions(filteredTransactions);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <div>
            <h2>Transactions History</h2>
            {error && <p>{error}</p>}
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Transaction ID"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction._id}>
                    <td>{transaction._id}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTransaction;
