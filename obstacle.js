function Obstacle(theme) {
    this.x  = getRandomInt(1, 39) * grid;
    this.y  = getRandomInt(1, 39) * grid;
    checkObstacleCollision();

    this.draw = function(){
        img = new Image();
        img.src = 'images/obstacles/' + theme + '.png';
        context.drawImage(img, this.x, this.y, 2*grid, 2*grid);
    }

    this.newLocation = function(){
        this.x  = getRandomInt(1, 39) * grid;
        this.y  = getRandomInt(1, 39) * grid;
        checkObstacleCollision();
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function checkObstacleCollision(){
        obstacles.forEach(element => {
            while(
                (this.x == element.x && this.y == element.y) ||
                (this.x == element.x + grid && this.y == element.y) ||
                (this.x == element.x && this.y == element.y + grid) ||
                (this.x == element.x + grid && this.y + grid == element.y + grid)
            ){
                this.x  = getRandomInt(1, 39) * grid;
                this.y  = getRandomInt(1, 39) * grid;
            }
        });
    }
}