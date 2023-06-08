'use strict'

const cardsData = [
  {
    id: 1,
    cardAttributeName: 'jennifer',
    petName: 'Jennifer',
    petImgAddress: '../assets/imgs/cards/pets-jennifer.png',
  },
  {
    id: 2,
    cardAttributeName: 'sophia',
    petName: 'Sophia',
    petImgAddress: '../assets/imgs/cards/pets-sophia.png',
  },
  {
    id: 3,
    cardAttributeName: 'woody',
    petName: 'Woody',
    petImgAddress: '../assets/imgs/cards/pets-woody.png',
  },
  {
    id: 4,
    cardAttributeName: 'scarlett',
    petName: 'Scarlett',
    petImgAddress: '../assets/imgs/cards/pets-scarlet.png',
  },
  {
    id: 5,
    cardAttributeName: 'katrine',
    petName: 'Katrine',
    petImgAddress: '../assets/imgs/cards/pets-katrine.png',
  },
  {
    id: 6,
    cardAttributeName: 'timmy',
    petName: 'Timmy',
    petImgAddress: '../assets/imgs/cards/pets-timmy.png',
  },
  {
    id: 7,
    cardAttributeName: 'freddie',
    petName: 'Freddie',
    petImgAddress: '../assets/imgs/cards/pets-freddie.png',
  },
  {
    id: 8,
    cardAttributeName: 'charly',
    petName: 'Charly',
    petImgAddress: '../assets/imgs/cards/pets-charly.png',
  },
];

const cardQuantity = cardsData.length;

const leftPositionClassName = 'leftPosition';
const rightPositionClassName = 'rightPosition';

const sliderPagesContainer = document.getElementById('sliderPages');
const btnLeft = document.getElementById('sliderBtnLeft');
const btnRight = document.getElementById('sliderBtnRight');

const activePage = document.getElementById('activePage');
const leftPage = document.getElementById('leftPage');
const rightPage = document.getElementById('rightPage');

let lastClick = '';

let activePageItems = getItems();
let leftPageItems = getItems(activePageItems);
let rightPageItems = [...leftPageItems];

function getItems(exceptions = []) {
  const result = [];
  while (result.length < 3) {
    const randNum = Math.floor(1 + Math.random() * cardQuantity);
    if (!result.includes(randNum) && exceptions.find((it) => it.id === randNum) === undefined) {
      result.push(randNum);
    }
  }
  return result.map((it) => cardsData[it - 1]);
}

function setCardData(card, cardData) {
  card.id = `petCard${cardData.id}`;
  card.setAttribute('pet-card-name', cardData.cardAttributeName);
  card.querySelector('img').src = cardData.petImgAddress;
  card.querySelector('.petCardName').innerHTML = cardData.petName;
}

function generateSliderPagesContent() {
  activePage.querySelectorAll('.petCard').forEach((it, i) => {
    setCardData(it, activePageItems[i]);
  });
  leftPage.querySelectorAll('.petCard').forEach((it, i) => {
    setCardData(it, leftPageItems[i]);
  });
  rightPage.querySelectorAll('.petCard').forEach((it, i) => {
    setCardData(it, rightPageItems[i]);
  });
}

function setNewPagesItems() {
  if (lastClick === leftPositionClassName) {
    rightPageItems = [...activePageItems];
    activePageItems = [...leftPageItems];
    leftPageItems = getItems(activePageItems);
  } else if (lastClick === rightPositionClassName) {
    leftPageItems = [...activePageItems];
    activePageItems = [...rightPageItems];
    rightPageItems = getItems(activePageItems);
  }
}

function btnLeftClickEvent() {
  lastClick = leftPositionClassName;
  sliderPagesContainer.classList.add(leftPositionClassName);
  removeSliderControlsEvent();
}

function btnRightClickEvent() {
  lastClick = rightPositionClassName;
  sliderPagesContainer.classList.add(rightPositionClassName);
  removeSliderControlsEvent();
}

function removeSliderControlsEvent() {
  btnLeft.removeEventListener('click', btnLeftClickEvent);
  btnRight.removeEventListener('click', btnRightClickEvent);
}

function addSliderControlsEvent() {
  btnLeft.addEventListener('click', btnLeftClickEvent);
  btnRight.addEventListener('click', btnRightClickEvent);
}

sliderPagesContainer.addEventListener('transitionend', (e) => {
  const { currentTarget } = e;
  if (e.target !== currentTarget || e.propertyName !== 'transform') return;
  setNewPagesItems();
  generateSliderPagesContent();
  sliderPagesContainer.classList.remove(leftPositionClassName);
  sliderPagesContainer.classList.remove(rightPositionClassName);
  addSliderControlsEvent();
})

generateSliderPagesContent();
addSliderControlsEvent();