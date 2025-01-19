const display = document.querySelector('.calculator-screen');
const buttons = document.querySelector('.calculator-keys');

let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

buttons.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.matches('button')) return;

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});

function handleOperator(nextOperator) {
    const inputValue = parseFloat(display.value);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand == null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
        display.value = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

const performCalculation = {
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
};

function inputDigit(digit) {
    if (waitingForSecondOperand) {
        display.value = digit;
        waitingForSecondOperand = false;
    } else {
        display.value = display.value === '0' ? digit : display.value + digit;
    }
}

function inputDecimal(dot) {
    if (!display.value.includes(dot)) {
        display.value += dot;
    }
}

function resetCalculator() {
    display.value = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

function updateDisplay() {
    display.value = display.value;
}

updateDisplay();
