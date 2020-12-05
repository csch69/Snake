const canvas = document.getElementById('game');
const context = canvas.getContext("2d");
const grid = 20;

var obstacles = new Array(12);
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
            snake1.hitObstacle(element);
            snake2.hitObstacle(element);
        });

        if(snake1.dead == true && snake2.dead == true){
            resetGame();
        }
    }, 65)
}());

window.addEventListener('keydown', ((event) => {
    const direction = event.key.replace('Arrow', '');
    snake1.changeDirection(direction);
    snake2.changeDirection(direction);
}))

function resetGame(){
        snake1.x = getRandomInt(5, 35) * grid;
        snake1.y = getRandomInt(5, 35) * grid;
        snake1.cells = [];
        snake1.maxCells = 4;
        snake1.dx = grid;
        snake1.dy = 0;
        snake1.direction = 'rechts';
        snake1.dead = false;

        snake2.x = getRandomInt(5, 35) * grid;
        snake2.y = getRandomInt(5, 35) * grid;
        snake2.cells = [];
        snake2.maxCells = 4;
        snake2.dx = grid;
        snake2.dy = 0;
        snake2.direction = 'rechts';
        snake2.dead = false;

    snack.x = getRandomInt(0, 39) * grid;
    snack.y = getRandomInt(0, 39) * grid;
 
    obstacles.forEach(element => {
        element.newLocation();
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}