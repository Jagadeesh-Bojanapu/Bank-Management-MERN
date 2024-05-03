import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './Components/About';
import Home from './Components/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar';
import Login from './Auth/Login';
import Register from './Auth/Register';
import AccountList from './AccountComponents/AccountList';
import UserList from './AccountComponents/UserList';
import Withdraw from './TransactionComponents/Withdraw';
import Deposit from './TransactionComponents/Deposit';
import OpenAccount from './Components/OpenAccount'
import CalculateLoanEMI from './LoanComponent/Calculate-emi';
import ApplyLoan from './LoanComponent/Apply-Loan';
import UserAccounts from './Components/UserAccounts';
import FundTransfer from './TransactionComponents/Fund-Transfer';
import UserLoan from './LoanComponent/UserLoan';
import UserTransactions from './TransactionComponents/UserTransaction';
import AllLoans from './LoanComponent/AllLoans';
import AdminList from './AccountComponents/AdminList';
import AllTransactions from './TransactionComponents/AllTransactions';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/userlist' element={<UserList/>}/>

      <Route path="/adminlist" element={<AdminList/>} />
      <Route path='/admin/accountlist' element={<AccountList/>}/>

      <Route path='/open-account' element={<OpenAccount/>}/>
      <Route path='/deposit' element={<Deposit/>}/>
      <Route path='withdraw' element={<Withdraw/>}/>
      <Route path='/transfer' element={<FundTransfer/>}/> 
      <Route path='/transactions' element={<UserTransactions/>}/>
      <Route path='/useraccounts' element={<UserAccounts/>}/>
      <Route path='/admin/transaction' element={<AllTransactions/>}/>


      <Route path='/calculate-emi' element={<CalculateLoanEMI/>}/>
      <Route path='/apply-loan' element={<ApplyLoan/>}/>
      <Route path='/viewloan' element={<UserLoan/>}/>
      <Route path='/admin/view-loans' element={<AllLoans/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
