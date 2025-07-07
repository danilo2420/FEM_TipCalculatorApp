// Elements
// # Inputs
const inputBill = document.querySelector('.calculator__input__bill__label__input');
const buttons = document.querySelectorAll('.calculator__input__tip__select__item');
const inputPeople = document.querySelector('.calculator__input__people__input');
// # Outputs
const outputTip = document.querySelector('.outputTip');
const outputTotal = document.querySelector('.outputTotal');

// Variables
let chosenTip = 15;

function main() {
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
    console.log('Calculating tip...');
    // Get values
    const bill = inputBill.value;
    const people = inputPeople.value;

    // Validation
    if (!validateInput(bill, people)) {
        console.log('Input did not pass validation');
        outputTotal.innerHTML = formatCurrency(0);
        outputTip.innerHTML = formatCurrency(0);
        return;
    }

    // Set result
    let totalPerPerson = (bill * (1 + (chosenTip/100))) / people;
    let tipPerPerson = (bill * (chosenTip/100)) / people;

    outputTotal.innerHTML = formatCurrency(totalPerPerson);
    outputTip.innerHTML = formatCurrency(tipPerPerson);
}

function validateInput(bill, people) {
    if (isNaN(bill) || bill.length == 0) {
        console.log('returning');
        return false;
    }

    if (chosenTip == undefined) {
        return false;
    }

    if (isNaN(people) || people.length == 0) {
        console.log('returning');
        return false;
    }

    return true;
}

function formatCurrency(value) {
    if (isNaN(value)) return;

    value *= 100;
    value = Math.floor(value);

    return '$' + (value/100);
}


main();