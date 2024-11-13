// Select DOM elements
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const expenseList = document.getElementById('tableBody');
const totalAmountDisplay = document.getElementById('totalExpense');
const statusMessage = document.getElementById('statusMessage'); // Ensure this exists in HTML
const incomeDisplay = document.getElementById('incomeDisplay'); // Display for monthly salary
const spendingAmountDisplay = document.getElementById('spendingAmount'); // Display for available to spend

let totalExpenses = 0;
let monthlyIncome = 0; // Added a variable to hold monthly income

// Load expenses and income from local storage when the page loads
window.onload = function() {
    loadExpenses();
    loadIncome(); // Load the income when the page loads
};

// Function to set income and save to local storage
function setIncome() {


    const income = document.getElementById('monthlyIncome').value;
    monthlyIncome = parseFloat(income);
    localStorage.setItem('monthlyIncome', monthlyIncome);
    incomeDisplay.textContent = `$${monthlyIncome.toFixed(2)}`;
    updateAvailableToSpend(); // Update available amount to spend
}

// Function to load income from local storage
function loadIncome() {
    const storedIncome = localStorage.getItem('monthlyIncome');
    if (storedIncome) {
        monthlyIncome = parseFloat(storedIncome);
        incomeDisplay.textContent = `$${monthlyIncome.toFixed(2)}`;
        updateAvailableToSpend(); // Update available amount to spend
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
    const expense = {
        name: expenseName,
        amount: expenseAmount
    };

    // Save expense to local storage
    saveExpenseToLocalStorage(expense);

    // Update the displayed expenses
    displayExpense(expense);

    // Update total expenses and display
    totalExpenses += expenseAmount;
    updateTotalExpense();
    updateAvailableToSpend(); // Update available amount to spend

    // Clear input fields
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
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
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to load expenses from local storage
function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => {
        displayExpense(expense); // Display each expense
        totalExpenses += expense.amount; // Add to total expenses
    });
    updateTotalExpense(); // Update total expense display after loading
    updateAvailableToSpend(); // Update available amount to spend after loading expenses
}

// Function to display a single expense
function displayExpense(expense) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${expense.name}</td>
        <td>$${expense.amount.toFixed(2)}</td>
    `;
    expenseList.appendChild(row);
}

// Add event listener to the form
expenseForm.addEventListener('submit', addExpense);


