document.getElementById("All-clear").addEventListener("click", clearDisplay);
document.getElementById("divide").onclick = function () {
  appendToDisplay("/");
};
document.getElementById("multiple").addEventListener("click", function () {
  appendToDisplay("*");
});
document.getElementById("sub").addEventListener("click", function () {
  appendToDisplay("-");
});
document.getElementById("add").addEventListener("click", function () {
  appendToDisplay("+");
});
document
  .getElementById("equal")
  .addEventListener("click", calculate, onclickEqual);
document.getElementById("percent").addEventListener("click", function () {
  appendToDisplay("%");
});
document.getElementById("zero").addEventListener("click", function () {
  appendToDisplay("0");
});
document.getElementById("one").addEventListener("click", function () {
  appendToDisplay("1");
});
document.getElementById("two").addEventListener("click", function () {
  appendToDisplay("2");
});
document.getElementById("three").addEventListener("click", function () {
  appendToDisplay("3");
});
document.getElementById("four").addEventListener("click", function () {
  appendToDisplay("4");
});
document.getElementById("five").addEventListener("click", function () {
  appendToDisplay("5");
});
document.getElementById("six").addEventListener("click", function () {
  appendToDisplay("6");
});
document.getElementById("seven").addEventListener("click", function () {
  appendToDisplay("7");
});
document.getElementById("eight").addEventListener("click", function () {
  appendToDisplay("8");
});
document.getElementById("nine").addEventListener("click", function () {
  appendToDisplay("9");
});
document.getElementById("dot").addEventListener("click", function () {
  appendToDisplay(".");
});

// var arr1 = [];
// var arr2 =[];
function onclickEqual() {
  inputArray = [document.getElementById("display").value];
  console.log(inputArray);
}

function appendToDisplay(value) {
  let num = document.getElementById("display").value;
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculate() {
  var displayValue = document.getElementById("display").value;

  // Validate input using a regular expression
  var regex = /^[-+*/.\d\s]+$/;
  if (!regex.test(displayValue)) {
    document.getElementById("display").value = "Error";
    return;
  }

  try {
    var result = evaluateExpression(displayValue);
    document.getElementById("display").value = result;
  } catch (error) {
    document.getElementById("display").value = "Error";
  }
}

function evaluateExpression(expression) {
  var tokens = expression.match(/[-+*/()]|\d+(\.\d+)?/g);

  if (!tokens) {
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

    tokens.forEach(function(token) {
      if (token.match(/\d+(\.\d+)?/)) {
        output.push(parseFloat(token));
      } else if (token in precedence) {
        while (
          operators.length > 0 &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          output.push(operators.pop());
        }
        operators.push(token);
      } else if (token === '(') {
        operators.push(token);
      } else if (token === ')') {
        while (operators.length > 0 && operators[operators.length - 1] !== '(') {
          output.push(operators.pop());
        }
        operators.pop(); // Discard the '('
      }
    });

    while (operators.length > 0) {
      output.push(operators.pop());
    }

    var resultStack = [];
    output.forEach(function(token) {
      if (typeof token === 'number') {
        resultStack.push(token);
      } else {
        var operand2 = resultStack.pop();
        var operand1 = resultStack.pop();

        switch (token) {
          case '+':
            resultStack.push(operand1 + operand2);
            break;
          case '-':
            resultStack.push(operand1 - operand2);
            break;
          case '*':
            resultStack.push(operand1 * operand2);
            break;
          case '/':
            if (operand2 === 0) {
              throw new Error('Division by zero');
            }
            resultStack.push(operand1 / operand2);
            break;
        }
      }
    });

    if (resultStack.length !== 1) {
      throw new Error('Invalid expression');
    }

    return resultStack[0];
  }




// function calculate() {
//   var expression = document.getElementById("display").value;
//     try {
//       var result = eval(expression);
//       document.getElementById("display").value = result;
//     } catch (error) {
//       document.getElementById("display").value = "Error";
//     }
// }
