function addColors(noOfPlayers){
    let p = document.getElementById('pcolor');
    for (let i = 0; i < noOfPlayers; i++) {
        let playerName = pnameArr[i]
        
        if (playerName == "") {
            playerName = `player ${i+1}`
        }
        
        p.innerHTML = p.innerHTML + `
        <label for="player${i+1}-color">${playerName}'s Color:</label>
		<input type="color" id="player${i+1}-color" name="player1-color">
        `
    }
    
    let nextBtn = document.createElement("input");
    nextBtn.type = "button";
    nextBtn.value = "Next";
    nextBtn.id = "next-button-color";
    nextBtn.setAttribute("onclick","colorArrAssign()")
    nextBtn.setAttribute("style", "float:right;")
    p.appendChild(nextBtn);
    p.innerHTML = p.innerHTML + `
    <div class="error" id="error-message"></div>
    `
}
function colorArrAssign(){
        const form = document.getElementById("pcolor")
		const playerColorInputs = document.querySelectorAll('input[type="color"]');
		const errorMessage = document.getElementById('error-message');


			// Get an array of the selected colors
			const selectedColors = Array.from(playerColorInputs).map((input) => input.value);

			// Check for duplicate colors
			const uniqueColors = new Set(selectedColors);
			if (uniqueColors.size !== selectedColors.length) {
				errorMessage.textContent = 'Error: Please select a unique color for each player.';
				return;
			}


			// Start the game
			pcolorArr = selectedColors
			errorMessage.textContent = '';
		
		document.body.innerHTML = `
		<header>
            <h1>Ludo Bus</h1>
        </header>
		`;
		addBusLoop()
		chanceFunc()
}