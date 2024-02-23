document.addEventListener("DOMContentLoaded", function() {
  const inputDisplay = document.getElementById("input-display");
  const resultDisplay = document.getElementById("result-display");
  inputDisplay.value = "";
  resultDisplay.value = "";
});

document.querySelectorAll(".digits").forEach(button => {
  button.addEventListener("click", () => {
    appendToDisplay(button.innerHTML); 
  });
});

document.querySelectorAll(".operation").forEach(button => {
  button.addEventListener("click", () => {
    appendToDisplay(button.innerHTML); 
  });
});

document.getElementById("All-clear").addEventListener("click", clearDisplay);
document.getElementById("clear").onclick = function(){ reupdateDisplayColors() ,clearElement(); };
document.getElementById("equal").onclick = calculate;

// Add keyboard event listeners
document.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(event) {
  const key = event.key;

  // Handle numeric and operation keys
  if (/[0-9+\-*/.=]/.test(key)) {
    appendToDisplay(key);
    reupdateDisplayColors();
  }

  // Handle "Enter" key
  if (key === "Enter") {
    calculate();
  }

  // Handle "Backspace" key
  if (key === "Backspace") {
    reupdateDisplayColors();
    clearElement();
    

  }
}


// function defined to append the value to dsplay(id)
function appendToDisplay(value) {
  const inputDisplay = document.getElementById("input-display");
  const resultDisplay = document.getElementById("result-display");
  inputDisplay.value += value;
  // document.getElementById("display").value += value;
  resultDisplay.value = ""; // Clear result display when a new input is added

}

function clearDisplay() {
  const inputDisplay = document.getElementById("input-display");
  const resultDisplay = document.getElementById("result-display");
  inputDisplay.value = "";
  resultDisplay.value = "";
  // document.getElementById("display").value = "";  // function to clear the string which is input(display)
}

function clearElement(){
  let value = document.getElementById("input-display").value;
  document.getElementById("input-display").value = value.substr(0, value.length-1);  // to remove last entered string 
  
}


function calculate() {

  const inputDisplay = document.getElementById("input-display");
  const resultDisplay = document.getElementById("result-display");

  var displayValue = inputDisplay.value;
  // var displayValue = document.getElementById("display").value;

  var regex = /^[-+*/.\d\s]+$/;
  if (!regex.test(displayValue)) {
    // inputDisplay.value = "Invalid";
    resultDisplay.value = "Invalid";
    // document.getElementById("display").value = "Invalid";  // checking if the values entered in display valid values
    window.alert("Invalid Operation");  
    
    return;
  }

  try {
    var result = evaluateExpression(displayValue);
    // sessionStorage.setItem(inputDisplay.value, result);
    // localStorage.setItem(inputDisplay.value, result);
    // sessionStorage.setItem(document.getElementById("display").value, result);  // session storage
    // localStorage.setItem(document.getElementById("display").value, result);  //local Storage
    // inputDisplay.value = result;
    resultDisplay.value = result;

    // document.getElementById("display").value = result;
    // Send data to the server
    fetch('/saveCalculation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ expression: displayValue, result })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    
  } catch (error) {
    // inputDisplay.value = "Error";
    resultDisplay.value = "Error";
    // document.getElementById("display").value = "Error";
  }

  updateDisplayColors();
  
}

function evaluateExpression(expression) {
  // console.log(expression)
  var values = expression.match(/[-+*/]|\d+(\.\d+)?/g);
  // console.log(values);
  

  if (!values) {
    throw new Error("Invalid expression");
  
  }

  var output = [];
    var operators = [];

    var precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    };

    values.forEach(function(element) {
      if (element.match(/\d+(\.\d+)?/)) {
        output.push(parseFloat(element));
      } else if (element in precedence) { 
        while (
          operators.length > 0 &&
          precedence[operators[operators.length - 1]] >= precedence[element] 
        ) {
          
          output.push(operators.pop()); 

        }
        operators.push(element);
      }
    });
// 3+5-8*4/6
// 3 5 +
    console.log(output);

    while (operators.length > 0) {
      output.push(operators.pop());
      console.log(output);

    }

    

    var resultArray = [];
    output.forEach(function(element) {
      
      if (typeof element === 'number') {
        resultArray.push(element);
        // console.log(resultArray);
        
        
      } else {
        var operand2 = resultArray.pop();
        var operand1 = resultArray.pop();

        switch (element) {
          case '+':
            resultArray.push(operand1 + operand2);
            
            break;
          case '-':
            resultArray.push(operand1 - operand2);
            break;
          case '*':
            resultArray.push(operand1 * operand2);
            break;
          case '/':
            if (operand2 === 0) {
              throw new Error('Division by zero');
            }
            resultArray.push(operand1 / operand2);
            break;
        }
      }
    });



    if (resultArray.length !== 1) {
      throw new Error('Invalid expression');
    }

    // console.log(resultArray);

    

    return resultArray[0];
  }

  function updateDisplayColors() {
    const inputDisplay = document.getElementById("input-display");
    const resultDisplay = document.getElementById("result-display");
  
    // Change the color of the displays when "=" button is clicked
    inputDisplay.style.color = "grey";
    resultDisplay.style.color = "black";
  }
 function reupdateDisplayColors() {
    const inputDisplay = document.getElementById("input-display");
    const resultDisplay = document.getElementById("result-display");
  
    inputDisplay.style.color = "black";
    resultDisplay.style.color = "grey";
  }

