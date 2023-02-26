function addNames(noOfPlayer){
    let p = document.getElementById('pname');
    
    for (let i = 0; i < noOfPlayer; i++) {
        p.innerHTML = p.innerHTML + `
        <label for="form-name-${i+1}">Player ${i+1} :</label>
	    <input type="text" id="form-name-${i+1}" class="pnames" placeholder="Enter name">
        `
    }
    let nextBtn = document.createElement("input");
    nextBtn.type = "button";
    nextBtn.value = "Next";
    nextBtn.id = "next-button-name";
    nextBtn.setAttribute("onclick","nameArrPush()")
    p.appendChild(nextBtn);
}

function nameArrPush(){
    for (let i = 0; i < pno; i++) {
        let inputVal = document.getElementById(`form-name-${i+1}`).value;
        pnameArr.push(inputVal);
    }
    addColors(pno)
    slide_next()
}