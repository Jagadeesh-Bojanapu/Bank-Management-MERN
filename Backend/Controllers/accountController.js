const accountService = require('../Services/accountService');

// Controller Layer (accountController.js)

const getAllAccounts = async (req, res) => {
    try {
        console.log(req);
        const accounts = await accountService.getAllAccounts();
        
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch accounts', error: error.message });
    }
};

const getAccountsByType = async (req, res) => {
    const accountType = req.params.accountType;

    try {
        const accounts = await accountService.getAccountsByType(accountType);
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch accounts by type', error: error.message });
    }
};


const getAllUserAccounts = async (req, res) => {
    try {
        let userEmail = null;
        if (!req.isAdmin) {
            userEmail = req.user.email;
        }
        const accounts = await accountService.getAllUserAccounts(userEmail);
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch accounts', error: error.message });
    }
};



const getAccountById=async (req, res)=> {
    const id=req.params.id;
    try {
        const account = await accountService.getAccountById(id);
        if(!account){
            return res.status(404).json({message:'Account not found'});
        }
        res.json(account);
    } catch (error) {
        res.status(500).json({ message:'Failed to Fetch account',error: error.message });
    }
}

const createAccount = async (req, res) => {
    const email = req.user.email; 
    const { accountNumber, accountType, balance,transactionPin} = req.body;
    try {
        const { message, account } = await accountService.createAccount(email, accountNumber, accountType, balance,transactionPin);
        res.status(201).json({ message, account });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateAccount = async (req, res) => {
    try {
        const accountId = req.params.id;
        const newData = req.body;

        const updatedAccount = await accountService.updateAccount(accountId, newData);

        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const toggleAccountStatus = async (req, res) => {
    const accountId = req.params.id;
    const isActive = req.body.isActive;
    try {
        const result = await accountService.toggleAccountStatus(accountId, isActive);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const performFixedDeposit = async (req, res) => {
    const { accountId, amount, interestRate, duration } = req.body;

    try {
        const result = await accountService.performFixedDeposit(accountId, amount, interestRate, duration);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const performRecurringDeposit = async (req, res) => {
    const { accountId, amount, frequency } = req.body;

    try {
        const result = await accountService.performRecurringDeposit(accountId, amount, frequency);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getAllAccounts,
    getAllUserAccounts,
    getAccountsByType,
    getAccountById,
    createAccount,
    updateAccount,
    toggleAccountStatus,
    performFixedDeposit,
    performRecurringDeposit
  
};
