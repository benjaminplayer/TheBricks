const pad = document.querySelector(".pad");
const gameWindow = document.querySelector(".game");
const ball = document.querySelector(".ball");
const ctx = gameWindow.getContext('2d');
const overlay = document.querySelector('.overlay');
const pauseMenu = document.querySelector('.pause');
const pauseContinueButton = pauseMenu.children[1];
const pauseExitButton = pauseMenu.children[2];
const heldCard = document.querySelector('.card');
const heartsContainer = document.querySelector('.hearts');
const gameOverScreen = document.querySelector('.gameOverScreen');
const gameOverReplay = document.querySelector('.replay');
const audioTag = document.querySelector('.main-theme');
const pickupAudio = document.querySelector('.pickup');
let hearts = Array.from(document.querySelectorAll('.heart'));
//TODO: make a better website, dodaj backgrounds, naredi da start when key pressed

//#region Parameter delcaration
let x = 500, y= 675, dx = 10, dy = 5; //ball
let recx, recy = 800-61, recdx = 10, recWidth = 256, recHeight = 20; //paddle
let ballWidth = 24*1.5, ballHeight = 25*1.5;
recx = (gameWindow.width/2) - recWidth/2;
let lives = 3;
//#endregion

//#region bricks
let bricks;
let nrows = 4;
let ncols;
let brickWidth = (gameWindow.width / ncols) - 1;
let brickHeight = 15;
let padding = 5;
let activeBricks = 0;
//#endregion

//#region Move flags
let isMovingLeft = false, isMovingRight = false, isPaused = false, lost = false;
//#endregion

//#region Sprites
const tear = new Image();
const rock = new Image();
const background = new Image();
const platform = new Image();
const tintedRock = new Image();

tear.src = 'sprites/Troll_Bomb64x64.png';
rock.src = 'sprites/Rock64x64.png'
background.src = 'sprites/Basement.png';
platform.src = 'sprites/platform.png';
tintedRock.src = 'sprites/TintedRock.png';
//#endregion

//#region sprite Values
let rockWidth = 64;
let rockHeight = 64;
//#endregion

let cards = [];
let cdy = 2;
let cardHeld = false;
//#region Randomness Values [%]
let tintedRockRandom = 10;
let loversRandom = 10;
let hierophantRandom = 20;
//#endregiondd

let isAudioPlaying = false;

let animationFrame;

