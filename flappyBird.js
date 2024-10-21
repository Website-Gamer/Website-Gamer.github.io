const canvas = document.getElementById('flappyCanvas');
const ctx = canvas.getContext('2d');

const bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.5,
    velocity: 0,
    jump: -7,
    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
            this.velocity = 0;
        }
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    },
    flap() {
        this.velocity = this.jump;
    }
};

const pipes = [];
const pipeWidth = 40;
const gap = 100;
let pipeInterval = 2000;
let lastPipe = Date.now();

function drawPipe(pipe) {
    ctx.fillStyle = "green";
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
    ctx.fillRect(pipe.x, pipe.topHeight + gap, pipeWidth, canvas.height - pipe.topHeight - gap);
}

function updatePipes() {
    if (Date.now() - lastPipe > pipeInterval) {
        pipes.push({
            x: canvas.width,
            topHeight: Math.random() * (canvas.height - gap),
        });
        lastPipe = Date.now();
    }

    pipes.forEach(pipe => {
        pipe.x -= 2;
        drawPipe(pipe);
    });

    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.update();
    bird.draw();
    updatePipes();

    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', () => bird.flap());

gameLoop();
