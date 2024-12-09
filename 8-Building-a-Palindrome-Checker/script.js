const button = document.getElementById("check-btn");

button.addEventListener("click", () => {
  // get the text input value
  const inputText = document.getElementById("text-input").value.trim();
  const resultSpan = document.getElementById("result");

  // Check for empty input
  if (!inputText) {
    alert("Please input a value");
    return;
  }

  // Palindrome checking logic
  const isPalindrome = (text) => {
    const cleanedText = text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleanedText === cleanedText.split("").reverse().join("")
};

  // Determine if the input is a palindrome
  const isInputPalindrome = isPalindrome(inputText);

  // Update the result span with the message
  resultSpan.textContent = `${inputText} is ${isInputPalindrome ? '' : 'not '}a palindrome`;
});


