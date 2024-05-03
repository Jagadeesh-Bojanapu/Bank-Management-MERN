import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllLoans = ({ accountNumber }) => {
  const [allLoans, setAllLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [updateError, setUpdateError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAllLoans = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/loans/all', {
          headers: {
            authorization: `${token}`
          }
        });
        // Check if the response contains the data property
        if (response.data && Array.isArray(response.data.loans)) {
          setAllLoans(response.data.loans);
        } else {
          throw new Error('Invalid data received');
        }
      } catch (error) {
        console.error('Error fetching all loans:', error.message);
      }
    };
  
    fetchAllLoans();
  }, [accountNumber]);
  

  useEffect(() => {
    // Filter allLoans based on searchTerm
    const filtered = allLoans.filter(loan =>
      loan._id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLoans(filtered);
  }, [searchTerm, allLoans]);

  const handleStatusChange = async (loanId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3001/loans/update-status/${loanId}`, { newStatus }, {
        headers: {
          authorization: `${token}`
        }
      });
      // Update the loan status locally
      const updatedLoans = allLoans.map(loan => {
        if (loan._id === loanId) {
          return { ...loan, status: newStatus };
        }
        return loan;
      });
      setAllLoans(updatedLoans);
      setUpdateError(null);
    } catch (error) {
      setUpdateError(error.response.data.error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div>
            <h2>Your Loans</h2>
            <input
              type="text"
              placeholder="Search by Loan ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="table">
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Amount</th>
                  <th>EMI</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map((loan) => (
                  <tr key={loan._id}>
                    <td>{loan._id}</td>
                    <td>{loan.amount}</td>
                    <td>{loan.emi}</td>
                    <td>{loan.status}</td>
                    <td>
                      <button className="btn btn-success mr-2" onClick={() => handleStatusChange(loan._id, 'approved')}>Approve</button>
                      <button className="btn btn-danger mr-2" onClick={() => handleStatusChange(loan._id, 'rejected')}>Reject</button>
                      <button className="btn btn-warning" onClick={() => handleStatusChange(loan._id, 'pending')}>Pending</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {updateError && <p style={{ color: 'red' }}>{updateError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllLoans;
