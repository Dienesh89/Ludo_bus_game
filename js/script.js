let pno = undefined;

let pcolorArr = [] // player color Array
let pnameArr = [] // player name Array
let winPlayers = [] // this array will containd the number of players whoose are winned the game
let chance = 0 // represents the player chance

// in this code the id "dice-cont" is container of the roll dice button 

// game class
class game{
    addBus(name,color,pnum){ // pnum = player number
        body.innerHTML = body.innerHTML +
        `
        <div id="player${pnum}">
        <!-- bus -->
        <div class="bus" id="bus-p-${pnum}" style="background-color:${color};">
            <div class="windows">
                <div class="window"></div>
                <div class="window"></div>
                <div class="window"></div>
                <div class="window"></div>
                <div class="window"></div>
                <div class="window first-window"></div>
            </div>
            <div class="player-name">
                <i>${name}</i>
            </div>
            <div class="wheel wheel1">
                <div class="rim">•</div>
            </div>
            <div class="wheel wheel2">
                <div class="rim">•</div>
            </div>
        </div>
        <!-- bus end -->
        
        <!-- road -->
        <div class="road">
            <div class="mark-cont">
                <div class="mark"></div>
                <div class="mark"></div>
                <div class="mark"></div>
                <div class="mark"></div>
                <div class="mark"></div>
                <div class="mark"></div>
            </div>
        </div>
        <!-- road end -->
        
        <!-- player info -->
        <p class="info target">Target Distance => 100KM</p>
        <div style="display:flex;justify-content:center;">
            <p class="info current">Current Distance => <p id="current-p${pnum}">0</p>KM</p>
        </div>
        </div>
        `;
    }
    addBtn(color){
         let btn = document.getElementById("dice-cont");
         btn.innerHTML = `
                <div class="dice-btn" onclick="g.rollDice('${color}')">Roll dice</div>
            `;
    }
    rollDice(color){
        let rollDice = document.getElementById("rolldice")
        let diceVal = null;
        
        // Roll dice sound effect
        let audio = new Audio("https://dienesh89.github.io/Ludo_bus_game/assets/sounds/roll.mp3");
        audio.addEventListener("canplaythrough", function() {
            audio.volume = 1;
            audio.play();
        });
            
        
        if(rollDice == undefined) {
           rollDice = document.createElement("div")
           rollDice.setAttribute("id", "rolldice")
           document.body.appendChild(rollDice)
        }
        // Doing the buttons display:none; when dice is rolling
        let rollBtn = document.getElementById("dice-cont");
        rollBtn.style.display = "none";
       
        let rollDiceContainer = document.getElementById("rolldice")
       
        let fakeRols = setInterval(()=>{
            let diceNo = Math.floor(Math.random() * 6) + 1;
            rollDiceContainer.innerHTML = `
            <div class="dice-roll">
                  <img src="assets/dice/dice_${diceNo}.png">
            </div>
            `
            diceVal = diceNo;
        },250)
        
        setTimeout(()=>{
            clearInterval(fakeRols)
            
            let playerId = "current-p" + (chance);
           
            let playerDistance = document.getElementById(playerId);
            
            let targetScore = +playerDistance.innerHTML + diceVal // thie variable is also a part of score increase animation
            
            if (targetScore>100){
                chanceFunc()
                rollBtn.style.display = "block";
                rollBtn.scrollIntoView()
            }
            else{
                // running bus animation
                let pbus = document.getElementById(`bus-p-${chance}`);
                let header = document.querySelector("header")
                
                if (chance==1) {
                    header.scrollIntoView()
                }else{
    			    pbus.scrollIntoView()
                }
                
                // Bus sound effect
                let audio = new Audio("https://dienesh89.github.io/Ludo_bus_game/assets/sounds/bus_sound.wav");
                    audio.addEventListener("canplaythrough", function() {
                    audio.volume = 1;
                    audio.play();
                });
                
                let busPosPersentage = ((134/100)*targetScore); 
                let pbusCurrentPos = -40;
                pbus.style.left = +pbusCurrentPos + busPosPersentage + "%"
                
                // bus wheels animation
                let wheels = document.querySelectorAll(`#bus-p-${chance} .wheel`)
                
                wheels.forEach((wheel)=>{
                    wheel.classList.toggle("wheel-animation")
                    setTimeout(()=>{
                        wheel.classList.toggle("wheel-animation")
                    },2000)// 2 second beacuse the animation will run for 2 seconds
                })
                
                // animation of increasing score
                let scoreInterval = setInterval(scoreAnimation,20)
                let score = 0;
                let winpPushed = false;
                function scoreAnimation(){
                    if (score == targetScore) {
                        clearInterval(scoreInterval)
                    }
                    else{
                        if (targetScore == 100) {
                            //playerDistance.innerHTML = ++score;
                            if (winpPushed == false) {
                                winPlayers.push(chance);
                                winpPushed = true;
                                let root = document.querySelector(':root');
                                root.style.setProperty('--neon', pcolorArr[chance-1]);
                                showWin(`player${chance}`, pnameArr[chance-1])
                            }
                        }
                        playerDistance.innerHTML = ++score;
                    }
                }
                
             
                setTimeout(()=>{
                    chanceFunc();
                    rollBtn.style.display = "block";
                    rollBtn.scrollIntoView()
                },1000)// 2 second beacuse the parent timeout will run for 3 seconds
            }
        },2000)    
    }
}
let g = new game()

// adding busses
const addBusLoop = ()=>{
    for (let i = 0;i<pno;i++){
        let gbus = new game()
        gbus.addBus(pnameArr[i],pcolorArr[i],i+1)
    }
    return "This function finished";
}

// this function will run for the chance of every player
const chanceFunc = ()=>{
    // checking and creating the container element of btn
    let btnContainer = document.getElementById("dice-cont");
    if (btnContainer == null) {
        btnContainer = document.createElement("div")
        btnContainer.setAttribute("id","dice-cont")
        document.body.appendChild(btnContainer)
        setTimeout(()=>{
            btnContainer.scrollIntoView()
        },200)
    }
    // restarting the chances when chances of all players completed
    if (chance == pno) {
        chance = 0
    }
    chance++
    
    // skipping the chance of players who are winned the game
    for (let chanceForloop in winPlayers) {
        if (chance == winPlayers[chanceForloop]) {
            if (chance == pno) {
                chance = 1;
            }
            else{
                chance++;
            }
        }
    }
    
    // Ending the game of all playere are winned except 1 player
    if ((pno-winPlayers.length) == 1) {
        winPlayers.sort();
        for (let i = 1; i < pno+1; i++) {
            if (i == winPlayers[i-1]) {
                // console.log("i if",i)
                // document.getElementById(`player${i}`).remove()
            }
            else{
                if (i>pno) {}
                else{
                    document.getElementById(`player${i}`).remove()
                    document.getElementById("rolldice").remove();
                    document.getElementById("dice-cont").remove()
                }
            }
        }
        
        // document.body.innerHTML = "Game Finished"
    }
    else{
         // adding buttons
        let gbtn = new game()
        gbtn.addBtn(pcolorArr[chance-1])
    }
}