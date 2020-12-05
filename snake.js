function Snake(player, color){
    this.x  = getRandomInt(0, 40) * grid;
    this.y  = getRandomInt(0, 40) * grid;
    this.dx = grid;
    this.dy = 0;
    this.cells = [];
    this.maxCells = 4;
    this.direction = 'rechts';
    this.dead = false;


    this.draw = function(){
        this.cells.forEach(function(cell, index) {
            if(index != 0){
                context.fillStyle = color;
                context.fillRect(cell.x, cell.y, grid-1, grid-1);
            }
        })
        img = new Image();
        img.src = 'images/heads/head_' + color + '_' + this.direction + '.png';
        context.drawImage(img, this.x, this.y, grid, grid);
    }

    this.update = function(){
        this.x += this.dx;
        this.y += this.dy;

        if(this.x < 0) {
            this.x = canvas.width - grid;
        }
        else if(this.x >= canvas.width) {
            this.x = 0;
        }

        if(this.y < 0) {
            this.y = canvas.height - grid;
        }
        else if(this.y >= canvas.height) {
            this.y = 0;
        }

        this.cells.unshift({x: this.x, y: this.y});

        if(this.cells.length > this.maxCells) {
            this.cells.pop();
        }

        this.cells.forEach(function(cell, index) {
            for (var i = index+1; i < snake1.cells.length; i++) {
                if(cell.x === snake1.cells[i].x && cell.y == snake1.cells[i].y) {
                    snake1.resetGame();
                }
            }

            for (var i = index+1; i < snake2.cells.length; i++) {
                if(cell.x === snake2.cells[i].x && cell.y == snake2.cells[i].y) {
                    snake2.resetGame();
                }
            }
        });
    }

    this.changeDirection = function(direction){
        if(player == 1){
            if(direction == 'Left' && this.dx == 0) {
                this.dx = -grid;
                this.dy = 0;
                this.direction = 'links';
            }
            else if(direction == 'Up'  && this.dy == 0) {
                this.dy = -grid;
                this.dx = 0;
                this.direction = 'oben';
            }
            else if(direction == 'Right' && this.dx == 0) {
                this.dx = grid;
                this.dy = 0;
                this.direction = 'rechts';
            }
            else if(direction == 'Down'  && this.dy == 0) {
                this.dy = grid;
                this.dx = 0;
                this.direction = 'unten';
            }
        }
        else if(player == 2){
            if(direction == 'a' && this.dx == 0) {
                this.dx = -grid;
                this.dy = 0; 
                this.direction = 'links';
            }
            else if(direction == 'w'  && this.dy == 0) {
                this.dy = -grid;
                this.dx = 0;
                this.direction = 'oben';
            }
            else if(direction == 'd' && this.dx == 0) {
                this.dx = grid;
                this.dy = 0;
                this.direction = 'rechts';
            }
            else if(direction == 's'  && this.dy == 0) {
                this.dy = grid;
                this.dx = 0;
                this.direction = 'unten';
            }
        }
    }

    this.eat = function(snack){
        if(this.x == snack.x && this.y == snack.y){
            this.maxCells++;
            return true;
        }
        return false;
    }

    this.hit = function(obstacle){
        this.dead = true;
        return (
            (this.x == obstacle.x && this.y == obstacle.y) || 
            (this.x == obstacle.x + grid && this.y == obstacle.y) || 
            (this.x == obstacle.x && this.y == obstacle.y + grid) || 
            (this.x == obstacle.x + grid && this.y == obstacle.y + grid)) ? true : false;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    this.resetGame = function(){
        if(snake1.dead == true && snake2.dead == true){
            snake1.x = getRandomInt(0, 25) * grid;
            snake1.y = getRandomInt(0, 25) * grid;
            snake1.cells = [];
            snake1.maxCells = 4;
            snake1.dx = grid;
            snake1.dy = 0;
            snake1.direction = 'rechts';
            snake1.dead = false;

            snake2.x = getRandomInt(0, 25) * grid;
            snake2.y = getRandomInt(0, 25) * grid;
            snake2.cells = [];
            snake2.maxCells = 4;
            snake2.dx = grid;
            snake2.dy = 0;
            snake2.direction = 'rechts';
            snake2.dead = false;

            snack.x = getRandomInt(0, 25) * grid;
            snack.y = getRandomInt(0, 25) * grid;

            obstacles.forEach(element => {
                element.newLocation();
            });
        }
    }
}