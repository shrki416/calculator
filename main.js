const display = document.querySelector(".display");
const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const resetBtn = document.querySelector("[data-reset]");
const deleteBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector("[data-equal]");

let num1, num2, operator;

numberBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    const number = e.target.textContent;

    if (display.textContent.includes(".") && number === ".") {
      return;
    }

    if (display.textContent === "0") {
      display.textContent = number;
      return;
    }
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log({ operator });
  });
});

resetBtn.addEventListener("click", () => {
  num1 = "";
  num2 = "";
  operator = "";
  display.textContent = 0;
});

deleteBtn.addEventListener("click", (e) => {
  display.textContent.length === 1
    ? (display.textContent = 0)
    : (display.textContent = display.textContent.slice(0, -1));

  console.log("delete");
});

equalBtn.addEventListener("click", calculate);
function calculate() {
  console.log(num1, num2, operator);
  if (!num1 && !num2 && !operator) return;

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
      if (num2 === 0) {
        display.textContent = "Can't divide by 0";
        return;
      }
      result = num1 / num2;
      break;
  }
  num1 = result;
}
