let randomNumber1 = Math.floor(Math.random() * 6) + 1; // 1 - 6
let randomNumber2 = Math.floor(Math.random() * 6) + 1;

let randomDIceImage = "dice" + randomNumber1 + ".png"; // dice1.png - dice6.png

let randomImageSource = "images/" + randomDIceImage; // images/dic1.png - images/dice6/png
let randomImageSource2 = "images/dice" + randomNumber2 + ".png";

let imageLeft = document.querySelectorAll("img")[0];
let imageRight = document.querySelectorAll("img")[1];

imageLeft.setAttribute("src", randomImageSource);
imageRight.setAttribute("src", randomImageSource2);


// compare and show the result
if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "🚩 Player1 Wins!";
} else if (randomNumber2 > randomNumber1) {
    document.querySelector("h1").innerHTML = "Player2 Wins! 🚩";
} else {
    document.querySelector("h1").innerHTML = "Draw!";
}