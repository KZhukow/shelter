'use strict'

const burgerBtn = document.querySelector('#burgerBtn');
const bodyContainer = document.querySelector('body');
const overlay = document.querySelector('#overlay');

const burgerMenuContainerId = 'burgerMenuContainer';

const burgerBtnAttributeName = 'is-menu-opened';
const bodyAttributeName = 'is-no-scroll';
const overlayAttributeName = 'is-opened';

function toggleOverlays() {
  bodyContainer.toggleAttribute(bodyAttributeName);
  overlay.toggleAttribute(overlayAttributeName);
}

function toggleMenuContainerAttribute() {
  document.getElementById(burgerMenuContainerId)
    .toggleAttribute(burgerBtnAttributeName);
}

function generateBurgerMenu() {
  const menuContainer = document.createElement('div');
  const menuLinks = document.querySelectorAll('.navMenu a');
  menuContainer.id = burgerMenuContainerId;
  menuContainer.className = burgerMenuContainerId;
  const linksContainer = document.createElement('div');
  linksContainer.className = 'burgerMenuLinksContainer';
  menuLinks.forEach((it) => {
    const linkElement = document.createElement('a');
    linkElement.textContent = it.innerHTML;
    linkElement.className = it.className;
    if (it.href !== '') {
      linkElement.setAttribute('href', it.getAttribute('href'));
    }
    linkElement.addEventListener('click', () => {
      const burgerMenuContainer = document.getElementById(burgerMenuContainerId);
      if (burgerMenuContainer.hasAttribute(burgerBtnAttributeName)) {
        closeBurgerMenu();
      }
    });
    linksContainer.appendChild(linkElement);
  });
  menuContainer.appendChild(linksContainer);

  menuContainer.addEventListener('transitionend', (e) => {
      const { target, currentTarget } = e;
      const isHasAttribute = currentTarget.hasAttribute(burgerBtnAttributeName);
      if (target !== currentTarget || isHasAttribute) return;
      removeBurgerMenu();
    },
  );

  bodyContainer.insertAdjacentElement('afterbegin', menuContainer);
  setTimeout(toggleMenuContainerAttribute);
}

function removeBurgerMenu() {
  const burgerMenuContainer = document.getElementById(burgerMenuContainerId);
  bodyContainer.removeChild(burgerMenuContainer);
}

function openBurgerMenu() {
  const burgerMenuContainer = document.getElementById(burgerMenuContainerId);
  if (burgerMenuContainer === null) {
    generateBurgerMenu();
  } else {
    toggleMenuContainerAttribute();
  }
  toggleOverlays();
}

function closeBurgerMenu() {
  toggleOverlays();
  toggleMenuContainerAttribute();
  burgerBtn.toggleAttribute(burgerBtnAttributeName);
}

function toggleBurgerMenuState() {
  const isMenuOpened = !burgerBtn.hasAttribute(burgerBtnAttributeName);
  if (isMenuOpened) {
    openBurgerMenu();
    burgerBtn.toggleAttribute(burgerBtnAttributeName);
  }
  if (!isMenuOpened) {
    closeBurgerMenu();
  }
}

burgerBtn.addEventListener('click', toggleBurgerMenuState);

overlay.addEventListener('click', () => {
  const menu = document.getElementById(burgerMenuContainerId);
  if (menu !== null && menu.hasAttribute(burgerBtnAttributeName)) {
    closeBurgerMenu();
  }
});

window
  .matchMedia('(min-width: 768px)')
  .addEventListener('change', (e) => {
    const menu = document.getElementById(burgerMenuContainerId);
    if (e.matches && menu !== null && menu.hasAttribute(burgerBtnAttributeName)) {
      closeBurgerMenu();
    }
});
