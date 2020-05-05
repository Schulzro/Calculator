const calculator = {
    result: 0,
    firstOperand: "",
    secondOperand: "",
    computationDisplay: "", 
    operators: ['+', '-', '/', 'x'], 
    currentOperator: ""
};

function compute() {
  if(!calculator.currentOperator) return;
  let first = parseFloat(calculator.firstOperand);
  let second = parseFloat(calculator.secondOperand);
  switch (calculator.currentOperator) {
        case '+':
          calculator.result = first + second;
          break;
        case '-':
            calculator.result = first - second;
        break;
        case 'x':
            calculator.result = first * second;
            break;
        case '/':
            calculator.result = first / second;
            break;
  }
}

function clearDisplay() {
    calculator.computationDisplay = "";
    calculator.result = 0;
    calculator.firstOperand = "";
    calculator.secondOperand = "";
    calculator.currentOperator = "";
    const calculationDisplay = document.querySelector('.calculation');
    if(calculationDisplay) {
        document.querySelector('.calculator').removeChild(calculationDisplay);
        updateCancelButton();
        displayResult();
    }
}

function appendNumber(newNumber) {
    if(!calculator.currentOperator) calculator.firstOperand += newNumber;
    else calculator.secondOperand += newNumber;
    calculator.computationDisplay += newNumber;
    displayComputation();
    compute();
}

function appendOperation(newOperation) {
    if(calculator.currentOperator) {
        calculator.firstOperand = calculator.result; 
        calculator.secondOperand = "";
    }
    if (calculator.operators.includes(
        calculator.computationDisplay[calculator.computationDisplay.length - 1]
        )) calculator.computationDisplay = calculator.computationDisplay.slice(0, calculator.computationDisplay.length - 1) + newOperation;
    else calculator.computationDisplay += newOperation;
    calculator.currentOperator = newOperation;
    displayComputation();
}


function displayComputation() {
    if(!document.querySelector('.calculation')) {
        let newComputationEle = document.createElement('div');
        newComputationEle.classList.add('calculation');
        let resultEle = document.querySelector('.result');
        document.querySelector('.calculator').insertBefore(newComputationEle, resultEle);
    }
    updateDisplay();
}

function updateDisplay() {
    const compuationEle = document.querySelector('.calculation');
    if (calculator.computationDisplay.length) {
        compuationEle.textContent = calculator.computationDisplay;
        updateCancelButton();
    } 
}

function displayResult() {
    resultDisplay.textContent = calculator.result;
}

function updateCancelButton() {
    document.querySelector('.ac-button').textContent = 
    calculator.computationDisplay.length ? "C" : "AC";
}

const numbersButtons = document.querySelectorAll('[data-number]');
const operatorsButtons = document.querySelectorAll('[data-operator]');
const cancelButton = document.querySelector('.ac-button');
const equalsButton = document.querySelector('.equals');
const resultDisplay = document.querySelector('.result');

numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.dataset.number);
    });
});

operatorsButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendOperation(button.dataset.operator);
    });
})

cancelButton.addEventListener('click', () => {
    clearDisplay();
});

equalsButton.addEventListener('click', () => {
    displayResult();
});

