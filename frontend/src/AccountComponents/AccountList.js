// AccountList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import the configured Axios instance
import Spinner from 'react-bootstrap/Spinner'

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAccounts = async () => {
    try {
      // Fetch accounts using the authenticated endpoint
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/accounts/all', {
        headers: {
          authorization: `${token}`
        }
      });
      setAccounts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setError(error.response ? error.response.data.message : 'Unknown error occurred');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const filteredAccounts = accounts.filter(account => {
    return account.user.fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = async (accountId, newStatus) => {
    try {
      // Send a PUT request to update the status
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3001/accounts/${accountId}`, { status: newStatus }, {
        headers: {
          authorization: `${token}`
        }
      });
      // Update the local state immediately after changing the status
      const updatedAccounts = accounts.map(account => {
        if (account._id === accountId) {
          return { ...account, status: newStatus };
        }
        return account;
      });
      setAccounts(updatedAccounts);
    } catch (error) {
      console.error('Error updating account status:', error);
      // Handle error
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" />;

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Account List</h2>
      Search Here:
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div>
      <table className="table" style={{ border: '1px solid black' }}>
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Balance</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th> {/* Add a new column for status change action */}
            {/* Add more headers if needed */}
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map(account => (
            <tr key={account._id}>
              <td>{account.accountNumber}</td>
              <td>{account.user.fullName}</td>
              <td>{account.user.email}</td>
              <td>{account.user.role}</td>
              <td>{account.balance}</td>
              <td>{account.accountType}</td>
              <td>{account.status}</td>
              <td>
                {/* Dropdown menu for changing the status */}
                <select onChange={e => handleStatusChange(account._id, e.target.value)} value={account.status}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  {/* Add more status options if needed */}
                </select>
              </td>
              {/* Add more columns if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</div>
  );
};

export default AccountList;
