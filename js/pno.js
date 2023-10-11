// pno = player number / number of players 
const options = document.querySelectorAll('.player-select-option');
const nextBtn = document.querySelector('.next-btn');

let selectedOption = null;

options.forEach(option => {
  option.addEventListener('click', () => {
    options.forEach(option => {
      option.classList.remove('selected');
    });
    option.classList.add('selected');
    selectedOption = option.dataset.value;
  });
});

nextBtn.addEventListener('click', () => {
    if (selectedOption == null) {
        alert("Please select number of players.")
    }else{
        pno = selectedOption;
        addNames(pno)
        slide_next()
    }
});
