/**
 * Validator Controller
 * paired with partials/validator.html
 */

AppControllers.controller("ValidatorController", function ($scope, $http) {
  $scope.valid = "Input number to validate";
  $scope.inputValue = "";
  $scope.inputArray = new Array(9).fill(null);

  $scope.resultStyle = {
    border: "1px solid #7f9db9",
    padding: "0.5rem",
    margin: "1rem 0px 0px 0px",
    "background-color": "transparent",
    "text-align": "center",
    color: "inherit",
    "font-weight": "normal",
  };

  /** @type {(value: true|false|null) => void} */
  function toggleResult(valid) {
    if (typeof valid === "boolean") {
      $scope.resultStyle["color"] = "whitesmoke";
      $scope.resultStyle["font-weight"] = "bold";

      if (valid) {
        $scope.valid = "Valid ACN!";
        $scope.resultStyle["background-color"] = "green";
      } else {
        $scope.valid = "Invalid ACN!";
        $scope.resultStyle["background-color"] = "red";
      }

      return;
    }

    // default style with no state (true or false)
    $scope.resultStyle["background-color"] = "ghostwhite";
    $scope.resultStyle["color"] = "darkslategrey";
    $scope.resultStyle["font-weight"] = "normal";

    // on valid is string, it must be an error.
    // show errot text
    if (typeof valid === "string") {
      $scope.valid = valid;
    } else {
      $scope.valid = "Input number to validate";
    }
  }

  /** @type {(numbers: number[]) => void} */
  function validateNumber(numbers) {
    // separate last digits
    const actualDigits = numbers.pop();

    // sum num with applied weight
    let sum = 0;
    numbers.forEach((num, index) => {
      const weight = 8 - index;
      sum += num * weight;
    });

    const reminder = sum % 10;
    let digit = 10 - reminder;
    if (digit === 10) digit = 0;

    if (digit === actualDigits) {
      toggleResult(true);
    } else {
      toggleResult(false);
    }
  }

  $scope.valueChange = function () {
    // early exit on unexpected value type
    if (typeof $scope.inputValue !== "string") {
      toggleResult("Unknown input format");
      return;
    }

    // early exit on empty input value
    if (typeof $scope.inputValue === "") {
      $scope.inputArray = new Array(9).fill(null);
      return;
    }

    $scope.inputValue = $scope.inputValue.replaceAll(/[^\d\s]/g, "");

    // parse input value and split as array of single digit
    const value = $scope.inputValue
      .replaceAll(/[\D\s]/g, "")
      .trim()
      .split("");

    // restrain size max to 9 digits
    if (value.length > 9) {
      const includeSpace = $scope.inputValue.includes(" ");
      $scope.inputValue = $scope.inputValue.substring(0, includeSpace ? 11 : 9);
    }

    // mapping value to input array to display
    $scope.inputArray = $scope.inputArray.map((num, index) => {
      if (!value[index]) return null;

      num = parseInt(value[index]);
      if (isNaN(num)) {
        toggleResult("Please insert only number with length of 9");
        return 0;
      }
      return num;
    });

    if (value.length < 9) {
      toggleResult(null);
    } else {
      validateNumber([...$scope.inputArray]);
    }
  };
});
