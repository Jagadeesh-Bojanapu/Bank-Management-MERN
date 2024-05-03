import React from 'react';
import { Link } from 'react-router-dom';

const AdminList = () => {
    return (
        <div className="container mt-5">
            <h2>Admin Dashboard</h2>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card card-custom">
                        <div className="card-body">
                            <h5 className="card-title">View All Loans</h5>
                            <p className="card-text">View all loans and manage their status.</p>
                            <Link to="/admin/view-loans" className="btn btn-primary">View Loans</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card card-custom">
                        <div className="card-body">
                            <h5 className="card-title">List of All Accounts</h5>
                            <p className="card-text">View all Accounts.</p>
                            <Link to="/admin/accountlist" className="btn btn-primary">All Accounts</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card card-custom">
                        <div className="card-body">
                            <h5 className="card-title">See All Transactions of any user</h5>
                            <p className="card-text">View all Transactions.</p>
                            <Link to="/admin/transaction" className="btn btn-primary">All Transactions</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card card-custom">
                        <div className="card-body">
                            <h5 className="card-title">Manage Users</h5>
                            <p className="card-text">Manage user accounts and permissions.</p>
                            <Link to="/admin/manage-users" className="btn btn-primary">Manage Users</Link>
                        </div>
                    </div>
                </div>

                {/* Add more cards for other admin functionalities */}
            </div>
        </div>
    );
};

export default AdminList;
