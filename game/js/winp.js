let winRank = 1
const showWin = (playerId,pname)=>{
    let p = document.getElementById(playerId);
    p.outerHTML = `
    <div class="trophy-container">
        <div class="trophy">
            <div class="rank">
                <p>${winRank}</p>
                <p class="st">st</p>
            </div>
        </div>
    </div>
    <p class="neon">${pname}</p>
    `;
    winRank++;
}