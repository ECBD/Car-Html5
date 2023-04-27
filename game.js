// game canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// bird
var bird = {
    x: 50,
    y: 250,
    width: 40,
    height: 30,
    speed: 0,
    gravity: 0.2,
    jump: 4.6
};

// pipes
var pipes = [];
var pipeWidth = 52;
var pipeGap = 100;
var pipeSpeed = 2;
var pipeTimer = 0;

// score
var score = 0;

// game over
var gameOver = false;

// load images
var birdImage = new Image();
birdImage.src = "bird.png";
var pipeImage = new Image();
pipeImage.src = "pipe.png";

// handle user input
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 32) { // space bar
        if (gameOver) {
            reset();
            gameOver = false;
        } else {
            bird.speed = -bird.jump;
        }
    }
});

// game loop
function gameLoop() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update bird
    bird.y += bird.speed;
    bird.speed += bird.gravity;

    // draw bird
    ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

    // update pipes
    pipeTimer++;
    if (pipeTimer % 100 === 0) {
        pipes.push({
            x: canvas.width,
            y: Math.floor(Math.random() * (canvas.height - pipeGap)),
            width: pipeWidth,
            height: canvas.height
        });
    }
    for (var i = 0; i < pipes.length; i++) {
        pipes[i].x -= pipeSpeed;
        if (pipes[i].x <= -pipeWidth) {
            pipes.splice(i, 1);
            i--;
        }
        // check collision
        if (bird.x + bird.width >= pipes[i].x && bird.x <= pipes[i].x + pipeWidth &&
            (bird.y <= pipes[i].y + pipeGap || bird.y + bird.height >= pipes[i].y + pipeGap + pipeGap)) {
            gameOver = true;
        }
        // draw pipes
        ctx.drawImage(pipeImage, pipes[i].x, pipes[i].y, pipes[i].width, pipes[i].height);
    }

    // draw score
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    // check game over
    if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
        gameOver = true;
    }
    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "32px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2 - 16);
    } else {
        score++;
    }

    // call game loop again
    if (!gameOver) {
        window.requestAnimationFrame(gameLoop);
    }
};

// reset game
function reset() {
    bird.y = 250;
    bird.speed = 0;
    pipes = [];
    score = 0;
    pipeTimer = 0;
};

// start game loop
gameLoop();
