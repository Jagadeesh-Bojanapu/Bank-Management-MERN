const Transaction = require('../models/Transaction');
const Account = require('../models/Accounts');
const User = require('../models/User');

async function canPerformTransaction(accountNumber) {
    const account = await Account.findOne({ accountNumber });
    if (!account) {
        throw new Error('Account not found');
    }
    if (account.accountType === 'investment') {
        throw new Error('Transactions are not allowed for investment accounts');
    }
    if (account.status !== 'active') {
        throw new Error('Account is inactive. Please visit the bank for further details.');
    }
    return true;
}

async function handleTechnicalIssue(sourceAccountNumber, amount) {
    const sourceAccount = await Account.findOne({ accountNumber: sourceAccountNumber });
    if (!sourceAccount) {
        throw new Error('Source account not found');
    }
    sourceAccount.balance += amount;
    await sourceAccount.save();
}

async function deposit(accountNumber, amount, transactionPin) {
    await canPerformTransaction(accountNumber);
    const account = await Account.findOne({ accountNumber });
    if (!account) {
        throw new Error('Account not found');
    }
    console.log('Provided PIN:', transactionPin);
    console.log('Stored PIN:', account.transactionPin);
    if (account.transactionPin !== transactionPin) {
        throw new Error('Invalid transaction PIN');
    }
    account.balance += amount;
    await account.save();

    const transaction = new Transaction({
        type: 'deposit',
        amount,
        sourceAccount: account._id
    });
    await transaction.save();

    return { Balance: account.balance, message: 'Deposit Successful', transaction };
}

async function withdraw(accountNumber, amount, transactionPin) {
    await canPerformTransaction(accountNumber);
    const account = await Account.findOne({ accountNumber });
    if (!account) {
        throw new Error('Account not found');
    }
    if (account.transactionPin !== transactionPin) {
        throw new Error('Invalid transaction PIN');
    }
    if (account.balance < amount) {
        throw new Error('Insufficient balance');
    }
    account.balance -= amount;
    await account.save();

    const transaction = new Transaction({
        type: 'withdraw',
        amount,
        sourceAccount: account._id
    });
    await transaction.save();

    return { Balance: account.balance, message: 'Withdraw Successful', transaction };
}

async function fundTransfer(sourceAccountNumber, destinationAccountNumber, amount, transactionPin) {
    const sourceAccount = await Account.findOne({ accountNumber: sourceAccountNumber });
    const destinationAccount = await Account.findOne({ accountNumber: destinationAccountNumber });
    try {
        if (!sourceAccount || !destinationAccount) {
            throw new Error('Source or destination account not found');
        }
        if (sourceAccount.transactionPin !== transactionPin) {
            throw new Error('Invalid transaction PIN');
        }
        if (sourceAccount.balance < amount) {
            throw new Error('Insufficient balance');
        }
        sourceAccount.balance -= amount;
        destinationAccount.balance += amount;
        await sourceAccount.save();
        await destinationAccount.save();

        const transaction = new Transaction({
            type: 'fund transfer',
            amount,
            sourceAccount: sourceAccount._id,
            destinationAccount: destinationAccount._id
        });
        await transaction.save();

        return { sourceBalance: sourceAccount.balance, destinationBalance: destinationAccount.balance, message: 'Fund Transfer Successful', transaction };
    } catch (error) {
        await handleTechnicalIssue(sourceAccountNumber, amount);
        throw new Error('Technical issue occurred during fund transfer. Amount credited back to source account.');
    }
}

async function getAllTransactions() {
    try {
        const transactions = await Transaction.find();
        return transactions;
    } catch (error) {
        throw new Error('Error retrieving transactions');
    }
}

async function getTransactionById(transactionId) {
    try {
        const transaction = await Transaction.findOne({ transactionId }).populate('sourceAccount').populate('destinationAccount');
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        return transaction;
    } catch (error) {
        throw new Error('Error retrieving transaction by ID: ' + error.message);
    }
}

async function getTransactionsByUser(userEmail) {
    try {
        const user = await User.findOne({ email: userEmail }).populate('accounts');
        if (!user) {
            throw new Error('User not found');
        }
        const accountIds = user.accounts.map(account => account._id);
        const transactions = await Transaction.find({ sourceAccount: { $in: accountIds } }).populate('sourceAccount').populate('destinationAccount');
        return transactions;
    } catch (error) {
        throw new Error('Error retrieving user transactions: ' + error.message);
    }
}

module.exports = {
    deposit,
    withdraw,
    fundTransfer,
    getAllTransactions,
    getTransactionsByUser,
    getTransactionById,
    canPerformTransaction
};
