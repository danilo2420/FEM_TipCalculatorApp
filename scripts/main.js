// Elements
// # Inputs
const inputBill = document.querySelector('.calculator__input__bill__label__input');
const buttons = document.querySelectorAll('.calculator__input__tip__select__item');
const inputPeople = document.querySelector('.calculator__input__people__input');
// # Outputs
const outputTip = document.querySelector('.outputTip');
const outputTotal = document.querySelector('.outputTotal');

const btnReset = document.querySelector('.calculator__output__button');

// # Error messages
const errBill = document.querySelector('.errBill');
const errPeople = document.querySelector('.errPeople');

// Variables
const maxValue = 99999999;
let chosenTip = 15;

function main() {
    deactivateOutput();
    setEventListeners();
}

function setEventListeners() {
    inputBill.addEventListener('input', () => {
        calculateTip();
        clearErrorMessage(inputBill, errBill);
        const value = inputBill.value;
        if (value > maxValue) {
            errBill.textContent = "Value is too high";
            errBill.style.visibility = 'visible';
            inputBill.classList.add('input--error');
        }
    });
    buttons.forEach(
        (button) => button.addEventListener(
            'click', 
            (event) => handleSelectTipButton(event.target)
        )
    );
    inputPeople.addEventListener('input', () => {
        calculateTip();
        clearErrorMessage(inputPeople, errPeople);
        const value = inputPeople.value;
        if (value > maxValue) {
            errPeople.textContent = "Value is too high";
            errPeople.style.visibility = 'visible';
            inputPeople.classList.add('input--error');
        }
    })
    btnReset.addEventListener('click', () => {
        resetInput();
    });
    setValidationEventListeners();
}

const handleSelectTipButton = (button) => {
    if (button.classList.contains('item--custom')) return;

    chosenTip = button.dataset.tip
    buttons.forEach((button) => {
        button.classList.remove('item--active');
    })
    button.classList.add('item--active');
    calculateTip();
}

function calculateTip() {
    // Get values
    const bill = inputBill.value;
    const people = inputPeople.value;

    // Validation
    if (!validateInput(bill, people)) {
        deactivateOutput();
        return;
    }

    // Set result
    let totalPerPerson = (bill * (1 + (chosenTip/100))) / people;
    let tipPerPerson = (bill * (chosenTip/100)) / people;

    outputTotal.innerHTML = formatCurrency(totalPerPerson);
    outputTip.innerHTML = formatCurrency(tipPerPerson);
    btnReset.classList.remove('reset--disabled');
}

function validateInput(bill, people) {
    if (isNaN(bill) || bill.length == 0) {
        return false;
    }
    if (bill > maxValue) return false;

    if (chosenTip == undefined) {
        return false;
    }

    if (isNaN(people) || people.length == 0) {
        return false;
    }

    if (people > maxValue) return;

    return true;
}

function deactivateOutput() {
    outputTotal.innerHTML = formatCurrency(0);
    outputTip.innerHTML = formatCurrency(0);

    btnReset.classList.add('reset--disabled');
}

function formatCurrency(value) {
    if (isNaN(value)) return;

    value *= 100;
    value = Math.floor(value);

    return '$' + (value/100);
}

function resetInput() {
    if (btnReset.classList.contains('reset--disabled')) return;

    setInitialInput();
    deactivateOutput();
    clearErrorMessage(inputBill, errBill);
    clearErrorMessage(inputPeople, errPeople);
}

function setInitialInput() {
    inputBill.value = '';
    inputPeople.value = '';

    const btnTip15 = document.getElementById('tip15');
    handleSelectTipButton(btnTip15);
}

function setValidationEventListeners() {
    inputBill.addEventListener('focusout', () => {
        value = inputBill.value;
        if (value == 0 || value.length == 0) {
            errBill.textContent = "Can't be zero";
            errBill.style.visibility = 'visible';
            inputBill.classList.add('input--error');
        } 
    });
    inputPeople.addEventListener('focusout', () => {
        value = inputPeople.value;
        if (value == 0 || value.length == 0) {
            errPeople.textContent = "Can't be zero";
            errPeople.style.visibility = 'visible';
            inputPeople.classList.add('input--error');
        } 
    });
}

function clearErrorMessage(elmnt, err) {
    elmnt.classList.remove('input--error');
    err.style.visibility = 'hidden';
}

main();