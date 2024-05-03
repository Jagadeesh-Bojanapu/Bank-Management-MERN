const express = require('express');
const router = express.Router();

const{
    getAllAccounts,
    getAllUserAccounts,
    getAccountsByType,
    getAccountById,
    createAccount,
    updateAccount,
    toggleAccountStatus,
    performFixedDeposit,
    performRecurringDeposit
}=require('../Controllers/accountController');

const {authorize} = require('../Middleware/authMiddleware');
router.get('/all', authorize('admin'), getAllAccounts);
router.get('/', getAllUserAccounts);
router.get('/type/:accountType',getAccountsByType);
router.get('/:id',getAccountById);
router.post('/', createAccount);
router.put('/:id',authorize('admin'), updateAccount);
router.put('/status/:id',authorize('admin'),toggleAccountStatus);
router.post('/FD',authorize('admin'), performFixedDeposit);
router.post('/RD',authorize('admin'), performRecurringDeposit);

module.exports = router;
