const canvas = document.getElementById('game');
const context = canvas.getContext("2d");
const grid = 20;

var obstacles = new Array(15);
var snack_theme = 'ball';
var obstacle_theme = 'goal';

(function setup() {
    snake1 = new Snake(1, 'red');
    snake2 = new Snake(2, 'yellow');

    snack = new Snack(snack_theme);

    for(var i=0; i<obstacles.length; ++i){
        obstacles[i] = new Obstacle(obstacle_theme);
    }

    window.setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        snake1.update();
        snake2.update();

        snake1.draw();
        snake2.draw();
        snack.draw();

        for(var i=0; i<obstacles.length; i++){
            obstacles[i].draw();
        }

        if (snake1.eat(snack) || snake2.eat(snack)) {
            snack.newLocation(obstacles);
        }

        obstacles.forEach(element => {
            if(snake1.hit(element) || snake2.hit(element)){
                //snake1.resetGame();
            }
        });
    }, 65)
}());

window.addEventListener('keydown', ((event) => {
    const direction = event.key.replace('Arrow', '');
    snake1.changeDirection(direction);
    snake2.changeDirection(direction);
}))