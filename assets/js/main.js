window.addEventListener('load', (e) => {
  
  // Define the loader element
  const loader = $('#loader');
  // Set opacity 0 to loader
  loader.style.opacity = '0';

  setTimeout(() => {
    loader.style.display = 'none';
  }, 300);

});


// Define links to open the modal window
const modalLinks = $('.works__link');

// deal with the page getting resized or scrolled
window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);

// Initialize the function for modals
modalInit();
// Initialize the funcition for scrolling
navScroll();

typingEffect();
///////////////// HERE FUNCTIONS ARE DEFINED ////////////////////////

// Function to add typing effect
function typingEffect() {

  const typedElements = document.querySelectorAll('[data-typed]');

  setTyped(typedElements[0], {
    strings: ['Deebov', 'Dilshod', 'Deebov'],
    typeSpeed: 80,
    backSpeed: 20,
    cursorChar: '_',
    backDelay: 3000,
    loop: true
  });

  setTyped(typedElements[1], {
    strings: ['Younger', 'Faster', 'Motivated'],
    typeSpeed: 40,
    backSpeed: 20,
    cursorChar: '_',
    backDelay: 3000,
    loop: true
  });
  setTyped(typedElements[2], {
    strings: ['Enthusiast', 'Responsible'],
    typeSpeed: 40,
    backSpeed: 20,
    cursorChar: '_',
    backDelay: 4000,
    loop: true
  }); 

}
// Function to scroll from navigation to the section
function navScroll() {
  const navLinks = $('.header__nav-link');
  for (let i = 0; i < navLinks.length; i++) {
    const link = navLinks[i];
    link.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Get Id of the element
      const targetId = link.getAttribute('href');
      // Get the element from its Id
      const target = $(targetId);
      // Get the position of the target
      const targetPos = getPosition(target);
      // Scroll to the target
      scrollFor(targetPos.x, targetPos.y);
      
    });
    
  }
}
// Initial function for modals
function modalInit() {
  // Define btn fot closing the modal
  const closeBtn = $('.modal__close');

  // Listen for close button
  for (let i = 0; i < closeBtn.length; i++) {
    const btn = closeBtn[i];
    
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const modal = this.parentElement.parentElement.parentElement;
      closeModal(modal);
  
    });
  }
  
  // Listen for open links
  for (let i = 0; i < modalLinks.length; i++) {
    const link = modalLinks[i];
    
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const currentModal = getModal(link);
      const modalContainer = currentModal.children[0];
      
      modalContainer.style.top = '50%';
      modalContainer.style.left = '50%';

      openModal(currentModal);
  
    });
  }
  
}

// Function to open the modal window
function openModal(modal) {
  
  const currentModal = modal;

  currentModal.classList.add('modal--active');

}

// Function to close the modal window
function closeModal(modal, x, y) {
  const currentModal = modal;
  const modalContainer = currentModal.children[0];
  const xPos = x || getPosition(currentModal.parentElement).x;
  const yPos = y || getPosition(currentModal.parentElement).y;

  currentModal.classList.remove('modal--active');

  setPositionModal(xPos, yPos, modalContainer);
}

// Function for selecting elements by Id and ClassName
function $ (selector) {
  const firstLetter = selector[0];
  const elem = selector.slice(1);

  switch (firstLetter) {
    case '#': 
      return document.getElementById(elem);
    case '.': 
      return document.getElementsByClassName(elem);
  }
};

// Function for selecting all siblings of a node
function getSiblings(n) {
  return [...n.parentElement.children].filter(c => c.nodeType == 1 && c!=n);
};

// Function to get a list of element classes
function getClassList(elem) {
  return elem.className.split(' ');
};

// Function to get parent of parent element
function getParentOfParent(children) {
  return children.parentElement.parentElement;
}

// Helper function to get an element's exact position
function getPosition(el) {
  let xPos = 0;
  let yPos = 0;
 
  while (el) {
    
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      let yScroll = el.scrollTop || document.documentElement.scrollTop;
      
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

// Function to update position of elements 
function updatePosition() {

  for (let i = 0; i < modalLinks.length; i++) {
    const currentLink = modalLinks[i];
    const modal = getModal(currentLink);

    if(!modal.classList.contains('modal--active')) {
      const modalContainer = modal.children[0];
      const xPos = getPosition(currentLink).x;
      const yPos = getPosition(currentLink).y;
      setPositionModal(xPos, yPos, modalContainer);
    }
  }


}

// Function to get the modal element from link
function getModal(link) {
  return getSiblings(link).filter((elem) => getClassList(elem).indexOf('modal')+1)[0];
}

// Function to set position to the element
function setPositionModal(x, y, modal) {
  const currentModal = modal;
  
  currentModal.style.top = y + 'px';
  currentModal.style.left = x + 'px';

}

// Function to scroll to the adjusted position
function scrollFor(x, y) {
  window.scrollTo({
    "behavior": "smooth",
    "top": y,
    "left": x || 0
  });
}

function setTyped(elem, options = {}) {
  const typed = new Typed(elem, options);
}