const pad = document.querySelector(".pad");
const gameWindow = document.querySelector(".game");
const ball = document.querySelector(".ball");
const ctx = gameWindow.getContext('2d');


//TODO: Increase rock size, fix background, make a better website

//Parameter delcaration
let x = 300, y= 275, dx = 10, dy = 5; //ball
let recx = 0, recy = 740, recdx = 10, recWidth = 200, recHeight = 20; //paddle
let ballWidth = 24*1.5, ballHeight = 25*1.5;

//bricks
let bricks;
let nrows = 5;
let ncols = 29;
let brickWidth = (gameWindow.width / ncols) - 1;
let brickHeight = 15;
let padding = 5;
let activeBricks = 0;
//Move flags
let isMovingLeft = false, isMovingRight = false;

//sprites
const tear = new Image();
const rock = new Image();
let background = new Image();

tear.src = 'sprites/Troll_Bomb.png';
rock.src = 'sprites/Rock.png'
background.src = 'sprites/BasementRoom.png';

//sprite Values
let rockWidth = 24 *1.5;
let rockHeight = 25 * 1.5;


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

function initBricks(){
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
    ctx.rect(recx, recy, recWidth, recHeight);
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
    return (y-10 > gameWindow.height);
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
    if((x > recx && x < recx+recWidth) && (y + dy +(ballHeight/2) > recy-recHeight))
        dy *= -1;

    breakBricks();

    if(isWon())
        console.log("gg");

    x += dx;
    y += dy;
    
    /*if(isOutOfBounds()){
        cancelAnimationFrame(animationFrame);
        return;
    }*/

    animationFrame = requestAnimationFrame(update);
}

function initGame(){
    initBricks();
    requestAnimationFrame(update);
}

function drawSprite(){
    ctx.drawImage(tear,x ,y , 24*1.5, 25*1.5);
}

function drawBackground(){
    ctx.drawImage(background,0,0,gameWindow.width,gameWindow.height);
}


function moveSprite(){
    if(x+ballWidth> gameWindow.width || x-ballWidth < 0) 
        dx *= -1;
    
    /*if(y - 10 < 0){
        dy *=-1;
    }*/

    if(y - ballHeight < 0 || y+ballHeight > gameWindow.height){
        dy *=-1;
    }

}

initGame();

document.addEventListener("keydown",keyPressedDonwn,false);
document.addEventListener("keyup",keyReleased,false);