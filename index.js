

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
document.getElementById("clear").onclick = function(){ clearElement() };
document.getElementById("equal").onclick = calculate;

// function defined to append the value to dsplay(id)
function appendToDisplay(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";  // function to clear the string which is input(display)
}

function clearElement(){
  let value = document.getElementById("display").value;
  document.getElementById("display").value = value.substr(0, value.length-1);  // to remove last entered string 
  
}


function calculate() {
  var displayValue = document.getElementById("display").value;

  var regex = /^[-+*/.\d\s]+$/;
  if (!regex.test(displayValue)) {
    document.getElementById("display").value = "Invalid";  // checking if the values entered in display valid values
    window.alert("Invalid Operation");  
    
    return;
  }

  try {
    var result = evaluateExpression(displayValue);
    sessionStorage.setItem(document.getElementById("display").value, result);  // session storage
    localStorage.setItem(document.getElementById("display").value, result);  //local Storage
    document.getElementById("display").value = result;
    
  } catch (error) {
    document.getElementById("display").value = "Error";
  }
  
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


