// Elements
const buttons = document.querySelectorAll('.calculator__input__tip__select__item');

// Variables
let chosenTip = undefined;

function main() {
    // Click on button functionality
    configureTipButtons();
    // Main calculation functionality

    // Reset functionality
}

function configureTipButtons() {
    buttons.forEach(
        (button) => button.addEventListener(
            'click', 
            (event) => handleSelectTipButton(event.target)
        )
    );
}

const handleSelectTipButton = (button) => {
    chosenTip = button.dataset.tip
    buttons.forEach((button) => {
        button.classList.remove('item--active');
    })
    button.classList.add('item--active');
    console.log('You chose this tip: ' + chosenTip + '%');
}

main();