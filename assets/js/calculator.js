// Array to store last three results
let memory = [];

// Update memory table with latest entries
const updateMemoryTable = () => {
    const memoryTable = document.getElementById('memoryTable-el');
    memoryTable.innerHTML = ''; // Clear existing rows

    memory.forEach(result => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = result;
        row.appendChild(cell);
        memoryTable.appendChild(row);
    });
};

// Add result to memory 
const addToMemory = (result) => {
    memory.unshift(result); // Add new result 
    localStorage.setItem('memory', JSON.stringify(memory)); // Save to local storage
    updateMemoryTable();
};

// Calculator functions with arrow syntax
const sum = () => {
    const firstNum = parseFloat(document.getElementById('firstNum-el').value);
    const secondNum = parseFloat(document.getElementById('secondNum-el').value);
    const result = firstNum + secondNum;

    document.getElementById('sum-el').textContent = `The result is: ${result}`;
    addToMemory(result);
};

const sub = () => {
    const firstNum = parseFloat(document.getElementById('firstNum-el').value);
    const secondNum = parseFloat(document.getElementById('secondNum-el').value);
    const result = firstNum - secondNum;

    document.getElementById('sum-el').textContent = `The result is: ${result}`;
    addToMemory(result);
};

const mult = () => {
    const firstNum = parseFloat(document.getElementById('firstNum-el').value);
    const secondNum = parseFloat(document.getElementById('secondNum-el').value);
    const result = firstNum * secondNum;

    document.getElementById('sum-el').textContent = `The result is: ${result}`;
    addToMemory(result);
};

const div = () => {
    const firstNum = parseFloat(document.getElementById('firstNum-el').value);
    const secondNum = parseFloat(document.getElementById('secondNum-el').value);
    if (secondNum === 0) {
        document.getElementById('sum-el').textContent = 'Error: Division by zero';
        return;
    }
    const result = firstNum / secondNum;

    document.getElementById('sum-el').textContent = `The result is: ${result}`;
    addToMemory(result);
};

function openCalculatorLink() {
    window.location.href = 'calculator.html'; // Update with the correct path to your calculator HTML file
}

const goBack = () => {
    window.history.back();
}

