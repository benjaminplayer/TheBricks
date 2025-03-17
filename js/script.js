const pad = document.querySelector(".pad");
const gameWindow = document.querySelector(".game");
const ball = document.querySelector(".ball");
const ctx = gameWindow.getContext('2d');

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
drawCircle();
function drawPad(){
    ctx.beginPath();
    ctx.rect(0, 800-20, 100, 20);
    ctx.closePath();
    ctx.fill();
}

function drawCircle(){
    ctx.beginPath();
    ctx.arc(75, 75, 10, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
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