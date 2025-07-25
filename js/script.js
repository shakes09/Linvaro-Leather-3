/** ------------------------------
 * 1. HAMBURGER MENU
 --------------------------------- */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('header nav');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('active');
  });
}

/** ------------------------------
 * 2. HERO SLIDER FADE
 --------------------------------- */
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

if (slides.length) {
  showSlide(currentSlide);
  setInterval(nextSlide, 6000);
}

/** ------------------------------
 * 3. PRODUCT FILTERS
 --------------------------------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.dataset.category;

    productCards.forEach(card => {
      card.style.display =
        category === 'all' || card.dataset.category === category
          ? 'block'
          : 'none';
    });
  });
});

/** ------------------------------
 * 4. FOOTER NEWSLETTER FORM
 --------------------------------- */
const footerForm = document.getElementById('footer-newsletter-form');
const footerMsg = document.getElementById('footer-msg');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (footerForm && footerMsg) {
  footerForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = footerForm.querySelector('input[type="email"]').value.trim();

    if (emailRegex.test(email)) {
      footerMsg.textContent = 'Welcome to the family!';
      footerMsg.style.color = 'green';
      footerForm.reset();
    } else {
      footerMsg.textContent = 'Please enter a valid email.';
      footerMsg.style.color = 'red';
    }
  });
}

/** ------------------------------
 * 5. POPUP NEWSLETTER (Show EVERY time)
 --------------------------------- */
const popup = document.getElementById('subscribe-popup');
const popupForm = document.getElementById('popup-newsletter-form');
const popupMsg = document.getElementById('popup-msg');
const closePopup = document.querySelector('.close-popup');

if (popup) {
  setTimeout(() => {
    popup.classList.add('active');
  }, 1500);

  if (closePopup) {
    closePopup.addEventListener('click', () => {
      popup.classList.remove('active');
      if (popupMsg) popupMsg.textContent = '';
    });
  }

  if (popupForm && popupMsg) {
    popupForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = popupForm.querySelector('input[type="email"]').value.trim();

      if (emailRegex.test(email)) {
        popupMsg.textContent = 'You’re in!';
        popupMsg.style.color = 'green';
        popupForm.reset();

        setTimeout(() => {
          popup.classList.remove('active');
          popupMsg.textContent = '';
        }, 1000);
      } else {
        popupMsg.textContent = 'Invalid email.';
        popupMsg.style.color = 'red';
      }
    });
  }
}

/** ------------------------------
 * 6. PRODUCT SLIDER LOGIC
 --------------------------------- */
const sliderTrack = document.querySelector(".slider-track");
const leftBtn = document.querySelector(".slider-btn.left");
const rightBtn = document.querySelector(".slider-btn.right");

if (sliderTrack && leftBtn && rightBtn) {
  const scrollStep = 300;

  rightBtn.addEventListener("click", () => {
    sliderTrack.scrollBy({ left: scrollStep, behavior: 'smooth' });
  });

  leftBtn.addEventListener("click", () => {
    sliderTrack.scrollBy({ left: -scrollStep, behavior: 'smooth' });
  });
}

/** ------------------------------
 * 7. CART RENDERING
 --------------------------------- */
const cartContainer = document.getElementById('cartContainer');
const cartItems = []; // Placeholder - to be dynamically populated later

function renderCart() {
  if (!cartContainer) return;
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartItems.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.textContent = `${item.name} - R${item.price}`;
    cartContainer.appendChild(itemDiv);
  });
}

renderCart();

/** ------------------------------
 * 8. LOGIN / REGISTER FORM TOGGLING (NO Firebase)
 --------------------------------- */
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');

signUpButton?.addEventListener('click', function () {
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
});

signInButton?.addEventListener('click', function () {
  signInForm.style.display = "block";
  signUpForm.style.display = "none";
});

// Dummy login/signup buttons
document.getElementById("submitSignIn")?.addEventListener("click", function (e) {
  e.preventDefault();
  alert("Simulated Sign In Successful!");
});

document.getElementById("submitSignUp")?.addEventListener("click", function (e) {
  e.preventDefault();
  alert("Simulated Sign Up Successful!");
});
