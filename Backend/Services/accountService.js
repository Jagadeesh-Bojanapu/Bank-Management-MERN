const Account = require('../models/Accounts');
const User= require('../models/User');


// Service Layer (accountService.js)
const getAllAccounts = async () => {
    try {
        return await Account.find().populate('user');
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllUserAccounts = async (userEmail) => {
    try {
        if (userEmail) {
            const user = await User.findOne({ email: userEmail });
            if (!user) {
                throw new Error("User not found");
            }
            return await Account.find({ user: user._id }).populate('user');
        } else {
            return await Account.find().populate('user');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};



const getAccountsByType = async (accountType) => {
    try {
        const accounts = await Account.find({ accountType: accountType });
        return accounts;
    } catch (error) {
        throw new Error('Failed to fetch accounts by type');
    }
};

const getAccountById=async (id) =>{
    return await Account.findById(id);
}

const createAccount = async (email, accountNumber, accountType, balance, transactionPin) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        // Check if the user already has an account of the same type
        const existingAccount = await Account.findOne({ user: user._id, accountType });

        if (existingAccount) {
            throw new Error(`User already has a ${accountType} account`);
        }

        const newAccount = new Account({
            accountNumber,
            accountType,
            balance, // Include balance when creating the new account
            transactionPin,
            user: user._id
        });

        await newAccount.save();
        // Push the accountNumber to the user's accounts array
        user.accounts.push(newAccount._id);
        await user.save();

        return {
            message: "Account created successfully",
            account: newAccount // Return the created account
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateAccount = async (id, newData) => {
    try {
        const updatedAccount = await Account.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedAccount) {
            throw new Error("Account not found");
        }

        return updatedAccount;
    } catch (error) {
        throw new Error(error.message);
    }
};

const toggleAccountStatus = async (accountId) => {
    try {
        // Fetch the current account
        const account = await Account.findById(accountId);

        if (!account) {
            throw new Error("Account not found");
        }

        // Determine the new status by toggling the current status
        const newStatus = account.status === 'active' ? 'inactive' : 'active';

        // Update the account status
        const updatedAccount = await Account.findByIdAndUpdate(accountId, { status: newStatus }, { new: true });

        if (!updatedAccount) {
            throw new Error("Account not found");
        }

        return newStatus === 'active' ? "Account activated successfully" : "Account deactivated successfully";
    } catch (error) {
        throw new Error(error.message);
    }
};

const performFixedDeposit = async (accountId, amount, interestRate, duration) => {
    try {
        const account = await Account.findById(accountId);

        if (!account) {
            throw new Error("Account not found");
        }

        // Check if the account type is investment
        if (account.accountType !== 'investment') {
            throw new Error("Fixed deposit can only be performed on investment accounts");
        }

        // Calculate maturity date
        const maturityDate = new Date();
        maturityDate.setMonth(maturityDate.getMonth() + duration);

        // Additional logic for fixed deposit (FD)
        // Here, we'll just update the account balance and set maturity date for simplicity
        account.balance += amount;
        account.fixedDepositAmount = amount;
        account.fixedDepositInterestRate = interestRate;
        account.fixedDepositDuration = duration;
        account.fixedDepositMaturity = maturityDate;
        await account.save();

        return {
            message: "Fixed deposit successful",
            account
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const performRecurringDeposit = async (accountId, amount, frequency) => {
    try {
        const account = await Account.findById(accountId);

        if (!account) {
            throw new Error("Account not found");
        }

        // Check if the account type is investment
        if (account.accountType !== 'investment') {
            throw new Error("Recurring deposit can only be performed on investment accounts");
        }

        // Additional logic for recurring deposit (RD)
        // Update the account balance based on the selected frequency
        let multiplier = 1; // Default to monthly
        if (frequency === 'quarterly') {
            multiplier = 3; // Quarterly deposits
        }

        // Calculate the updated balance
        account.balance += amount * multiplier;
        account.recurringDepositAmount = amount;
        account.recurringDepositFrequency = frequency; // Update frequency here
        await account.save();

        return {
            message: `Recurring deposit (${frequency}) successful`,
            account
        };
    } catch (error) {
        throw new Error(error.message);
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
