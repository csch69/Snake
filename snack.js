function Snack(theme) {
    this.x  = getRandomInt(0, 40) * grid;
    this.y  = getRandomInt(0, 40) * grid;
    checkObstacleCollision();

    this.draw = function(){
        img = new Image();
        img.src = 'images/snacks/' + theme + '.png';
        context.drawImage(img, this.x, this.y, grid, grid);
    }

    this.newLocation = function(){
        this.x  = getRandomInt(0, 40) * grid;
        this.y  = getRandomInt(0, 40) * grid;
        checkObstacleCollision();
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function checkObstacleCollision(){
        obstacles.forEach(element => {
            while(this.x == element.x || this.y == element.y || this.x == element.x + grid || this.y == element.y + grid){
                this.x  = getRandomInt(0, 40) * grid;
                this.y  = getRandomInt(0, 40) * grid;
            }
        });
    }
}