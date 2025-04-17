const pad = document.querySelector(".pad");
const gameWindow = document.querySelector(".game");
const ball = document.querySelector(".ball");
const ctx = gameWindow.getContext('2d');
const overlay = document.querySelector('.overlay');
const pauseMenu = document.querySelector('.pause');
const pauseContinueButton = pauseMenu.children[1];
const pauseExitButton = pauseMenu.children[2];

//TODO: make a better website, dodaj backgrounds, dodaj item pickups, naredi da start when key pressed

//Parameter delcaration
let x = 300, y= 275, dx = 10, dy = 5; //ball
let recx, recy = 800-61, recdx = 10, recWidth = 256, recHeight = 20; //paddle
let ballWidth = 24*1.5, ballHeight = 25*1.5;
recx = (gameWindow.width/2) - recWidth/2;
//bricks
let bricks;
let nrows = 4;
let ncols;
let brickWidth = (gameWindow.width / ncols) - 1;
let brickHeight = 15;
let padding = 5;
let activeBricks = 0;
//Move flags
let isMovingLeft = false, isMovingRight = false, isPaused = false, lost = false;

//sprites
const tear = new Image();
const rock = new Image();
const background = new Image();
const platform = new Image();


tear.src = 'sprites/Troll_Bomb64x64.png';
rock.src = 'sprites/Rock64x64.png'
background.src = 'sprites/Basement.png';
platform.src = 'sprites/platform.png';

//sprite Values
let rockWidth = 64;
let rockHeight = 64;


let animationFrame;

function keyPressedDonwn(e){
    
    console.log(e.keyCode);

    if(e.keyCode === 65){
        isMovingRight = true;
    }

    if(e.keyCode === 68){
        isMovingLeft = true;
    }
    //a d: 65 68

    if(e.keyCode == 80 || e.keyCode == 27)
        if(!isPaused && !lost)
            isPaused = true;
        else if(!lost){
            isPaused = false;
            pauseMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            requestAnimationFrame(update);
        }

}

function keyReleased(e){
    if(e.keyCode === 65){
        isMovingRight = false;
    }

    if(e.keyCode === 68){
        isMovingLeft = false;
    }
}

function initBricks(){
    ncols = Math.floor(gameWindow.width / rockWidth) - 1;
    console.log(nrows);
    bricks = new Array(nrows)
    for(let i = 0 ; i < bricks.length; i ++){
        bricks[i] = new Array(ncols)
        for(let j = 0; j < bricks[i].length; j++){
            bricks[i][j] = 1;
            activeBricks++;
        }
    }
}

function drawPad(){
    ctx.fillStype = "white";
    //ctx.rect(recx, recy, recWidth, recHeight);
    ctx.drawImage(platform,recx, recy, 256, 61);
    ctx.fillStyle = "black";
}

function drawBall(){
    ctx.arc(x, y, 10, 0, Math.PI*2, true);
}

function drawBricks(){
    for(let i = 0 ; i < bricks.length; i ++){
        for(let j = 0; j < bricks[i].length; j++)
            if(bricks[i][j] == 1){
                //ctx.rect((j*(rockWidth + padding))+padding, (i*(rockHeight + padding))+padding, rockWidth, rockHeight);
                ctx.drawImage(rock, (j*(rockWidth + padding))+padding, (i*(rockHeight + padding))+padding, rockWidth, rockHeight)
            }
    }
}

function movePad(){
    if((recx + recWidth < gameWindow.width) && isMovingLeft)
        recx += recdx
    
    if((recx + recdx > 0) && isMovingRight)
        recx -= recdx;

}

function moveBall(){
    if(x+5 > gameWindow.width || x-5 < 0) 
        dx *= -1;
    
    /*if(y - 10 < 0){
        dy *=-1;
    }*/

    if(y - 10 < 0 || y+5 > gameWindow.height){
        dy *=-1;
    }
}

function isWon(){
    return (activeBricks == 0) ? true : false;
}

function isOutOfBounds(){
    return (y + ballHeight > gameWindow.height);
}

function breakBricks(){
    let rowheigth = rockHeight + padding;
    let colwidth = rockWidth + padding;
    let row = Math.floor(y/rowheigth);
    let col = Math.floor(x/colwidth);

    if (y < nrows * rowheigth && row >=0 && col >=0 && bricks[row][col]== 1){
        dy *=-1;
        bricks[row][col] = 0;
        activeBricks--;
    }
}

function update(){
    console.log(y)
    if(isPaused){

        pauseMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        if(animationFrame)
            cancelAnimationFrame(animationFrame);
        
        return;

    }

    ctx.reset();
    ctx.beginPath();
    drawBackground();
    //drawBall();
    drawSprite();
    drawPad();
    drawBricks();
    ctx.closePath();
    ctx.fill();


    //movement
    movePad();
    //moveBall();
    moveSprite();
    
    //paddle collison
    if((x >= recx && x <= recx+recWidth) && ((y + dy +(ballHeight/2) > recy-recHeight))){
        dx = 15 * ((x-(recx+recWidth/2))/recWidth);
        dy *= -1;
    }

    breakBricks();

    if(isWon()){
        console.log("gg");
        cancelAnimationFrame(animationFrame);
        return;
    }


    x += dx;
    y += dy;
    
    if(isOutOfBounds()){
        lost = true;
        console.log("outOfBounds")
        console.log(lost);
        cancelAnimationFrame(animationFrame);
        return;
    }

    animationFrame = requestAnimationFrame(update);
}

function initGame(){
    initBricks();
    requestAnimationFrame(update);
}

function drawSprite(){
    ctx.drawImage(tear,x ,y , 42, 42);
}

function drawBackground(){
    ctx.drawImage(background,0,0,gameWindow.width,gameWindow.height);
}


function moveSprite(){
    if(x+ballWidth> gameWindow.width || (x - ballWidth/2) + 20 < 0) 
        dx *= -1;
    
    /*if(y - 10 < 0){
        dy *=-1;
    }*/

    if(y - (ballHeight/2) +20 < 0 || y+ballHeight > gameWindow.height){
        dy *=-1;
    }

}

initGame();

document.addEventListener("keydown",keyPressedDonwn,false);
document.addEventListener("keyup",keyReleased,false);
pauseContinueButton.addEventListener("click", () =>{
    isPaused = false;
    pauseMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    requestAnimationFrame(update);
});