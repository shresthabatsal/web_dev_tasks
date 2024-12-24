let currentInput = ""; // Stores the current input
let resultDisplayed = false; // Tracks if the result is displayed

function appendValue(value) {
  const display = document.getElementById("display");
  if (resultDisplayed) {
    // If result was displayed, reset input
    currentInput = value;
    resultDisplayed = false;
  } else {
    currentInput += value;
  }
  display.value = currentInput;
}

function clearDisplay() {
  currentInput = "";
  document.getElementById("display").value = "0";
}

function calculateResult() {
  const display = document.getElementById("display");
  try {
    if (currentInput.includes("^")) {
      // Handle exponentiation
      const [base, exponent] = currentInput.split("^").map(Number);
      currentInput = Math.pow(base, exponent).toString();
    } else if (currentInput.includes("%")) {
      // Handle percentage
      currentInput = (eval(currentInput.replace("%", "/100"))).toString();
    } else {
      currentInput = eval(currentInput).toString();
    }

    // Handle division by zero
    if (currentInput === "Infinity") {
      currentInput = "Error (Div by 0)";
    }

    display.value = currentInput;
    resultDisplayed = true;
  } catch (error) {
    display.value = "Invalid Input";
    currentInput = "";
  }
}

// Function to handle square root and exponentiation
function performOperation(operation) {
  const display = document.getElementById("display");

  if (operation === "sqrt") {
    const number = parseFloat(currentInput);
    if (number >= 0) {
      currentInput = Math.sqrt(number).toString();
    } else {
      currentInput = "Error (Invalid √)";
    }
  } else if (operation === "^") {
    currentInput += "^";
  }

  display.value = currentInput;
}

// Event listener for keyboard input
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || ["+", "-", "*", "/", ".", "^", "%"].includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    document.getElementById("display").value = currentInput || "0";
  } else if (key === "Escape") {
    clearDisplay();
  }
});