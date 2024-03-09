const calculatorContainer = document.querySelector('body').querySelector('.calculatorContainer');
const calculatorTextContainer = calculatorContainer.querySelector('.calculatorTextContainer');
const calculatorText = calculatorTextContainer.querySelector('.calculatorText');
const calculatorResult = calculatorTextContainer.querySelector('.calculatorResult');

const decimalLimit = 3;
let number1 = "";
let number2 = "";
let operator = "";
let previousResult = "0";
let decimal = false;
let operated = false;

// ADDING METHODS FOR BUTTON EVENTS

const resetCalculatorVariables = () => {
    number1 = ""; 
    number2 = "";
    operator = "";
}

const updateText = () => {
    calculatorText.textContent = `${number1} ${operator} ${number2}`;
    if (operated) {
        calculatorResult.textContent = "";
    }
}

function giveCurrentNumber() {
    if (operator == "" || operated == true) {
        if (operated == true) {
            resetCalculatorVariables();
        }
        return 1;
    }
    else {
        return 2;
    }
}

const clearEntry = () => {
    if (giveCurrentNumber() == 1) {
        number1 = "";
    }
    else {
        if (number2 != "") {
            number2 = "";
        }
        else {
            operator = "";
        }
    }
}

const backspaceOnce = () => {
    if (giveCurrentNumber() == 1) {
        if (number1 != "") {
            number1 = number1.substring(0, number1.length - 1);
        }
    }
    else {
        if (number2 != "") {
            number2 = number2.substring(0, number2.length - 1);
        }
        else {
            operator = "";
        }
    }
}

function addToNum(nextDigit, number) {
    if (number == 1) {
        number1+= nextDigit;
    }
    else {
        number2+= nextDigit;
    }
}

const changeNumberSign = () => {
    if (giveCurrentNumber() == 1) {
        if (number1 == "") { 
            number1 = "-";
        }
        else if (number1 == "-") {
            number1 = "";
        }
        else {
            number1*= -1; 
        }
    }
    else { 
        if (number2 == "") {
            number2 = "-";
        }
        else if (number2 == "-") {
            number2 = "";
        }
        else {
            number2*= -1; 
        }
    }
}

const addArithmeticOperator = (event) => {
    if (operated) {
        resetCalculatorVariables();
        number1 = previousResult;
    }
    operator = event.currentTarget.textContent 
    updateText();
    operated = false;
}

function add(first, second) {
    return first + second;
}
function subtract(first, second) {
    return first - second;
}
function multiply(first, second) {
    return first * second;
}
function divide(first, second) {
    return first / second;
}

const operate = () => {
    operated = true;
    let realNumber1;
    let realNumber2;
    let result;

    if (number1.includes(".")) {
        realNumber1 = parseFloat(number1);
    }
    else {
        realNumber1 = parseInt(number1);
    }
    if (number2.includes(".")) {
        realNumber2 = parseFloat(number2);
    }
    else {
        realNumber2 = parseInt(number2);
    }

    if (operator == "+") {
        result = add(realNumber1, realNumber2);
    }
    else if (operator == "-") {
        result = subtract(realNumber1, realNumber2);
    }
    else if (operator == "*") {
        result = multiply(realNumber1, realNumber2);
    }
    else if (operator == "/") {
        result = divide(realNumber1, realNumber2);
    }
    else {
        alert("ERROR: evaluation failed!");
        result = NaN;
    }

    if (result % 1 == 0) {
        calculatorResult.textContent = "= " + result; 
    }
    else {
        calculatorResult.textContent = "= " + parseFloat(result.toFixed(decimalLimit)); 
    }

    previousResult = `${result}`;
}

// ADDING BUTTONS TO CALCULATOR CONTAINER

function giveButton() { 
    calculatorContainer.appendChild(document.createElement('button'));
    return calculatorContainer.lastChild;
}

let buttonList = {
    "CE" : giveButton(),  "C" : giveButton(),  "<-" : giveButton(), "/" : giveButton(),
    "7" : giveButton(),   "8" : giveButton(),  "9" : giveButton(),  "*" : giveButton(),
    "4" : giveButton(),   "5" : giveButton(),  "6" : giveButton(),  "-" : giveButton(),
    "1" : giveButton(),   "2" : giveButton(),  "3" : giveButton(),  "+" : giveButton(),
    "+/-" : giveButton(), "0" : giveButton(),  "\." : giveButton(),  "=" : giveButton()
}

// GIVING BUTTONS TEXT AND EVENT LISTENERS

const buttonListMap = new Map(Object.entries(buttonList));

buttonListMap.forEach((element, name) => {
    element.textContent = name; // Objects, like the element node here, are always passed by reference which makes this mutation possible in a forEach method
    switch (name) {
        // Backtracking
        case ("CE"):
            element.addEventListener('click', clearEntry);
            break;
        case ("C"):
            element.addEventListener('click', resetCalculatorVariables);
            break;
        case ("<-"):
            element.addEventListener('click', backspaceOnce);
            break;
        // Number additions
        case ("1"):
        case ("2"):
        case ("3"):
        case ("4"):
        case ("5"):
        case ("6"):
        case ("7"):
        case ("8"):
        case ("9"):
        case ("0"):
            element.addEventListener('click', (event) => { addToNum(event.currentTarget.textContent, giveCurrentNumber()) });
            break;
        // Arithmetic operators
        case ("+"):
        case ("-"):
        case ("*"):
        case ("/"):
            element.addEventListener('click', (event) => { addArithmeticOperator(event) });
            return;
        // Evaluation operation
        case ("="):
            element.addEventListener('click', operate);
            return;
        // Special number mutators
        case ("+/-"): //strings can be operated on as numbers can except for when the + operator is used, so this case works as intended
            element.addEventListener('click', changeNumberSign);
            break;
        case ("."):
            element.addEventListener('click', (event) => { 
                if (!number1.includes(".")) {
                    addToNum(event.currentTarget.textContent, giveCurrentNumber()) 
                }
            });
            break;
    }
    element.addEventListener('click', () => {
        updateText();
        operated = false;
    });
});