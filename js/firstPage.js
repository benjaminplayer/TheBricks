const backBtn = document.querySelector('.backBtn');
const pageToggleBtns = document.querySelectorAll('.page-toggle');
const infoPaper = document.querySelector('.info-container');
const infoBtn = document.querySelector('.info');
const infoContent = document.querySelector('.info-content');


function toggleSiteChange(btn) {
    if (btn.classList.contains('lovers')) {
        infoContent.innerHTML = `<span>Cards</span>
                    <div class="cards lovers desc">
                    
                        <div>
                            <img src="sprites/VITheLovers.png" alt="THE LOVERS">
                        </div>
                        <div>
                            <div>The lovers</div>
                            <span>Heals 2 hearts if health is bellow 2</span>
                        </div>
                        `;

        pageToggleBtns[0].classList.replace(pageToggleBtns[0].classList[1], 'controlls');
        pageToggleBtns[0].innerHTML = ` <- CONTROLLS`;

        pageToggleBtns[1].classList.replace(pageToggleBtns[1].classList[1],'hierophant');
        pageToggleBtns[1].innerHTML = `CARDS ->`;
    }
    else if (btn.classList.contains('hierophant')) {
        infoContent.innerHTML = `
                <span>Cards</span>
                    <div class="cards lovers desc">
                                <div>
                        <img src="sprites/VTheHierophant.png" alt="VTheHierophant">
                    </div>
                    <div>
                        <div>The Hierophant</div>
                        <span>Gives the player 2 soul hearts, if max health is bellow 10 hearts</span>
                    </div>
                </div>`;

        pageToggleBtns[0].classList.replace(pageToggleBtns[0].classList[1],'lovers');
        pageToggleBtns[0].innerHTML = `<- CARDS`;
        pageToggleBtns[1].classList.replace(pageToggleBtns[1].classList[1],'rocks-normal');
        pageToggleBtns[1].innerHTML = `ROCKS ->`;

    }
    else if (btn.classList.contains('rocks-normal')) {
        infoContent.innerHTML = `<span>Rocks</span>
                <div class="rocks desc">
                    <div>
                        <img src="sprites/Rock64x64.png" alt="" srcset="">
                    </div>
                    <div>
                        <div>Normal rock</div>
                        <span>Break all the rocks to win the game</span>
                    </div>
                </div>`;

        pageToggleBtns[0].classList.replace(pageToggleBtns[0].classList[1],'hierophant');
        pageToggleBtns[0].innerHTML = `<- CARDS`;
        pageToggleBtns[1].classList.replace(pageToggleBtns[1].classList[1],'rocks-tinted');
        pageToggleBtns[1].innerHTML = `ROCKS ->`;
        
    }else if(btn.classList.contains('rocks-tinted')){
        infoContent.innerHTML = `
        <div class="rocks desc">            
            <div>
                <img src="sprites/TintedRock.png" alt="" srcset="">
            </div>
            <div>
                <div>Tinted rock</div>
                <span>Break the tinted rock to gain power cards</span>
            </div>
        </div>`;
        pageToggleBtns[0].classList.replace(pageToggleBtns[0].classList[1],'rocks-normal');
        pageToggleBtns[0].innerHTML = `<- ROCKS`;
        pageToggleBtns[1].classList.replace(pageToggleBtns[1].classList[1], 'controlls');
        pageToggleBtns[1].innerHTML = `CONTROLLS ->`;
    } 
    else if(btn.classList.contains('controlls')){
        infoContent.innerHTML = `                
            <div class="controlls">
                    <span>Controlls:</span>
                    <ul>
                        <li>A - LEFT</li>
                        <li>D - RIGHT</li>
                        <li>SPACE - USE</li>
                        <li>P/ESC - Pause</li>
                    </ul>
                </div>`;
        pageToggleBtns[0].classList.replace(pageToggleBtns[0].classList[1],'rocks-tinted');
        pageToggleBtns[0].innerHTML = `<- ROCKS`;
        pageToggleBtns[1].classList.replace(pageToggleBtns[1].classList[1],'lovers');
        pageToggleBtns[1].innerHTML = `CARDS ->`;
    }
}

pageToggleBtns.forEach(element => {
    element.addEventListener("click", (e) => {
        //console.log(e.target);
        toggleSiteChange(e.target);
    });
});

infoBtn.addEventListener("click", () => {
    infoPaper.classList.toggle('active');
});

backBtn.addEventListener("click", () => {
    infoPaper.classList.toggle('active');
});