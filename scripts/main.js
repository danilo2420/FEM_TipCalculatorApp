// Elements
// # Inputs
const inputBill = document.querySelector('.calculator__input__bill__label__input');
const buttons = document.querySelectorAll('.calculator__input__tip__select__item');
const inputPeople = document.querySelector('.calculator__input__people__input');
// # Outputs
const outputTip = document.querySelector('.outputTip');
const outputTotal = document.querySelector('.outputTotal');

const btnReset = document.querySelector('.calculator__output__button');

// Variables
let chosenTip = 15;

function main() {
    deactivateOutput();
    // Main calculation functionality
    setEventListeners();

    // Reset functionality

}

function setEventListeners() {
    inputBill.addEventListener('input', () => {
        calculateTip();
    });
    buttons.forEach(
        (button) => button.addEventListener(
            'click', 
            (event) => handleSelectTipButton(event.target)
        )
    );
    inputPeople.addEventListener('input', () => {
        calculateTip();
    })
    btnReset.addEventListener('click', () => {
        resetInput();
    });
}

const handleSelectTipButton = (button) => {
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

    if (chosenTip == undefined) {
        return false;
    }

    if (isNaN(people) || people.length == 0) {
        return false;
    }

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
}

function setInitialInput() {
    inputBill.value = '';
    inputPeople.value = '';

    const btnTip15 = document.getElementById('tip15');
    handleSelectTipButton(btnTip15);
}


main();