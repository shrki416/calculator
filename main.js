const display = document.querySelector(".display");
const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");

let num1 = "";
let num2 = "";
let operator = "";

const resetBtn = document.querySelector("[data-reset]");
resetBtn.addEventListener("click", reset);

const deleteBtn = document.querySelector("[data-delete]");
deleteBtn.addEventListener("click", handleDelete);

const equalBtn = document.querySelector("[data-equal]");
equalBtn.addEventListener("click", calculate);

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
