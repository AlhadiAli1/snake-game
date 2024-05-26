const gameboard = document.querySelector("#gameboard");
const restartbtn = document.querySelector("#restartbtn");
const scoretext = document.querySelector("#score");
const ctx = gameboard.getContext("2d");
const gamewidth = gameboard.width;
const gameheight = gameboard.height;
const backcolor = "white";
const snakecolor = "lightgreen";
const snakeborder = "purple";
const foodcolor = "red";
const unit = 25;
let running = false;
let xvelocity = unit;
let yvelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    { x: unit * 4, y: 0 },
    { x: unit * 3, y: 0 },
    { x: unit * 2, y: 0 },
    { x: unit, y: 0 },
    { x: 0, y: 0 }
]

window.addEventListener("keydown", changedirection);
restartbtn.addEventListener("click", resetgame);
startgame();


function startgame() {
    running = true;
    scoretext.textContent = score;
    createfood();
    drawfood();
    refresh();
}
function refresh() {
    if (running) {
        setTimeout(() => {
            clearboard();
            drawfood();
            movesnake();
            drawsnake();
            checkgameover();
            refresh();
        }, 100);
    }
    else {
        scoretext.textContent = `GAME OVER!
        Score = ${score}`;
    }
};
function clearboard() {
    ctx.fillStyle = backcolor;
    ctx.fillRect(0, 0, gamewidth, gameheight);
};
function createfood() {
    function randomfood(min, max) {
        rand = Math.round((Math.random() * (max - min) + min) / unit) * unit;
        return rand;
    }
    foodX = randomfood(0, (gamewidth - unit));
    foodY = randomfood(0, (gameheight - unit));
};
function drawfood() {
    ctx.fillStyle = foodcolor;
    ctx.fillRect(foodX, foodY, unit, unit);
};
function movesnake() {
    const head = {
        x: snake[0].x + xvelocity,
        y: snake[0].y + yvelocity
    };
    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoretext.textContent = score;
        createfood();
    }
    else {
        snake.pop();
    }

};
function changedirection(event) {
    const keypressed = event.keyCode;
    const left = 37;
    const right = 39;
    const up = 38;
    const down = 40;

    const goingUp = (yvelocity == -unit);
    const goingDown = (yvelocity == unit);
    const goingRight = (xvelocity == unit);
    const goingLeft = (xvelocity == -unit);

    switch (true) {
        case (keypressed == left && !goingRight):
            xvelocity = -unit;
            yvelocity = 0;
            break;
        case (keypressed == right && !goingLeft):
            xvelocity = unit;
            yvelocity = 0;
            break;
        case (keypressed == up && !goingDown):
            xvelocity = 0;
            yvelocity = -unit;
            break;
        case (keypressed == down && !goingUp):
            xvelocity = 0;
            yvelocity = unit;
            break;
    }
};
function checkgameover() {
    if (snake[0].x == -unit || snake[0].x == gamewidth || snake[0].y == -unit || snake[0].y == gameheight) {
        running = false;
        scoretext.textContent = `GAME OVER! 
        Score = ${score}`;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
            scoretext.textContent = `GAME OVER!
        Score = ${score}`;
        }
    }
};

function resetgame() {
    xvelocity = unit;
    yvelocity = 0;
    score = 0;
    snake = [
        { x: unit * 4, y: 0 },
        { x: unit * 3, y: 0 },
        { x: unit * 2, y: 0 },
        { x: unit, y: 0 },
        { x: 0, y: 0 }
    ]
    startgame();
};
function drawsnake() {
    ctx.fillStyle = snakecolor;
    ctx.strokeStyle = snakeborder;
    snake.forEach(snakepart => {
        ctx.fillRect(snakepart.x, snakepart.y, unit, unit);
        ctx.strokeRect(snakepart.x, snakepart.y, unit, unit);
    });
}