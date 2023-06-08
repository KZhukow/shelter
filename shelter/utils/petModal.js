'use strict'

const petsData = {
  jennifer: {
    id: 1,
    name: "Jennifer",
    img: "../assets/imgs/cards/pets-jennifer.png",
    type: "Dog",
    breed: "Labrador",
    description: "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    age: "2 months",
    inoculations: ["none"],
    diseases: ["none"],
    parasites: ["none"]
  },
  sophia: {
    id: 2,
    name: "Sophia",
    img: "../assets/imgs/cards/pets-sophia.png",
    type: "Dog",
    breed: "Shih tzu",
    description: "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    age: "1 month",
    inoculations: ["parvovirus"],
    diseases: ["none"],
    parasites: ["none"]
  },
  woody: {
    id: 3,
    name: "Woody",
    img: "../assets/imgs/cards/pets-woody.png",
    type: "Dog",
    breed: "Golden Retriever",
    description: "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    age: "3 years 6 months",
    inoculations: ["adenovirus", "distemper"],
    diseases: ["right back leg mobility reduced"],
    parasites: ["none"]
  },
  scarlett: {
    id: 4,
    name: "Scarlett",
    img: "../assets/imgs/cards/pets-scarlet.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description: "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    age: "3 months",
    inoculations: ["parainfluenza"],
    diseases: ["none"],
    parasites: ["none"]
  },
  katrine: {
    id: 5,
    name: "Katrine",
    img: "../assets/imgs/cards/pets-katrine.png",
    type: "Cat",
    breed: "British Shorthair",
    description: "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    age: "6 months",
    inoculations: ["panleukopenia"],
    diseases: ["none"],
    parasites: ["none"]
  },
  timmy: {
    id: 6,
    name: "Timmy",
    img: "../assets/imgs/cards/pets-timmy.png",
    type: "Cat",
    breed: "British Shorthair",
    description: "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    age: "2 years 3 months",
    inoculations: ["calicivirus", "viral rhinotracheitis"],
    diseases: ["kidney stones"],
    parasites: ["none"]
  },
  freddie: {
    id: 7,
    name: "Freddie",
    img: "../assets/imgs/cards/pets-freddie.png",
    type: "Cat",
    breed: "British Shorthair",
    description: "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    age: "2 months",
    inoculations: ["rabies"],
    diseases: ["none"],
    parasites: ["none"]
  },
  charly: {
    id: 8,
    name: "Charly",
    img: "../assets/imgs/cards/pets-charly.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description: "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    age: "8 years",
    inoculations: ["bordetella bronchiseptica", "leptospirosis"],
    diseases: ["deafness", "blindness"],
    parasites: ["lice", "fleas"]
  }
}

const overlayModal = document.querySelector('#overlay');
const cardsContainer = document.querySelector('#petsContainer');
const bodyContainerModal = document.querySelector('body');

const petCardAttributeName = 'pet-card-name';
const bodyAttributeNameModal = 'is-no-scroll';
const overlayAttributeNameModal = 'is-opened';
const petModalContainerId = 'petModalContainer'

function toggleOverlaysModal() {
  bodyContainerModal.toggleAttribute(bodyAttributeNameModal);
  overlayModal.toggleAttribute(overlayAttributeNameModal);
}

function generateCard(card) {
  overlayModal.innerHTML = '';
  const cardContainer = document.createElement('div');
  cardContainer.className = petModalContainerId;
  cardContainer.id = petModalContainerId;
  cardContainer.innerHTML = `
    <img
    src="${card.img}"
    alt="petImg"
    class="petModalImg"
    >
    <div class="petModalContent">
      <div class="petModalTitleContainer">
        <h3 class="petModalTitle">${card.name}</h3>
        <h4 class="petModalSubtitle">${card.type} - ${card.breed}</h4>
      </div>
      <h5 class="petModalDescription">${card.description}</h5>
      <ul class="petModalParameters">
        <li class="petModalParameter">Age: <span>${card.age}</span></li>
        <li class="petModalParameter">Inoculations: <span>${card.inoculations.join(', ')}</span></li>
        <li class="petModalParameter">Diseases: <span>${card.diseases.join(', ')}</span></li>
        <li class="petModalParameter">Parasites: <span>${card.parasites.join(', ')}</span></li>
      </ul>
    </div>
  `;
  const crossBtn = document.createElement('div');
  crossBtn.className = 'roundBtn modalCrossBtn';
  crossBtn.innerHTML = '<img src="../assets/icon/modal-cross.png" alt="cross">';
  crossBtn.addEventListener('click', closeModal);
  cardContainer.appendChild(crossBtn);

  cardContainer.addEventListener('transitionend', (e) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    const isOverlayHasAttribute = overlayModal.hasAttribute(overlayAttributeNameModal);
    if (isOverlayHasAttribute) return;
    overlayModal.innerHTML = '';
  })

  overlayModal.appendChild(cardContainer);
}

function openModal(cardName) {
  generateCard(petsData[cardName]);
  setTimeout(toggleOverlaysModal);
}

function closeModal() {
  if (!overlayModal.hasAttribute(overlayAttributeNameModal)) return;
  toggleOverlaysModal();
}

function cardsContainerClickEvent(e) {
  const clickedCard = e.target.closest('.petCard');
  if (clickedCard === null || overlayModal.hasAttribute(overlayAttributeNameModal)) return;
  const cardName = clickedCard.getAttribute(petCardAttributeName);
  openModal(cardName);
}

cardsContainer.addEventListener('click', cardsContainerClickEvent);

overlayModal.addEventListener('click', (e) => {
  if (e.target !== e.currentTarget) return;
  const petModal = document.getElementById(petModalContainerId);
  if (petModal !== null) {
    closeModal();
  }
});
