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
const cardsIds = cardsData.map(({ id }) => id);

const desktopTypeName = 'desktop';
const tabletTypeName = 'tablet';
const mobileTypeName = 'mobile';

const cardQuantity = cardsData.length;
const totalCardsQuantity = 48;
const firstPageNumber = 1;

let currentScreenType = getInitScreenType();
let currentPageNumber = firstPageNumber;

const cardsOrder = getInitOrderCards();

const paginationContainer = document.getElementById('petsContainer');
const firstPageBtn = document.getElementById('firstPageBtn');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const lastPageBtn = document.getElementById('lastPageBtn');
const activePageElement = document.getElementById('activePage');

class ScreenInfo {
  constructor(screenName, firstPage, cardsOnPage) {
    this.screenName = screenName;
    this.firstPage = firstPage;
    this.cardsOnPage = cardsOnPage;
    this.lastPage = totalCardsQuantity / cardsOnPage;
    this.cardsOrder = getCardsPages(cardsOrder, firstPage, this.lastPage, cardsOnPage);
  }
}

const screenData = {
  desktop: new ScreenInfo(desktopTypeName, firstPageNumber, 8),
  tablet: new ScreenInfo(tabletTypeName, firstPageNumber, 6),
  mobile: new ScreenInfo(mobileTypeName, firstPageNumber, 3),
}

function getInitOrderCards() {
  const exceptions = [];
  while (exceptions.length < 4) {
    const randNum = Math.floor(1 + Math.random() * cardQuantity);
    if (!exceptions.includes(randNum)) {
      exceptions.push(randNum);
    }
  }
  const exceptions1 = exceptions.slice(0,2);
  const exceptions2 = exceptions.slice(2);
  const cardsWithoutExceptions1 = cardsIds.filter((val) => !exceptions1.includes(val));
  const cardsWithoutExceptions2 = cardsIds.filter((val) => !exceptions2.includes(val));

  const cardsSet1 = new Array(3).fill(null).map(() => {
    const result = [...cardsWithoutExceptions1].sort(() => 0.5 - Math.random());
    result.push(...exceptions1.reverse());
    return result;
  });

  const cardsSet2 = new Array(3).fill(null).map(() => {
    const result = [...cardsWithoutExceptions2].sort(() => 0.5 - Math.random());
    result.push(...exceptions2.reverse());
    return result;
  });
  return [...cardsSet1, ...cardsSet2].flat().map((it) => cardsData[it - 1]);
}

function getCardsPages(cardsOrder, minPage, maxPage, cardsOnPage) {
  const result = {};
  for (let i = minPage; i <= maxPage; i++) {
    result[i] = cardsOrder.slice((i - 1) * cardsOnPage, i * cardsOnPage);
  }
  return result;
}

function getInitScreenType() {
  const isDesktopScreen = window.matchMedia('(min-width: 1280px)').matches;
  const isTabletScreen = window.matchMedia('(min-width: 768px)').matches;
  if (isDesktopScreen) return desktopTypeName;
  if (isTabletScreen) return tabletTypeName;
  return mobileTypeName;
}

function onChangeScreenSize(e, screenTypeName) {
  if (!e.matches) return;
  currentScreenType = screenTypeName;
  if (currentPageNumber > screenData[currentScreenType].lastPage) {
    currentPageNumber = screenData[currentScreenType].lastPage
    activePageElement.innerHTML = currentPageNumber;
  }
  checkPaginationBtn();
  buildPaginationContent();
}

window.matchMedia('(min-width: 1280px)').addEventListener('change', (e) => {
  onChangeScreenSize(e, desktopTypeName);
});
window.matchMedia('(min-width: 768px) and (max-width: 1279.9px)').addEventListener('change', (e) => {
  onChangeScreenSize(e, tabletTypeName);
});
window.matchMedia('(min-width: 320px) and (max-width: 767.9px)').addEventListener('change', (e) => {
  onChangeScreenSize(e, mobileTypeName);
});

function generatePaginationContent(card) {
  paginationContainer.insertAdjacentHTML('beforeend', `
    <div class="petCard" pet-card-name="${card.cardAttributeName}" id="petCard${card.id}">
      <img
        src="${card.petImgAddress}"
        alt="sliderImg"
        class="petCardImg"
      >
      <div class="petCardName">
        ${card.petName}
      </div>
      <div class="btnSecondary btnTitle">
        Learn more
      </div>
    </div>
  `);
}

function buildPaginationContent() {
  paginationContainer.innerHTML = '';
  screenData[currentScreenType].cardsOrder[currentPageNumber].forEach(generatePaginationContent);
}

buildPaginationContent();

function checkPaginationBtn() {
  const { firstPage, lastPage } = screenData[currentScreenType];
  if (currentPageNumber > firstPage && currentPageNumber < lastPage) {
    [firstPageBtn, prevPageBtn, nextPageBtn, lastPageBtn].forEach((btn) => {
      btn.removeAttribute('disabled');
    });
  }
  if (currentPageNumber <= firstPage) {
    [firstPageBtn, prevPageBtn].forEach((btn) => { btn.setAttribute('disabled', ''); });
    [nextPageBtn, lastPageBtn].forEach((btn) => { btn.removeAttribute('disabled'); });
  }
  if (currentPageNumber >= lastPage) {
    [firstPageBtn, prevPageBtn].forEach((btn) => { btn.removeAttribute('disabled'); });
    [nextPageBtn, lastPageBtn].forEach((btn) => { btn.setAttribute('disabled', ''); });
  }
}

function changeCardContent(card, cardData) {
  card.id = `petCard${cardData.id}`;
  card.setAttribute('pet-card-name', cardData.cardAttributeName);
  card.querySelector('img').src = cardData.petImgAddress;
  card.querySelector('.petCardName').innerHTML = cardData.petName;
}

function changePaginationContent() {
  paginationContainer.querySelectorAll('.petCard')
    .forEach((card, i) => {
      changeCardContent(card, screenData[currentScreenType].cardsOrder[currentPageNumber][i]);
    });
  activePageElement.innerHTML = currentPageNumber;
}

function onPaginationBtnClick() {
  checkPaginationBtn();
  changePaginationContent();
}

firstPageBtn.addEventListener('click', () => {
  currentPageNumber = screenData[currentScreenType].firstPage;
  onPaginationBtnClick();
})
prevPageBtn.addEventListener('click', () => {
  currentPageNumber--;
  onPaginationBtnClick();
})
nextPageBtn.addEventListener('click', () => {
  currentPageNumber++;
  onPaginationBtnClick();
})
lastPageBtn.addEventListener('click', () => {
  currentPageNumber = screenData[currentScreenType].lastPage;
  onPaginationBtnClick();
})