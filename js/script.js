const pad = document.querySelector(".pad");
const gameWindow = document.querySelector(".game");
const ball = document.querySelector(".ball");
const ctx = gameWindow.getContext('2d');

let x = 75, y= 75, dx = 10, dy = 5;
let recx = 100, recy = 20, recdx = 10;
function keyPressedDonwn(e){
    
    if(e.keyCode === 65 && padLeft-5 >= 0){
        isMovingRight = true;
    }

    if(e.keyCode === 68 && padLeft+105 <= gameWindow.clientWidth){
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

drawPad();
//drawCircle();

requestAnimationFrame(moveBall);

function drawPad(){
    ctx.beginPath();
    ctx.closePath();
    ctx.fill();
}

/*function drawCircle(){
    ctx.beginPath();
    ctx.arc(75, 75, 10, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}*/

function moveBall(){
    ctx.reset();
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2, true);
    ctx.rect(0, 800-20, recx, 20);
    ctx.closePath();
    ctx.fill();

    if(x+5 > gameWindow.width || x-5 < 0) 
        dx *= -1;
    if(y-5 < 0 || y+5 > gameWindow.height)
        dy *=-1;
    x += dx;
    y += dy;

    requestAnimationFrame(moveBall);
}

/*
function moveBall(){
    console.log("why?")
    if((ballTop +1) < gameWindow.clientWidth){
        ballTop +=1;
        ball.style.top = ballTop +"px";
    }
    requestAnimationFrame(moveBall);

}

function movePad(){

    if(isMovingLeft && padLeft+101 <= gameWindow.clientWidth){
        padLeft += 1;
        pad.style.left = padLeft + "px";
    }

    if(isMovingRight && padLeft-1 >=0){
        padLeft += -1;
        pad.style.left = padLeft +"px";
    }
    requestAnimationFrame(movePad)
}
*/
requestAnimationFrame(movePad);
requestAnimationFrame(moveBall);

document.addEventListener("keydown",keyPressedDonwn,false);
document.addEventListener("keyup",keyReleased,false);