const pad = document.querySelector(".pad");
const gameWindow = document.querySelector(".game");
const ball = document.querySelector(".ball");
const ctx = gameWindow.getContext('2d');


//Parameter delcaration
let x = 300, y= 275, dx = 10, dy = 5; //ball
let recx = 0, recy = 780, recdx = 10, recWidth = 200, recHeight = 20; //paddle

//bricks
let bricks;
let nrows = 5;
let ncols = 5;
let brickWidth = (gameWindow.width / ncols) - 1;
let brickHeight = 15;
let padding = 1;
let activeBricks = 0;

//Move flags
let isMovingLeft = false, isMovingRight = false;

let animationFrame;


function keyPressedDonwn(e){
    
    if(e.keyCode === 65){
        isMovingRight = true;
    }

    if(e.keyCode === 68){
        isMovingLeft = true;
    }
    //a d: 65 68

}

function keyReleased(e){
    if(e.keyCode === 65){
        isMovingRight = false;
    }

    if(e.keyCode === 68){
        isMovingLeft = false;
    }
}

initBricks();
function initBricks(){
    bricks = new Array(nrows)
    for(let i = 0 ; i < bricks.length; i ++){
        bricks[i] = new Array(ncols)
        for(let j = 0; j < bricks[i].length; j++){
            bricks[i][j] = 1;
            activeBricks++;
        }
    }
    console.log(bricks);
}

function drawPad(){
    ctx.rect(recx, recy, recWidth, recHeight);
}

function drawBall(){
    ctx.arc(x, y, 10, 0, Math.PI*2, true);
}

function drawBricks(){
    for(let i = 0 ; i < bricks.length; i ++){
        for(let j = 0; j < bricks[i].length; j++)
            if(bricks[i][j] == 1)
                ctx.rect((j*(brickWidth + padding))+padding, (i*(brickHeight + padding))+padding, brickWidth, brickHeight);
    }
}

function movePad(){
    if((recx + recWidth < gameWindow.width) && isMovingLeft)
        recx += recdx
    
    if((recx + recdx > 0) && isMovingRight)
        recx -= recdx;

}

function moveBall(){
    console.log(animationFrame);
    if(x+5 > gameWindow.width || x-5 < 0) 
        dx *= -1;
    
    if(y - 10 < 0){
        dy *=-1;
    }

    /*if(y - 10 < 0 || y+5 > gameWindow.height){
        dy *=-1;
    }*/

}

function isWon(){
    return (activeBricks == 0) ? true : false;
}

function isOutOfBounds(){
    return (y-10 > gameWindow.height);
}

function breakBricks(){
    let rowheigth = brickHeight + padding;
    let colwidth = brickWidth + padding;
    let row = Math.floor(y/rowheigth);
    let col = Math.floor(x/colwidth);

    if (y < nrows * rowheigth && row >=0 && col >=0 && bricks[row][col]== 1){
        dy *=-1;
        bricks[row][col] = 0;
        activeBricks--;
        console.log(activeBricks);
    }
}

requestAnimationFrame(update);
function update(){
    ctx.reset();
    ctx.beginPath();

    drawBall();
    drawPad();
    drawBricks();

    ctx.closePath();
    ctx.fill();

    //movement
    movePad();
    moveBall();
    
    //paddle collison
    if((x > recx && x < recx+recWidth) && (y + dy - 10 > recy-recHeight))
        dy *= -1;

    breakBricks();

    if(isWon())
        console.log("gg");

    x += dx;
    y += dy;
    
    if(isOutOfBounds()){
        cancelAnimationFrame(animationFrame);
        return;
    }

    animationFrame = requestAnimationFrame(update);
}

document.addEventListener("keydown",keyPressedDonwn,false);
document.addEventListener("keyup",keyReleased,false);