function keyPressedDonwn(e){
    
    //console.log(e.keyCode);
    if(!isAudioPlaying){
        playAudio();
        isAudioPlaying = true;
    }

    if(e.keyCode === 65){
        isMovingRight = true;
    }

    if(e.keyCode === 68){
        isMovingLeft = true;
    }
    //a d: 65 68

    /*if(e.keyCode === 66)
        playAudio();*/

    if(e.keyCode == 80 || e.keyCode == 27){
        if(!isPaused && !lost)
            isPaused = true;
        else if(!lost){
            isPaused = false;
            pauseMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            requestAnimationFrame(update);
        }
    }

    if(e.keyCode == 67){
        addSoulHearts();
    }

    if(e.keyCode == 32 && cardHeld){
        useCard();
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
    //console.log(nrows);
    bricks = new Array(nrows)
    for(let i = 0 ; i < bricks.length; i ++){
        bricks[i] = new Array(ncols)
        for(let j = 0; j < bricks[i].length; j++){
            if(Math.floor(Math.random()*101) <= tintedRockRandom)
                bricks[i][j] = 2;
            else
                bricks[i][j] = 1;
            activeBricks++;
        }
    }

    console.log(bricks);
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
        for(let j = 0; j < bricks[i].length; j++){
            if(bricks[i][j] == 1){
                //ctx.rect((j*(rockWidth + padding))+padding, (i*(rockHeight + padding))+padding, rockWidth, rockHeight);
                ctx.drawImage(rock, (j*(rockWidth + padding))+padding, (i*(rockHeight + padding))+padding, rockWidth, rockHeight);
            }
            else if(bricks[i][j] == 2){
                ctx.drawImage(tintedRock, (j*(rockWidth + padding))+padding, (i*(rockHeight + padding))+padding, rockWidth, rockHeight);
            }
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

    if (y < nrows * rowheigth && row >=0 && col >=0 && bricks[row][col] >= 1){
        if(bricks[row][col] == 2){
            spawnCard(x, y);
        }
        
        dy *=-1;
        bricks[row][col] = 0;
        activeBricks--;
    }
}

function update(){
    if(isPaused){

        pauseMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        if(animationFrame)
            cancelAnimationFrame(animationFrame);
        
        return;

    }

    console.log("lives", lives);

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

    if(cards.length !=0){
        moveCard();
        collectCard();
    }

    if(isWon()){
        console.log("gg");
        cancelAnimationFrame(animationFrame);
        return;
    }

    x += dx;
    y += dy;
    
    if(isOutOfBounds()){
        console.log("OutOfBoundz:", lives);
        removeHealth();

        if(lives == 0){
            lost = true;
            gameOverScreen.classList.toggle("active");
            overlay.classList.toggle("active");
            audioTag.pause();
            audioTag.currentTime = 0;
            audioTag.children[0].src = `audio/19 Hereafter.mp3`;
            audioTag.load();
            playAudio();
            cancelAnimationFrame(animationFrame);
            return;
        }

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

function removeHealth(){
    console.log("Remove");
    console.log(hearts);
    for(let i = hearts.length - 1; i >=0; i--){
        if(hearts[i].classList.contains('soul')){
            if(hearts[i].classList.contains('half')){
                heartsContainer.removeChild(hearts[i]);
                lives--;
                hearts.splice(i,1);
                return;
            }

            hearts[i].src = "sprites/SoulHeartHalf.png";
            hearts[i].classList.add('half');
            lives--;
            return;

        }
        
        if(hearts[i].classList.contains('lost')) continue;

        hearts[i].src = 'sprites/GreyHeart.png';
        hearts[i].classList.add('lost');
        lives--;
        return;
    }

}

function gainHealth(){
    for(let i = 0; i < hearts.length; i++){
        if(hearts[i].classList.contains('lost')){
            hearts[i].classList.remove('lost');
            lives++;
            hearts[i].src = 'sprites/HeartCropped.png';
            break;
        }
    }
}

function addSoulHearts(){
    if (lives+2 > 19) return;
    let soulHeart = document.createElement('img');
    if(lives%2 == 0 && hearts[hearts.length-1].classList.contains('soul')){
        hearts[hearts.length-1].classList.remove('half');
        hearts[hearts.length-1].src = 'sprites/SoulHeart.png';
        soulHeart.src = 'sprites/SoulHeartHalf.png';
        soulHeart.classList.add('heart','soul','half');

    }else{
        soulHeart.src = 'sprites/SoulHeart.png';
        soulHeart.classList.add('heart','soul');
    }
    
    lives += 2;
    heartsContainer.append(soulHeart);
    hearts.push(soulHeart);
    console.log(hearts);

}

function spawnCard(entryX, entryY){
    let cardType;
    let random = Math.floor(Math.random()*101);
    console.log(random);
    const cardSprite = new Image;

    if(random <= loversRandom){
        cardSprite.src = 'sprites/VITheLovers.png';
        cardType = "lovers";
    }
    else if(random <= hierophantRandom){
        cardSprite.src = 'sprites/VTheHierophant.png';
        cardType = "hierophant";
    }else{
        /*cardSprite.src = 'sprites/XVITheTower.png';
        cardType = "tower";*/
        return;
    }

    let card = { //naredi nov object card, v katerega shrani vrednosti
        type: cardType,
        img: cardSprite,
        x: entryX,
        y: entryY,
        height: 64,
        width: 50
    };

    console.log("Spawned a card: ",card)

    cards.push(card); // karto doda v array aktivnih kart
}

function moveCard(){
    for (let card of cards) {
        card.y = card.y + cdy;
        ctx.drawImage(card.img, card.x ,card.y - cdy);
    }
}

function useCard(){
    let card = document.querySelector('.card');
    if(card.classList.contains('lovers')){
        if(!(lives < 2)) return;
        card.classList.remove('lovers');
        gainHealth();
        gainHealth();
    }
    else if(card.classList.contains('hierophant')){
        if(lives == 19) return;
        addSoulHearts();   
        addSoulHearts();   
    }
    else if(card.classList.contains('tower')){
        spawnBombs();
    }
    card.src = '';
    cardHeld = false;

}

function collectCard(){

    for(let i = cards.length -1 ; i >= 0; i--){
        let card = cards[i];

        if(!cardHeld && card.x < recx + recWidth && card.x + card.width > recx && card.y < recy + recHeight && card.y + card.height > recy){
            pickupAudio.play();
            cardHeld = true;
            heldCard.src = card.img.src;
            heldCard.classList.add(card.type);
            console.log("Collected a card!");
            cards.splice(i, 1); //odstrani pobrano karto
        }
    }

}

function despawnCard(){
    cards = cards.filter(card => card.y <= gameWindow.height); // filtrira vn vse karte, ki so offscreen
}

initGame();

function playAudio(){
    audioTag.loop = true;
    audioTag.volume = .4;
    audioTag.play().catch(err => {
        console.warn("Rejected:", err);
    });
}

//#region Event Listeners
document.addEventListener("keydown",keyPressedDonwn,false);
document.addEventListener("keyup",keyReleased,false);
pauseContinueButton.addEventListener("click", () =>{
    isPaused = false;
    pauseMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    requestAnimationFrame(update);
});

gameOverReplay.addEventListener("click", () =>{
    gameOverScreen.classList.toggle("active");
    lost = false;
    location.reload(); 
});
//#endregion