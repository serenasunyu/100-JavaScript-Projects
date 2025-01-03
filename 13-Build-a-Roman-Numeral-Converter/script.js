

const romanToNumberMap = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
  };

// mapping for Roman numeral conversion
const numberToRomanMap = [
  { value: 1000, numeral: "M" },
  { value: 900, numeral: "CM" },
  { value: 500, numeral: "D" },
  { value: 400, numeral: "CD" },
  { value: 100, numeral: "C" },
  { value: 90, numeral: "XC" },
  { value: 50, numeral: "L" },
  { value: 40, numeral: "XL" },
  { value: 10, numeral: "X" },
  { value: 9, numeral: "IX" },
  { value: 5, numeral: "V" },
  { value: 4, numeral: "IV" },
  { value: 1, numeral: "I" }
];

// convert Roman numeral to number
const romanToNumber = (roman) => {
    let res = 0;
    for (let i = 0; i < roman.length; i++) {
        const current = romanToNumberMap[roman[i]];
        const next = romanToNumberMap[roman[i + 1]];
        if (next > current) {
            res += next - current;
            i++; // skip the next character
        } else {
            res += current;
        }
    }
    return res;
}

// function to convert number to Roman numeral
const numberToRoman = (number) => {
    let res = "";
    for (const {value, numeral} of numberToRomanMap) {
        while (number >= value) {
            res += numeral;
            number -= value;
        }
    }
    return res;
}

// validate input and update output
const checkInput = (output, inputValue) => {
    const input = inputValue.trim();
    const inputNumber = parseInt(input, 10);

    if (isNaN(inputNumber) || inputNumber === "") {
        output.textContent = "Please enter a valid number.";
        output.classList.add("error");
    } else if (inputNumber < 1) {
        output.textContent = "Please enter a number greater than or equal to 1.";
        output.classList.add("error");
    } else if (inputNumber >= 4000) {
        output.textContent = "Please enter a number less than or equal to 3999.";
        output.classList.add("error");
    } else {
        output.textContent = numberToRoman(inputNumber);
        output.classList.add("success");
    }
}

// add eventlisten on the convert button
const button = document.getElementById("convert-btn");
button.addEventListener("click", () => {
    const input = document.getElementById("number");
    const output = document.getElementById("output");

    // reset output styles and make visible
    output.className = "";
    output.style.display = "block";

    // validate input and generate result
    checkInput(output, input.value);

});