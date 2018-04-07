const numbers = document.getElementsByClassName('num-btn');     // array of all number buttons
const operators = document.getElementsByClassName('operation-btn');   // array of all operators
const userInput = document.getElementsByClassName('user-numbers')[0];   // user input - upper
const calculationInput = document.getElementsByClassName('calculation-result')[0];  // final result input
const equalBtn = document.getElementById('equal');   // equal operator button
const clearBtn = document.getElementById('clear-input');   // clear input button
const switchMinusBtn = document.getElementById('switch-minus-btn');   // switching between minus button
let switchMinus = true; //  variable - adding minus
let inputs = [];  // array of all inputs
const operatorsArr = ["+", "-", "*", "/", ".", "%"];   // array of all operators
const numbersArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];   // array of all numbers
let lastNumber = ""; // temprary veriable with last number

// Main function - adding numbers and operators
let addNumbers = (number) => {

    return function () {
        if (numbersArr.includes(Number(number))) {  //Number
            lastNumber += number;
            inputs.push(number);
        }
        else if (operatorsArr.includes(number) && inputs.length !== 0 && !operatorsArr.includes(inputs[inputs.length - 1])) { //Operator (no first position, no double operator)
            if (number === "%") {
                inputs.splice(inputs.length - lastNumber.length, lastNumber.length, lastNumber / 100);
            }
            else {
                inputs.push(number);
            }
            lastNumber = "";
        }
        else {  // other situation -> end function
            return;
        }
        userInput.value = inputs.join("");   // updating user input value
    }
};

// clear user input
let clearNumbers = () => {
    inputs.splice(0,inputs.length);
    userInput.value = "";
    calculationInput.value = 0;
};

// calculating final result
let finalResult = () => {
    let result = eval(userInput.value).toFixed(2); // CALCULATIMNG FINAL RESULT WITH TO FIXED(PREVENT UNNECESSARY NUMBERS OPERATION)
    inputs.push("=");
    userInput.value = inputs.join("");
    calculationInput.value = result;
};

//  switch minus operator
let switching = () => {
    if (switchMinus) {
        inputs.unshift("-");
        userInput.value = inputs.join("");
        switchMinus = false;
    } else {
        inputs.splice(0, 1);
        userInput.value = inputs.join("");
        switchMinus = true;
    }
};

// iife that add click event to numbers and operators
(() => {
    //  numbers loop

    for (let i = 0; i < numbers.length; i++) {    // looping through all numbers
        let numberValue = numbers[i].innerHTML;
        if (numberValue === ",") {                  // changing dot operator
            numberValue = "."
        }
        numbers[i].addEventListener("click", addNumbers(numberValue))  // adding click listener
    }

    // operators loop

    for (let i = 0; i < operators.length; i++) {  // looping through all operators
        let operatorValue = operators[i].innerHTML;
        if (operatorValue === "X") {              // changing multiply operator
            operatorValue = "*"
        }
        operators[i].addEventListener("click", addNumbers(operatorValue)) // adding click listener
    }
})();


// add click listeners
clearBtn.addEventListener("click", clearNumbers);  // clear input listener
equalBtn.addEventListener("click", finalResult);   // equal listener
switchMinusBtn.addEventListener("click", switching);  // changing minus listener
