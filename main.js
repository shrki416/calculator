import { saveTheme } from "./utils";

const display = document.querySelector(".display");

let num1 = "";
let num2 = "";
let operator = "";

const resetBtn = document.querySelector("[data-reset]");
resetBtn.addEventListener("click", reset);

const deleteBtn = document.querySelector("[data-delete]");
deleteBtn.addEventListener("click", handleDelete);

const equalBtn = document.querySelector("[data-equal]");
equalBtn.addEventListener("click", calculate);

const numberBtns = document.querySelectorAll("[data-number]");
numberBtns.forEach((button) => {
  button.addEventListener("click", (e) => handleNumberBtns(e));
});

const operatorBtns = document.querySelectorAll("[data-operator]");
operatorBtns.forEach((button) => {
  button.addEventListener("click", (e) => handleOperatorBtns(e));
});

function handleNumberBtns(e) {
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
}

function handleOperatorBtns(e) {
  if (display.textContent === "") return;

  if (num1 && num2) calculate();

  operator = e.target.textContent;
  display.textContent = num1;
  num2 = "";
}

function reset() {
  num1 = "";
  num2 = "";
  operator = "";
  display.textContent = "0";
  console.log({ num1, num2, operator });
}

function handleDelete() {
  if (display.textContent === "0") return;

  display.textContent = display.textContent.slice(0, -1);

  operator ? (num2 = num2.slice(0, -1)) : (num1 = num1.slice(0, -1));

  if (display.textContent.length === 0) {
    display.textContent = "0";
    if (!num1) num1 = "0";
  }
}

function calculate() {
  if (!num1 || !num2 || !operator) return;

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
  num1 = result.toString();
  num2 = "";
  operator = "";
  display.textContent = result;
  console.log({ num1, num2, operator });
}

const themeInputs = document.querySelectorAll("input[name='theme']");

function setTheme() {
  const currentTheme = localStorage.getItem("theme");
  for (const theme of themeInputs) {
    if (theme.id === currentTheme) {
      theme.checked = true;
    }
  }
}

for (const theme of themeInputs) {
  theme.addEventListener("click", (e) => {
    saveTheme(theme.id);
  });
}

setTheme();
