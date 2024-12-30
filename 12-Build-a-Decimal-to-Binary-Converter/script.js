const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const showProcessBtn = document.getElementById("show-process-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

let showProcess = false;

showProcessBtn.addEventListener("click", () => {
    showProcess = !showProcess;
    showProcessBtn.textContent = showProcess ? "Hide Process" : "Show Process";
});

const decimalToBinarySteps = (input) => {
  const steps = [];
  let num = input;
  while (num > 1) {
    steps.push({
      inputVal: num,
      remainder: num % 2,
      quotient: Math.floor(num / 2),
    });
    num = Math.floor(num / 2);
  }
  steps.push({ inputVal: num, remainder: num, quotient: 0 });
  return steps;
};

const generateAnimationData = (input) => {
  const steps = decimalToBinarySteps(input);
  const animationData = steps.map((step, index) => {
    const delayMultiplier = index + 1;
    const msg = step.quotient
      ? `decimalToBinary(${step.inputVal}) returns "${step.remainder}" + decimalToBinary(${step.quotient})`
      : `decimalToBinary(${step.inputVal}) is the base case and returns '${step.inputVal}'`;
    
    return {
      inputVal: step.inputVal,
      addElDelay: 1000 * delayMultiplier,
      msg: msg,
      showMsgDelay: 5000 * delayMultiplier,
      removeElDelay: 8000 * delayMultiplier,
    };
  });

  return animationData;
};

const showAnimation = (input) => {
    const animationData = generateAnimationData(input);
    result.innerText = "Call Stack Animation";
    animationContainer.innerHTML = "";
  
    animationData.forEach((obj) => {
      setTimeout(() => {
        animationContainer.innerHTML += `
          <p id="${obj.inputVal}" class="animation-frame">
            decimalToBinary(${obj.inputVal})
          </p>
        `;
      }, obj.addElDelay);
  
      setTimeout(() => {
        document.getElementById(obj.inputVal).textContent = obj.msg;
      }, obj.showMsgDelay);
    });
  
    // Show final binary result after all animations
    setTimeout(() => {
      const binaryResult = decimalToBinary(input);
      result.textContent = `${input} in binary is ${binaryResult}`;
    }, animationData[animationData.length - 1].showMsgDelay + 2000);
  };

const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
    alert("Please provide a decimal number greater than or equal to 0");
    return;
  }

  if (showProcess) {
    showAnimation(inputInt);
  } else {
    const binaryResult = decimalToBinary(inputInt);
    result.textContent = `${inputInt} in binary is ${binaryResult}`;
    animationContainer.innerHTML = "";
  }

  
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
