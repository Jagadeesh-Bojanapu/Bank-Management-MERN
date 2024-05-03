import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserAccounts = () => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserAccounts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/accounts', {
          headers: {
            authorization: token // Use token directly
          }
        });
        console.log('Response data:', response.data);
        setUserAccounts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user accounts:', error);
        setLoading(false);
      }
    };
  
    fetchUserAccounts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAccounts = userAccounts.filter(account =>
    account.accountNumber.includes(searchTerm)
  );

  if (loading) {
    return <div>Loading user accounts...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <div>
            <h2>User Accounts</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by Account Number"
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-control" // Use Bootstrap form control class
              />
            </div>
            <div className="account-container">
              {filteredAccounts.map(account => (
                <div key={account.id} className="card">
                  <div className="card-body">
                    <h3 className="card-title">{account.accountType}</h3>
                    <p className="card-text">Account ID: {account._id}</p>
                    <p className="card-text">Name: {account.user.fullName}</p>
                    <p className="card-text">Account Number: {account.accountNumber}</p>
                    <p className="card-text">Balance: {account.balance}</p>
                    <p className="card-text">Status: {account.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccounts;
