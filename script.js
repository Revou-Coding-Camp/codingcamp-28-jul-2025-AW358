const tileCount = 6;
const tilePositions = Array(tileCount).fill(0);
const tileOffsets = [
    [0, 0],     // tile0: kiri atas
    [150, 0],   // tile1: kanan atas
    [0, 100],   // tile2: kiri tengah
    [150, 100], // tile3: kanan tengah
    [0, 200],   // tile4: kiri bawah
    [150, 200]  // tile5: kanan bawah
];

const imagePaths = [
    'images/Gambar Ayam.jpg',
      'images/Gambar Jerapah.jpg',
      'images/Gambar Penguin.jpg',
      'images/Gambar Ikan Lele.jpg'
];

let maxImages = imagePaths.length;
let timer;
let timeLeft = 60;
let score = 0;
let isMatching = false;

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const gameContainer = document.getElementById("game");
const timerEl = document.getElementById("timer");
const scoreBoardEl = document.getElementById("scoreBoard");
const gameOverModal = document.getElementById("game-over-modal");
const modalScoreEl = document.getElementById("modal-score");
const modalRestartBtn = document.getElementById("modal-restart-btn");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function updateTiles() {
    for (let i = 0; i < tileCount; i++) {
        const imgIndex = tilePositions[i];
        const [x, y] = tileOffsets[i];
        const tile = document.getElementById(`tile${i}`);
        tile.style.backgroundImage = `url('${imagePaths[imgIndex]}')`;
        tile.style.backgroundPosition = `-${x}px -${y}px`;
    }
}

function shift(index, direction) {
    if (isMatching) return;
    tilePositions[index] = (tilePositions[index] + direction + maxImages) % maxImages;
    updateTiles();
    checkMatch();
}

function checkMatch() {
    const first = tilePositions[0];
    const allMatch = tilePositions.every(pos => pos === first);
    if (allMatch && !isMatching) {
        isMatching = true;
        score++;
        scoreBoardEl.textContent = "Skor: " + score;
        
        setTimeout(() => {
            reshuffle();
            isMatching = false;
        }, 1000);
    }
}

function reshuffle() {
    do {
        for (let i = 0; i < tileCount; i++) {
            tilePositions[i] = getRandomInt(maxImages);
        }
    } while (tilePositions.every(p => p === tilePositions[0]));
    updateTiles();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 60;
    timerEl.textContent = "Waktu: " + timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = "Waktu: " + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showGameOverModal();
        }
    }, 1000);
}

function showGameOverModal() {
    modalScoreEl.textContent = `Skor akhir: ${score}`;
    gameOverModal.style.display = "flex";
}

function startGame() {
    gameOverModal.style.display = "none";
    
    score = 0;
    scoreBoardEl.textContent = "Skor: 0";
    restartBtn.style.display = "none";
    gameContainer.style.display = "block";
    startBtn.style.display = "none";

    reshuffle();
    startTimer();
}

startBtn.addEventListener("click", startGame);
modalRestartBtn.addEventListener("click", startGame);
