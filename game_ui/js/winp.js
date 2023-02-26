let winRank = 1;
let rankSymbol = null;
const showWin = (playerId,pname)=>{
    
    if (winRank == 1) {
        rankSymbol = "st"
    }
    else if (winRank == 2){
        rankSymbol = "nd"
    }
    else if (winRank == 3){
        rankSymbol = "rd"
    }
    else if (winRank>3){
        rankSymbol = "th"
    }
    
    let p = document.getElementById(playerId);
    p.outerHTML = `
    <div class="trophy-container">
        <div class="trophy">
            <div class="rank">
                <p>${winRank}</p>
                <p class="st">${rankSymbol}</p>
            </div>
        </div>
    </div>
    <p class="neon">${pname}</p>
    `;
    winRank++;
}