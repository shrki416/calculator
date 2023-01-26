const display = document.querySelector(".display");
const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const resetBtn = document.querySelector("[data-reset]");
const deleteBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector("[data-equal]");

let num1 = "";
let num2 = "";
let operator = "";

numberBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    const number = e.target.textContent;

    if (display.textContent.includes(".") && number === ".") {
      return;
    }

    if (display.textContent === "0") {
      display.textContent = number;
    }

    if (operator) {
      num2 += number;
      display.textContent = num2;
    } else {
      num1 += number;
      display.textContent = num1;
    }

    console.log({ num1, num2, operator });
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (display.textContent === "") return;

    if (num1 && num2) calculate();

    operator = e.target.textContent;
    display.textContent = num1;
    num2 = "";
  });
});

resetBtn.addEventListener("click", reset);
function reset() {
  num1 = "";
  num2 = "";
  operator = "";
  display.textContent = "0";
  console.log({ num1, num2, operator });
}

deleteBtn.addEventListener("click", HandleDelete);
function HandleDelete() {
  if (display.textContent === "0") return;

  display.textContent = display.textContent.slice(0, -1);

  operator
    ? (num2 = num2.length === 1 ? (num2 = 0) : (num2 = num2.slice(0, -1)))
    : (num1 = num1.length === 1 ? (num1 = 0) : (num1 = num1.slice(0, -1)));

  if (display.textContent.length === 1) {
    display.textContent = "0";
  }
}

equalBtn.addEventListener("click", calculate);
function calculate() {
  num1 = Number(num1);
  num2 = Number(num2);

  let result;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "x":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
  }
  display.textContent = result;
  num1 = result;
  num2 = "";
}
