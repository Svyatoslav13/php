let historyStr = '' 
  , firstOperand = null
  , lastOperand = 0
  , operation = null
  , result
;

const inputWindow = document.getElementById('inputWindow');
inputWindow.value = '0';

document.getElementById('btn_clr').addEventListener('click', function () {
    lastOperand = 0;
    operation = null;
    inputWindow.value = '0';
})

numberHandler = function () {
    if (inputWindow.value !== '0') { 
        inputWindow.value += this.value;
    } else {
        inputWindow.value = this.value;
    }
}

elementaryOperationsHandler = function () {
    switch (this.value) {
        case '.': 
            if (inputWindow.value !== '0') { 
                inputWindow.value += this.value;
            } else {
                inputWindow.value = '0' + this.value;
            }
            break;
        case '*':
            lastOperand = +inputWindow.value;
            operation = '*';
            inputWindow.value = '0';
            break;
        case '/':
            lastOperand = +inputWindow.value;
            operation = '/';
            inputWindow.value = '0';
            break;
        case '+':
            lastOperand = +inputWindow.value;
            operation = '+';
            inputWindow.value = '0';
            break;
        case '-':
            lastOperand = +inputWindow.value;
            operation = '-';
            inputWindow.value = '0';
            break;
        case '√':
            historyStr += 'sqrt(' + inputWindow.value + ')=' + String(Math.sqrt(inputWindow.value)) + ';';
            inputWindow.value = Math.sqrt(inputWindow.value);
            break;
        case '--':
            historyStr += '--' + inputWindow.value + '=' + String(inputWindow.value - 1) + ';';
            inputWindow.value = --inputWindow.value;
            break;
    }
}

resultHandler = function () {
    switch (operation) {
        case '*':
            result = +inputWindow.value * lastOperand;
            historyStr += String(lastOperand) + operation + inputWindow.value + '=' + result + ';';
            inputWindow.value = result;
            break;
        case '/':
            result = lastOperand / +inputWindow.value;
            historyStr += String(lastOperand) + operation + inputWindow.value + '=' + result + ';';
            inputWindow.value = result;
            break;
        case '+':
            result = +inputWindow.value + lastOperand;
            historyStr += String(lastOperand) + operation + inputWindow.value + '=' + result + ';';
            inputWindow.value = result;
            break;
        case '-':
            result = lastOperand - +inputWindow.value;
            historyStr += String(lastOperand) + operation + inputWindow.value + '=' + result + ';';
            inputWindow.value = result;
            break;
    }
}

historyHandler = function () {
    document.getElementById('history').textContent = historyStr.split(';').join('\n');
}

// вешаем обработчики на цифры
for (let i = 0; i < 10; i++) {
    document.getElementById(`btn_${i}`).addEventListener('click', numberHandler);  
}

document.getElementById(`btn_plus`).addEventListener('click', elementaryOperationsHandler);
document.getElementById(`btn_minus`).addEventListener('click', elementaryOperationsHandler);
document.getElementById(`btn_div`).addEventListener('click', elementaryOperationsHandler);
document.getElementById(`btn_mul`).addEventListener('click', elementaryOperationsHandler);
document.getElementById(`btn_dot`).addEventListener('click', elementaryOperationsHandler);
document.getElementById(`btn_sqrt`).addEventListener('click', elementaryOperationsHandler);
document.getElementById(`btn_dec`).addEventListener('click', elementaryOperationsHandler);
document.getElementById(`btn_eq`).addEventListener('click', resultHandler);
document.getElementById(`btn_history`).addEventListener('click', historyHandler);
    
