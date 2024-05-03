import React from 'react';
import { Link } from 'react-router-dom';


const UserAccountDashboard = () => {
    return (
        <div className="container mt-5">
            <h2>User Account Dashboard</h2>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card card-custom">
                        <div className="card-body">
                            <h5 className="card-title">Open Account</h5>
                            <p className="card-text">Open a new bank account.</p>
                            <Link to="/open-account" className="btn btn-primary">Open Account</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card card-custom">
                        <div className="card-body">
                            <h5 className="card-title">User Accounts</h5>
                            <p className="card-text">Accounts of the user</p>
                            <Link to="/useraccounts" className="btn btn-primary">My Accounts</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card card-custom">
                        <div className="card-body">
                            <h5 className="card-title">Deposit</h5>
                            <p className="card-text">Deposit funds into your account.</p>
                            <Link to="/deposit" className="btn btn-primary">Deposit</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card card-custom">
                        <div className="card-body">
                            <h5 className="card-title">Withdraw</h5>
                            <p className="card-text">Withdraw funds from your account.</p>
                            <Link to="/withdraw" className="btn btn-primary">Withdraw</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card card-custom">
                        <div className="card-body">
                            <h5 className="card-title">Money Transfer</h5>
                            <p className="card-text">Transfer funds from your account to another account.</p>
                            <Link to="/transfer" className="btn btn-primary">Money-Transfer</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card card-custom">
                        <div className="card-body">
                            <h5 className="card-title">Transaction</h5>
                            <p className="card-text">see all your transactions</p>
                            <Link to="/transactions" className="btn btn-primary">See Transaction</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card card-custom">
                        <div className="card-body">
                            <h5 className="card-title">Calculate EMI</h5>
                            <p className="card-text">EMI for your luxury life</p>
                            <Link to="/calculate-emi" className="btn btn-primary">Calculate Loan EMI</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card card-custom">
                        <div className="card-body">
                            <h5 className="card-title">Apply Loan</h5>
                            <p className="card-text">Loan for your needs</p>
                            <Link to="/apply-loan" className="btn btn-primary">Apply</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card card-custom">
                        <div className="card-body">
                            <h5 className="card-title">View Loan</h5>
                            <p className="card-text">see your loan amount</p>
                            <Link to="/viewloan" className="btn btn-primary">Loan Account</Link>
                        </div>
                    </div>
                </div>
                {/* Add more cards for other options */}
            </div>
        </div>
    );
};

export default UserAccountDashboard;
