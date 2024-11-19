// Select DOM elements
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const expenseList = document.getElementById('tableBody');
const totalAmountDisplay = document.getElementById('totalExpense');
const statusMessage = document.getElementById('statusMessage');
const incomeDisplay = document.getElementById('incomeDisplay');
const spendingAmountDisplay = document.getElementById('spendingAmount');
const resetButton = document.getElementById('reset-btn');
const deleteLastButton = document.getElementById('delete-last-btn');
const incomeInput = document.getElementById('monthlyIncome');

let totalExpenses = 0;
let monthlyIncome = 0;

// Load data from local storage when the page loads
window.onload = function () {
    loadExpenses();
    loadIncome();
};

// Function to set income and save to local storage
function setIncome() {
    const income = incomeInput.value;
    monthlyIncome = parseFloat(income);

    if (isNaN(monthlyIncome) || monthlyIncome <= 0) {
        statusMessage.textContent = "Please enter a valid income.";
        statusMessage.style.color = "red";
        return;
    }

    localStorage.setItem('monthlyIncome', monthlyIncome);
    incomeDisplay.textContent = `$${monthlyIncome.toFixed(2)}`;
    updateAvailableToSpend();
    incomeInput.value = '';
    statusMessage.textContent = '';
}

// Function to load income from local storage
function loadIncome() {
    const storedIncome = localStorage.getItem('monthlyIncome');
    if (storedIncome) {
        monthlyIncome = parseFloat(storedIncome);
        incomeDisplay.textContent = `$${monthlyIncome.toFixed(2)}`;
        updateAvailableToSpend();
    }
}

// Function to add expense
function addExpense(event) {
    event.preventDefault();

    const expenseName = expenseNameInput.value.trim();
    const expenseAmount = parseFloat(expenseAmountInput.value);

    // Validation
    if (!expenseName) {
        statusMessage.textContent = "Please enter a valid expense name.";
        statusMessage.style.color = "red";
        return;
    }

    if (isNaN(expenseAmount) || expenseAmount <= 0) {
        statusMessage.textContent = "Please enter a valid amount.";
        statusMessage.style.color = "red";
        return;
    }

    // Check for duplicate expense
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    if (expenses.some(expense => expense.name === expenseName)) {
        statusMessage.textContent = "This expense already exists.";
        statusMessage.style.color = "red";
        return;
    }

    // Create a new expense object
    const expense = { name: expenseName, amount: expenseAmount };

    // Save expense to local storage
    saveExpenseToLocalStorage(expense);

    // Update the displayed expenses
    displayExpense(expense);

    // Update total expenses and display
    totalExpenses += expenseAmount;
    updateTotalExpense();
    updateAvailableToSpend();

    // Clear input fields and status message
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
    statusMessage.textContent = '';
}

// Function to update and display total expenses
function updateTotalExpense() {
    totalAmountDisplay.textContent = `$${totalExpenses.toFixed(2)}`;
}

// Function to update and display available amount to spend
function updateAvailableToSpend() {
    const availableToSpend = monthlyIncome - totalExpenses;
    spendingAmountDisplay.textContent = `$${availableToSpend.toFixed(2)}`;
}

// Function to save expense to local storage
function saveExpenseToLocalStorage(expense) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to load expenses from local storage
function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => {
        displayExpense(expense);
        totalExpenses += expense.amount;
    });
    updateTotalExpense();
    updateAvailableToSpend();
}

// Function to display a single expense
function displayExpense(expense) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${expense.name}</td>
        <td>$${expense.amount.toFixed(2)}</td>
        <td><button class="delete-btn" data-name="${expense.name}">Delete</button></td>
    `;
    expenseList.appendChild(row);
}

// Function to delete an expense
function deleteExpense(expenseName) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expenseToDelete = expenses.find(expense => expense.name === expenseName);

    if (!expenseToDelete) return;

    totalExpenses -= expenseToDelete.amount;
    updateTotalExpense();
    updateAvailableToSpend();

    expenses = expenses.filter(expense => expense.name !== expenseName);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Delete individual expense event listener
expenseList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const expenseName = event.target.getAttribute('data-name');
        deleteExpense(expenseName);
        event.target.parentElement.parentElement.remove();
    }
});

// Function to reset the entire app
resetButton.addEventListener('click', () => {
    if (confirm("Are you sure you want to reset all entries?")) {
        localStorage.clear();
        totalExpenses = 0;
        monthlyIncome = 0;
        expenseList.innerHTML = '';
        updateTotalExpense();
        incomeDisplay.textContent = `$0.00`;
        spendingAmountDisplay.textContent = `$0.00`;
    }
});

// Function to delete the last added expense
deleteLastButton.addEventListener('click', () => {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    if (expenses.length === 0) {
        statusMessage.textContent = "No expenses to delete.";
        statusMessage.style.color = "red";
        return;
    }

    const lastExpense = expenses.pop();
    localStorage.setItem('expenses', JSON.stringify(expenses));

    totalExpenses -= lastExpense.amount;
    updateTotalExpense();
    updateAvailableToSpend();

    const lastRow = expenseList.lastElementChild;
    if (lastRow) expenseList.removeChild(lastRow);

    statusMessage.textContent = "Last entry deleted.";
    statusMessage.style.color = "green";
});

// Add event listener to the form
expenseForm.addEventListener('submit', addExpense);
