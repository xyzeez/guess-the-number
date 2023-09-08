'use strict';

const number = document.querySelector('.number');
const userInput = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const resetBtn = document.querySelector('.again');
const message = document.querySelector('.message');
const scoreBoard = document.querySelector('.score');
const highScoreBoard = document.querySelector('.highscore');

let score = 20;
let highscore = 0;
let randomNumber = Math.trunc(Math.random() * 21);

const displayMessage = (text) => {
    message.textContent = text;
}

const resetGame = () => {
    checkBtn.disabled = false;
    randomNumber = Math.trunc(Math.random() * 21);
    displayMessage("Start guessing...");
    number.textContent = "?";
    userInput.value = "";
    score = 20;
    scoreBoard.textContent = score;
    document.querySelector('body').style.backgroundColor = '#222';
    number.style.width = '15rem';
} 

const checkScore = () => {
    if (score < 1) {
        displayMessage("🤦‍♂️ You Lost!");
        resetGame();
    }
}

checkBtn.addEventListener('click', () => {
    const guessedNumber = Number(userInput.value);

    if (!guessedNumber) {
        displayMessage("😒 Follow the rules!");
    } else if (guessedNumber === randomNumber) {
        displayMessage("👍 Correct Number!");
        number.textContent = randomNumber;
        score++;
        scoreBoard.textContent = score;
        if (highscore < score) {
            highscore = score;
            highScoreBoard.textContent = highscore;
        }
        document.querySelector('body').style.backgroundColor = '#60b347';
        number.style.width = '30rem';
        checkBtn.disabled = true;
    } else if (guessedNumber !== randomNumber) {
        score--;
        scoreBoard.textContent = score;
        displayMessage(guessedNumber < randomNumber ? "↙️ too low!" : "↗️ too high!");
    }

})

resetBtn.addEventListener('click', () => {
    resetGame();
})
