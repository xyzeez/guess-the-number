'use strict';

const number = document.querySelector('.number');
const userInput = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const resetBtn = document.querySelector('.again');
const message = document.querySelector('.message');
const scoreBoard = document.querySelector('.score');
const highScoreBoard = document.querySelector('.highscore');

const failureSound = new Audio('./asset/failure-drum-sound-effect.mp3');
const successSound = new Audio('./asset/success-fanfare-trumpets.mp3');
const gameOverSound = new Audio('./asset/game-over.mp3');

const playSound = (sound) => {
    sound.play();
}
let score = 3;
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
    if (score === 0) {
        displayMessage("🤦‍♂️ You Lost!");
        setTimeout(resetGame, 1000);
    }
}

checkBtn.addEventListener('click', () => {
    const guessedNumber = Number(userInput.value);

    if (!guessedNumber) {
        displayMessage("😒 Follow the rules!");
    } else if (guessedNumber === randomNumber) {
        displayMessage("👍 Correct Number!");
        playSound(successSound);
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
        if (score > 0) {
            displayMessage(guessedNumber < randomNumber ? "↙️ too low!" : "↗️ too high!");
            playSound(failureSound);
        } else if (score === 0) {
            displayMessage("🤦‍♂️ You Lost!");
            setTimeout(resetGame, 1000);
            playSound(gameOverSound);
        }
    }

})

resetBtn.addEventListener('click', () => {
    resetGame();
})
