function Snack(theme) {
    this.x  = getRandomInt(1, 39) * grid;
    this.y  = getRandomInt(1, 39) * grid;

    this.draw = function(){
        img = new Image();
        img.src = 'images/snacks/' + theme + '.png';
        context.drawImage(img, this.x, this.y, grid, grid);
    }

    this.newLocation = function(){
        this.x  = getRandomInt(1, 39) * grid;
        this.y  = getRandomInt(1, 39) * grid;
        snack.checkSpawnOnObstacle();
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
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
        this.x = new_pos[0];
        this.y = new_pos[1]
    }
}

let isEqual = (pos1, pos2) => {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}

let arrayHasElement = (arr, element) => {
    let contains_element = false;
    arr.forEach(array_content => {
        if (isEqual(array_content, element)) {
            contains_element = true;
        }
    });
    return contains_element;
}

let subtractFromArray = (arr1, arr2) => {
    let return_arr = [];
    arr1.forEach(arr_content => {
        if (!arrayHasElement(arr2, arr_content)) {
            return_arr.push(arr_content);
        }
    });
    return return_arr;
}