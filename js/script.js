const pad = document.querySelector(".pad");
const gameWindow = document.querySelector(".play-window");
const ball = document.querySelector(".ball");

// Ball properties:
let ballWidth = ball.clientWidth;
let ballHeight = ball.clientHeight;

//pad left margin
let padLeft = 0;

// ball margins
let ballTop = 0;
let ballLeft = 0;

// move flags
let isMovingRight = false;
let isMovingLeft = false;


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

requestAnimationFrame(movePad);
requestAnimationFrame(moveBall);

document.addEventListener("keydown",keyPressedDonwn,false);
document.addEventListener("keyup",keyReleased,false);