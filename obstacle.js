function Obstacle() {
    this.x  = getRandomInt(0, 40) * grid;
    this.y  = getRandomInt(0, 40) * grid;

    this.draw = function(){
        img = new Image();
        img.src = 'images/goal2.png';
        context.drawImage(img, this.x, this.y, 2*grid, 2*grid);
    }

    this.newLocation = function(){
        this.x  = getRandomInt(0, 40) * grid;
        this.y  = getRandomInt(0, 40) * grid;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}