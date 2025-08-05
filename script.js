const numButtons = document.querySelectorAll('.numButtons');
const operatorButtons = document.querySelectorAll('.operatorButtons');
const equalButton = document.querySelector('.equals');
const decimalButton = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
const backspaceButton = document.querySelector('.backspace');
let display = document.getElementById('display');

display.value = '0';
let operand1 = '';
let operator = '';
let operand2 = '';
let displayValue = '';
let resultFlag = false;


let add = (a,b)=> a + b;
let subtract = (a,b)=> a - b;
let multiply = (a,b)=> a * b;
let divide = (a,b)=>{return a / b;
}  


function updateDisplay(value) {
  display.value = value;
}

function clearAll() {
  operand1 = '';
  operator = '';
  operand2 = '';
  displayValue = '';
  resultFlag = false;
  updateDisplay('0');
}

clearButton.addEventListener('click', clearAll);

numButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
   
    let num = e.currentTarget.dataset.value;

    
     if (resultFlag) {
      clearAll();
    }

    if (operator === '') {
      operand1 += num;
      displayValue = operand1;
    } else {
      operand2 += num;
      displayValue = operand2;
    }
    updateDisplay(displayValue);
  });
});

decimalButton.addEventListener('click', () => {
  if (resultFlag) clearAll();

  if (operator === '') {
    if (!operand1.includes('.')) {
      operand1 += operand1 === '' ? '0.' : '.';
      displayValue = operand1;
    }
  } else {
    if (!operand2.includes('.')) {
      operand2 += operand2 === '' ? '0.' : '.';
      displayValue = operand2;
    }
  }

  updateDisplay(displayValue);
});

operatorButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
   
    if (operand1 === '') return updateDisplay('Enter a number');
    if (operator !== '' && operand2 !== '') {
      operate();
    }

    const op = e.currentTarget.dataset.value;
    operator = op;
    resultFlag = false;
  });
});

equalButton.addEventListener('click', () => {
  if (operand1 !== '' && operator !== '' && operand2 !== '') {
    operate();
  } 
});

backspaceButton.addEventListener('click', () => {
  if (resultFlag) return;

  if (operator === '') {
    operand1 = operand1.slice(0,-1);
    displayValue = operand1;
  } else {
    operand2 = operand2.slice(0, -1);
    displayValue = operand2;
  }

  updateDisplay(displayValue || '0');
});

function operate() {
  if (operand1 === '' || operator === '' || operand2 === '') return updateDisplay('Number or Operator is missing');

  const num1 = parseFloat(operand1);
  const num2 = parseFloat(operand2);
  let result;

  switch (operator) {
    case '+':
      result = add(num1,num2);
      break;
    case '-':
      result = subtract(num1,num2);
      break;
    case '*':
      result = multiply(num1,num2);
      break;
    case '/':
      result = divide(num1,num2);
       if (num2 === 0) return updateDisplay("E");     
  }

  result = Math.round(result * 1000000) / 1000000;
  updateDisplay(result);
  operand1 = result.toString();
  operand2 = '';
  operator = '';
  resultFlag = true;
}
