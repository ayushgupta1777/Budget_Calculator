const transactions = [];
let balance = 0;

function addTransaction() {
    const description = document.getElementById('descriptionInput').value;
    const amount = parseFloat(document.getElementById('amountInput').value);
    const type = document.getElementById('typeInput').value;

    if (description.trim() ===
     '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid description and amount.');
        return;
    }

    const transaction = {
        id: new Date().getTime(),
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);
    updateTransactionList();
    updateBalance();
    

    document.getElementById('descriptionInput').value = '';
    document.getElementById('amountInput').value = '';
}

function updateTransactionList() {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';

    for (const transaction of transactions) 
    
    {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${transaction.description}</span>
            <span>${transaction.type === 'income' ? '+' : '-'} ₹${transaction.amount.toFixed(2)}</span>
            <button onclick="deleteTransaction(${transaction.id})">Delete</button>
        `;
        transactionList.appendChild(listItem);
    }
}

function deleteTransaction(id) {
    const index = transactions.findIndex(transaction => transaction.id === id);
    if (index !== -1) {
        transactions.splice(index, 1);
        updateTransactionList();
        updateBalance();
    }
}

function updateBalance() {
    let totalIncome = 0;
    let totalExpense = 0;

    for (const transaction of transactions) {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    }

    balance = totalIncome - totalExpense;
    document.getElementById('balanceAmount').innerText = `₹${balance.toFixed(2)}`;
}


