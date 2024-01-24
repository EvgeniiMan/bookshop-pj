import slide1 from "../imgs/slider/slide1.jpg";
import slide2 from "../imgs/slider/slide2.jpg";
import slide3 from "../imgs/slider/slide3.jpg";

const image = document.querySelector(".slider__img");
const bottomMenu = document.querySelector(".slider__bottom-menu");

const START_INDEX = 0;
const AUTOPLAY_INTERVAL = 5000;

let bottomMenuElements = [];
let currentIndex = START_INDEX;

const images = [
  {
    urls: slide1,
    alt: "Black Friday sale",
  },
  {
    urls: slide2,
    alt: "top 10 books for enterpreneurs",
  },
  {
    urls: slide3,
    alt: "Check out our cosy books collection",
  },
];

const loadElements = function () {
  //отрисовка bottomMenu
  let button;
  for (let i = 0; i < images.length; i++) {
    button = document.createElement("button");
    button.classList.add("slider__bottom-menu_el");
    if (i === START_INDEX) {
      button.classList.add("slider__bottom-menu_el_active");
    }
    button.dataset.number = i;

    bottomMenuElements.push(button);
    bottomMenu.appendChild(button);
  }

  for (let el of bottomMenuElements) {
    el.addEventListener("click", () => changeImage(+el.dataset.number));
  }

  //отрисовка изображения
  image.src = `${images[START_INDEX].urls}`;
  image.alt = `${images[START_INDEX].alt}`;

  initAutoplay();
};

loadElements();

function changeImage(number) {
  currentIndex = number;

  image.src = `${images[number].urls}`;
  image.alt = `${images[number].alt}`;

  for (let el of bottomMenuElements) {
    el.classList.remove("slider__bottom-menu_el_active");
  }
  bottomMenuElements[number].classList.add("slider__bottom-menu_el_active");
}

function initAutoplay() {
  setInterval(() => {
    let currentNum = currentIndex;
    let nextNum = currentNum === images.length - 1 ? 0 : currentNum + 1;

    changeImage(nextNum);
  }, AUTOPLAY_INTERVAL);
}
