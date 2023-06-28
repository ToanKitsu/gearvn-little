const account1 = {
  owner: 'Toàn Nguyen Ngoc',
  email: 'ngoc@gmail.com',
  pin: 1111,
};

const account2 = {
  owner: 'Vinh Vat Vo',
  email: 'vat@gmail.com',
  pin: 2222,
};

const account3 = {
  owner: 'Nam Nhi Nhanh',
  email: 'nam@gmail.com',
  pin: 3333,
};

const account4 = {
  owner: 'Tùng Nguyen Son',
  email: 'tng@gmail.com',
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

class Account {
  constructor(owner, email, pin) {
    this.owner = owner;
    this.email = email;
    this.pin = pin;
  }
}

const btnLoginOnModal = document.querySelector('.login-on-modal');
const loginUsername = document.querySelector('#login-username');
const loginPassword = document.querySelector('#login-password');
const displayUsername = document.querySelector('.display-username');
const displayLogout = document.querySelector('.display-logout');
const logoutImg = document.querySelector('.logout-img');

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

//////////////////////////////////////////////////////////////////////////////////////////
const barCheckbox = document.querySelector('.js-mobile__search-bar-icon');
const getSidebar = document.querySelector('.js-mobile-sidebar');
const getSidebarContainer = document.querySelector('.js-sidebar-container');

// Modal login - register
const regBtn = document.querySelector('.register-btn');
const logBtn = document.querySelector('.login-btn');
const regModal = document.querySelector('.register-modal');
const logModal = document.querySelector('.login-modal');
const closeBtns = document.querySelectorAll('.close');

const ownerInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const pinInput = document.querySelector('#password');
const registerBtnModal = document.querySelector('.register-btn-modal');

function showSidebar() {
  getSidebar.classList.add('open');
}
function hideSidebar() {
  getSidebar.classList.remove('open');
}

barCheckbox.addEventListener('click', showSidebar);
getSidebar.addEventListener('click', hideSidebar);
getSidebarContainer.addEventListener('click', function (event) {
  event.stopPropagation();
});

// Modal handler
let isLoggedIn = false;
regBtn.addEventListener('click', function (e) {
  e.preventDefault();
  regModal.classList.add('show');
});

let newAccount;
registerBtnModal.addEventListener('click', function (e) {
  // e.preventDefault();
  const owner = ownerInput.value;
  const email = emailInput.value.replaceAll(' ', '');
  if (pinInput.value === '') return;

  pin = +pinInput.value;
  e.preventDefault();
  regModal.classList.remove('show');

  newAccount = new Account(owner, email, pin);
  accounts.push(newAccount);
  createUsernames(accounts);
});

logBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (!isLoggedIn) {
    logModal.classList.add('show');
  }
  if (displayLogout.textContent === 'ĐĂNG XUẤT') {
    location.reload();
  }
});

closeBtns.forEach(function (cur, i) {
  closeBtns[i].onclick = function () {
    logModal.classList.remove('show');
    regModal.classList.remove('show');
  };
});
// ------------------------------------------------------------------------------------------------

let currentAccount;

btnLoginOnModal.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === loginUsername.value);
  console.log(currentAccount);
  if (currentAccount?.pin === Number(loginPassword.value)) {
    logModal.classList.remove('show');
    isLoggedIn = true;
    const name = currentAccount.owner.split(' ')[0];
    displayUsername.textContent = `Hi ${name}!`;
    displayUsername.style.fontSize = '1.3rem';
    displayLogout.textContent = 'ĐĂNG XUẤT';
    logoutImg.src = './assets/img/logout.webp';
  } else {
    alert('Incorrect username or password');
  }
});

// Slideshow
const slideShow = function () {
  const slides = document.querySelectorAll('.slide');
  const prevSlideBtn = document.querySelector('.prev');
  const nextSlideBtn = document.querySelector('.next');
  const dotContainer = document.querySelector('.dots');
  const maxSlides = slides.length;
  let currentSlide = 0;
  let autoSlideTimer;

  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${i * 100}%)`;
  });

  const goToSlide = function (currentSlide) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
    });
  };

  const createDots = function () {
    slides.forEach(function (slide, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(function (dot) {
      dot.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const nextSlide = function () {
    if (currentSlide === maxSlides - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlides - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const startAutoSlide = function () {
    autoSlideTimer = setInterval(function () {
      nextSlide();
    }, 5000);
  };

  const stopAutoSlide = function () {
    clearInterval(autoSlideTimer);
  };

  const init = function () {
    createDots();
    goToSlide(currentSlide);
    activeDot(currentSlide);
    startAutoSlide();
  };

  init();

  nextSlideBtn.addEventListener('click', function () {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  prevSlideBtn.addEventListener('click', function () {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activeDot(slide);
      stopAutoSlide();
      startAutoSlide();
    }
  });
};
slideShow();

const sliderHeightAuto = function () {
  const image = document.querySelector('.slide img');
  const slider = document.querySelector('.slider');

  // Update slider height initially
  slider.style.height = `${image.offsetHeight}px`;

  // Update slider height when image loads or resizes
  image.addEventListener('load', function () {
    slider.style.height = `${image.offsetHeight}px`;
  });

  window.addEventListener('resize', function () {
    slider.style.height = `${image.offsetHeight}px`;
  });
};

sliderHeightAuto();

// Sticky navbar
const bodyColNavbar = document.querySelector('.body-col-navbar');
const headerFixed = document.querySelector('.header__nav-fixed');
const headerFixedHeight = headerFixed.getBoundingClientRect().height;

const stickyNav = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    headerFixed.classList.add('sticky');
  } else {
    headerFixed.classList.remove('sticky');
  }
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerFixedHeight}px`,
};

const navObserver = new IntersectionObserver(stickyNav, obsOptions);
navObserver.observe(bodyColNavbar);
