function Obstacle(theme) {
    this.x  = getRandomInt(1, 39) * grid;
    this.y  = getRandomInt(1, 39) * grid;
    this.spawned = false;

    this.draw = function(){
        img = new Image();
        img.src = 'images/obstacles/' + theme + '.png';
        context.drawImage(img, this.x, this.y, grid*2, grid*2);
    }

    this.newLocation = function(){
        this.x  = getRandomInt(1, 39) * grid;
        this.y  = getRandomInt(1, 39) * grid;
    }

    this.markAsSpawned = function(){
        this.spawned = true;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}