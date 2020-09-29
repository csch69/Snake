<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flappy Bird</title>
</head>
<body id="bodyEl" style="margin:0 ; padding: 0; border: 0; overflow: hidden;">
    <canvas id="canvasEl" style="padding: 0; border: 0; margin: 0; "></canvas>
    <script>
         class obstacle{
            constructor(posX){
                //obstacle variables
                this.owidth= 120; //the width of the obstacles
                this.dbo =100;  //distant betwenn the obstacles
                this.oroom = 130; //distant between the upper and lower obstacle
                this.posY = this.getRandomArbitrary(this.oroom,(canvas.height-this.oroom));//Math.floor(Math.random() * (canvas.height-this.oroom));
                this.mStepp = 5;
                this.posX = posX ;
            }
            getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
            }

            colorRect(topx, topy, length, height, color) {
                canvasContext.fillStyle = color;
                canvasContext.fillRect(topx, topy, length, height);
            }
        
            drawObstacle()
            {
                //obstacle upside
                colorRect(this.posX,0,this.owidth,this.posY,"#7DB46C");
                //obstacle downside
                colorRect(this.posX,canvas.height,this.owidth,-canvas.height+this.posY+this.oroom,"#7DB46C");
            }

            move(){
                this.posX -= this.mStepp;
            }

            movedraw(){
                this.move();
                this.drawObstacle();
            }

            posUP()
            {
                return this.posY;
            }
            posDOWN()
            {
                return this.posY+this.oroom;
            }
        }
        
        //Varaibles
        var framesperSecound =50;
        var punkteStand=0;
        //canvas Element
        var canvas = document.getElementById("canvasEl");
        var canvasContext = canvas.getContext("2d");
        
        //Game Figure
        var fwidth = 40;
        var fheight = 40;
        
        var fyPos = ( window.innerHeight/2-fheight/2);
        var fxPos = window.innerWidth/2-fwidth/2;
        let obstaclesList = [];


        //Highscore
        var highscore = getHighscore(); 
        
        var flimmern =0;
       
       
        //interval function
        setInterval(
        
            function()
            {
               
                drawEverything();
               
            },1000/framesperSecound
        );
        
        //EventListeners
        //onkeydown = moveFigure;
        onmousedown= moveFigure; //Steuerung mit Mausklick
        
        //Methods for Drawing
        function drawEverything()
        {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;

             //background 
             colorRect(0, 0, canvas.width, canvas.height, "#D1EDF2");

            //logo 
            logo("#38ACEC");
             //Player
             fyPos+=4; //bigger than heigth the bird dies
             colorRect(canvas.width/2-fwidth/2,fyPos,fwidth,fheight,"#FFF5A6")
             
             //obstacles
             obstacleHandler();
            
            //Scoreboard
            canvasContext.font="30px Arial";
            canvasContext.textAlign  = "center";
            canvasContext.fillText("Score "+punkteStand,canvas.width/2, canvas.height/6);
            //Highscore
            canvasContext.font="30px Arial";
            canvasContext.textAlign  = "center";
            canvasContext.fillText("Highscore "+getHighscore(),canvas.width/2, canvas.height/4);
            //refrehses the variable
            fxPos = window.innerWidth/2-fwidth/2;
            if(iscrashed()){
                restart();
            }
        

        }

        //Erzeugt die hindernisse
        function obstacleHandler()
        {   
            
            if (obstaclesList.length == 0) {
               
                obstaclesList.push(new obstacle(canvas.width));
                obstaclesList[0].movedraw();        
            }
            else if (obstaclesList[obstaclesList.length-1].posX < canvas.width/2.5)
            {
                obstaclesList.push(new obstacle(canvas.width));
                obstaclesList.forEach(element => element.movedraw());
                punkteStand +=1;
            }
            else{
                obstaclesList.forEach(element => element.movedraw());
            }
            if (obstaclesList[0].posX <30) {
                obstaclesList.shift();
                
            }
           

        }

        //Draws a colored rectangle
        function colorRect(topx, topy, length, height, color) {
            canvasContext.fillStyle = color;
            canvasContext.fillRect(topx, topy, length, height);
        }
        
        //is flappy crashed
        function iscrashed()
        {
            
            if (fyPos>canvas.height) {
                return true;
            }
            if(obstaclesList[0].posX <= fxPos+fwidth/2 && obstaclesList[0].posX +obstaclesList[0].owidth >=fxPos)
            {
                console.log()
                if(obstaclesList[0].posDOWN() <= fyPos+ fheight || obstaclesList[0].posUP() >= fyPos ){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }
        }
       
        //Restart
        function restart(){
            setHighscore(punkteStand);
            punkteStand =0;
            fyPos = canvas.height/2;
            obstaclesList = [];
        }
        
        //Methods for Moving
            //For moving with arrow keys 
        //  function moveFigure(evt)
        // {
        //     if (evt.keyCode == 38) {
        //         fyPos -=60;
        //     }
                
        // }
        function moveFigure(evt)
        {     
                fyPos -=70;

        }

        //Highscore functions
        function getHighscore(){
            
            if((score =localStorage.getItem('fpscore') )== null)
            {
                localStorage.setItem('fpscore','0') 
                return 0;  
            }else
            {
                return score;
            }
        }

        function setHighscore(score)
        {
            
            if((localStorage.getItem('fpscore') )== null)
            {
                localStorage.setItem('fpscore',score) 
            }
            else if(score>highscore)
            {
                localStorage.removeItem('fpscore');
                localStorage.setItem('fpscore', score);
            }
        }

        //Logo 
        function logo(color){
                    canvasContext.font = "100px ComicSans";
                    canvasContext.fillStyle = color;
                    canvasContext.textAlign  = "center"
                    canvasContext.fillText("C.S. DESIGN", canvas.width/2,canvas.height/2 );
                // const dauer = 10;
                // if(flimmern <=dauer && flimmern>=0)
                // {
                //     canvasContext.font = "100px ComicSans";
                //     canvasContext.fillStyle = color;
                //     canvasContext.textAlign  = "center"
                //     canvasContext.fillText("C.S. DESIGN", canvas.width/2,canvas.height/2 );
                //     flimmern++;
                // }
                // else if (flimmern==dauer+1){
                //     flimmern = -dauer;
                // }
                // else{
                //     flimmern++;
                // }   
        }
    </script>
</body>
</html>