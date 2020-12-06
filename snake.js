function Snake(player, color){
    this.x  = getRandomInt(5, 35) * grid;
    this.y  = getRandomInt(5, 35) * grid;
    this.dx = grid;
    this.dy = 0;
    this.cells = [];
    this.maxCells = 4;
    this.direction = 'rechts';
    this.dead = false;

    this.draw = function(){
        this.cells.forEach(function(cell, index) {
            if(index != 0){
                context.beginPath();
                context.arc(cell.x+(grid/2), cell.y+(grid/2), grid/2, 0, 2*Math.PI);
                context.fillStyle = color;
                context.fill();
            }
        })
        img = new Image();
        img.src = 'images/heads/head_' + color + '_' + this.direction + '.png';
        context.drawImage(img, this.x, this.y, grid, grid);
    }

    this.update = function(){
        if(!this.dead){
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

            snake1.cells.forEach(function(cell, index) {
                if(snake2.x == cell.x && snake2.y == cell.y){
                    snake2.dead = true;
                }

                for (var i=index+1; i<snake1.cells.length; i++) {
                    if(cell.x === snake1.cells[i].x && cell.y == snake1.cells[i].y) {
                        snake1.dead = true;
                    }
                }
            });

            snake2.cells.forEach(function(cell, index) {
                if(snake1.x == cell.x && snake1.y == cell.y){
                    snake1.dead = true;
                }
                for (var i=index+1; i<snake2.cells.length; i++) {
                    if(cell.x === snake2.cells[i].x && cell.y == snake2.cells[i].y) {
                        snake2.dead = true;
                    }
                }
            });
        }
    }

    this.changeDirection = function(direction){
        if(player == 1 && this.dead == false){
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
        else if(player == 2 && this.dead == false){
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

    this.hitObstacle = function(obstacle){
        if(obstacle.spawned == true){
            if((this.x == obstacle.x && this.y == obstacle.y) || 
                (this.x == obstacle.x + grid && this.y == obstacle.y) || 
                (this.x == obstacle.x && this.y == obstacle.y + grid) || 
                (this.x == obstacle.x + grid && this.y == obstacle.y + grid)){
                    this.dead = true;
            }
        }
    }

    this.checkSpawnOnObstacle = function(){
        let coordinates = [];

        for(var i=0; i<obstacles.length; i++){
            coordinates.push([obstacles[i].x, obstacles[i].y]);
            coordinates.push([obstacles[i].x+grid, obstacles[i].y]);
            coordinates.push([obstacles[i].x, obstacles[i].y+grid]);
            coordinates.push([obstacles[i].x+grid, obstacles[i].y+grid]);
        }

        let not_in_coordinates = subtractFromArray(all_coordinates, coordinates);

        let new_pos = not_in_coordinates[Math.floor(Math.random() * not_in_coordinates.length)];
        console.log(this.x);
        this.x = new_pos[0];
        this.y = new_pos[1];
        console.log(this.x);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}