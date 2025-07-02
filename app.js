const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const screen = calculator.querySelector('.calculator-screen');

let firstValue = '';
let operator = '';
let isWaitingForSecondValue = false;

function calculate(n1, op, n2) {
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);
    if (op === 'add') return num1 + num2;
    if (op === 'subtract') return num1 - num2;
    if (op === 'multiply') return num1 * num2;
    if (op === 'divide') return num1 / num2;
}

keys.addEventListener('click', e => {
    if (!e.target.matches('button')) return;

    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = screen.textContent;

    // 数字キーが押された場合
    if (!action) {
        if (displayedNum === '0' || isWaitingForSecondValue) {
            screen.textContent = keyContent;
            isWaitingForSecondValue = false;
        } else {
            screen.textContent = displayedNum + keyContent;
        }
    }

    // 小数点キーが押された場合
    if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
            screen.textContent = displayedNum + '.';
        }
    }

    // 演算子キーが押された場合
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) {
        // 連続して演算子が押された場合、最後のものを優先する
        if (operator && isWaitingForSecondValue) {
            operator = action;
            return;
        }
        
        // 最初の計算の場合
        if (firstValue === '') {
            firstValue = displayedNum;
        } else {
            const result = calculate(firstValue, operator, displayedNum);
            screen.textContent = parseFloat(result.toFixed(7)); // 小数点以下の桁数を制限
            firstValue = result;
        }

        operator = action;
        isWaitingForSecondValue = true;
    }

    // クリアキーが押された場合
    if (action === 'clear') {
        screen.textContent = '0';
        firstValue = '';
        operator = '';
        isWaitingForSecondValue = false;
    }

    // イコールキーが押された場合
    if (action === 'calculate') {
        if (firstValue && operator) {
            const result = calculate(firstValue, operator, displayedNum);
            screen.textContent = parseFloat(result.toFixed(7));
            firstValue = '';
            operator = '';
            isWaitingForSecondValue = false;
        }
    }
});
