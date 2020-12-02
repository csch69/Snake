function Snack() {
    this.x  = getRandomInt(0, 40) * grid;
    this.y  = getRandomInt(0, 40) * grid;

    this.draw = function(){
        // context.fillStyle = 'red';
        // context.fillRect(this.x, this.y, grid, grid);
        img = new Image();
        img.src = 'images/ball.png';
        context.drawImage(img, this.x, this.y, grid, grid);
    }

    this.newLocation = function(){
        this.x  = getRandomInt(0, 40) * grid;
        this.y  = getRandomInt(0, 40) * grid;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}