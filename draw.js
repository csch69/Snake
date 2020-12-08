const canvas = document.getElementById('game');
const context = canvas.getContext("2d");
const grid = 20;

var all_coordinates = [];
for(let j=20; j<800; j+=20){
    for(let k=20; k<800; k+=20){
        all_coordinates.push([j,k]);
    }
}

getWorld();


var obstacles = [];
for(var i=0; i<40; ++i){
    obstacles[i] = new Obstacle('goal');
}
var snack = new Snack('ball');
var snake1 = new Snake(1, 'red');
var snake2 = new Snake(2, 'yellow');

snack.checkSpawnOnObstacle();

var timer = 0;
setInterval(() => {
    if(timer < obstacles.length) timer++;
},2500);

(function setup() {
    window.setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        snake1.update();
        snake2.update();

        snake1.draw();
        snake2.draw();
        snack.draw();

        for(var i=0; i<timer; i++){
            obstacles[i].draw();
            obstacles[i].markAsSpawned();
        }

        if (snake1.eat(snack) || snake2.eat(snack)) {
            snack.newLocation();
        }

        obstacles.forEach(obstacle => {
            snake1.hitObstacle(obstacle);
            snake2.hitObstacle(obstacle);
        });

        if(snake1.dead == true && snake2.dead == true){
            if(snake1.maxCells > snake2.maxCells){
                setHighscore(getPlayer1Name, snake1.maxCells);
            }else{
                setHighscore(getPlayer2Name, snake2.maxCells);
            }
            resetGame();
        }
    }, 80)
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
 
    obstacles.forEach(obstacle => {
        obstacle.spawned = false;
        obstacle.newLocation();
    });

    timer = 0;

    snack.newLocation();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getPlayer1Name(){
    return localStorage.getItem('p1');
}

function getPlayer2Name(){
    return localStorage.getItem('p2');
}

//prüft ob eine Neuer Highscore vorhandem ist
function setHighscore(pname, winnerScore) {
    nh = false;
    if (localStorage.getItem('highscore') == null) {
        localStorage.setItem('highscore', 'OLI:160;ALFRED:50;Peter:30;DIETMAR:10;ACEL:5')
    }
    const score = localStorage.getItem('highscore').split(';')
    var nameScore = [
        score[0].split(':'),
        score[1].split(':'),
        score[2].split(':'),
        score[3].split(':'),
        score[4].split(':'),
    ];
    for (let i = 0; i < 5; i++) {
        var element = nameScore[i][1];
        if (winnerScore > parseInt(element)) {
            nameScore[4][1] = winnerScore;
            nameScore[4][0] = pname;
            nh = true;
            break;
        }
    }
    if (nh == true) {
        nameScore = nameScore.sort(function (a, b) {
            return b[1] - a[1];
        });
        console.log(nameScore);
        var rueckgabe = "";
        for (let j = 0; j < 5; j++) {
            rueckgabe += nameScore[j][0] + ':' + nameScore[j][1] + ';';
        }
        setElem('highscore', rueckgabe);
        console.log(nameScore, rueckgabe);
    }
}

function getWorld(){
    let world = localStorage.getItem('w');

    switch (world) {
        case 'classic':
            break;
        case 'soccer':
            break;
        case 'space':
            break;
        default:
            break;
    }
}

