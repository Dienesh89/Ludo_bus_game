const slider = document.querySelector('.slider');

let slideIndex = 0;

function slide_next(){
  slideIndex++;
  if (slideIndex > slider.children.length - 1) {
    slideIndex = 0;
  }
  slider.style.transform = `translateX(-${slideIndex * 100}%)`;
}
