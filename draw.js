const canvas = document.getElementById('game');
const context = canvas.getContext("2d");
const grid = 20;

var background = new Image();
background.src = 'images/grass.jpg';
context.drawImage(background, 0, 0, canvas.width, canvas.height);
console.log(background);

(function setup() {
    snake1 = new Snake(1, 'red');
    snake2 = new Snake(2, 'black');
    snack = new Snack();
    obstacle = new Obstacle();

    window.setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        snake1.update();
        snake2.update();

        snake1.draw();
        snake2.draw();

        snack.draw();
        obstacle.draw();
        obstacle.draw();

        if (snake1.eat(snack) || snake2.eat(snack)) {
            snack.newLocation();
        }

        if (snake1.hit(obstacle) || snake2.hit(obstacle)) {
            snake1.resetGame();
        }
    }, 75)
}());

window.addEventListener('keydown', ((event) => {
    const direction = event.key.replace('Arrow', '');
    snake1.changeDirection(direction);
    snake2.changeDirection(direction);
}))