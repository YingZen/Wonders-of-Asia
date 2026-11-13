// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.onclick = () => navLinks.classList.toggle('open');
document.querySelectorAll('.nav-links a').forEach(link => {
    link.onclick = () => navLinks.classList.remove('open');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.onclick = function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            e.preventDefault();
            target.scrollIntoView({behavior: "smooth"});
        }
    }
});

// Carousel
const carouselImgs = document.querySelectorAll('.carousel-img');
let currSlide = 0;
setInterval(() => {
    carouselImgs[currSlide].classList.remove('active');
    currSlide = (currSlide + 1) % carouselImgs.length;
    carouselImgs[currSlide].classList.add('active');
}, 3000);

// Destination modal
const modal = document.getElementById('destinationModal');
const closeModal = document.getElementById('closeModal');
document.querySelectorAll('.destination-card').forEach(card => {
    card.onclick = () => {
        document.getElementById('modalTitle').textContent = card.dataset.title;
        document.getElementById('modalInfo').textContent = card.dataset.info;
        document.getElementById('modalImg').src = `images/${card.dataset.img}`;
        modal.style.display = 'flex';
    };
});
closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (e) => {
    if(e.target === modal) modal.style.display = 'none';
    if(e.target === stampModal) stampModal.style.display = 'none';
    if(e.target === loginModal) loginModal.style.display = 'none';
    if(e.target === signupModal) signupModal.style.display = 'none';
}

// Team card flip: handled by CSS

// Virtual Passport modal
const stampModal = document.getElementById('stampModal');
const closeStampModal = document.getElementById('closeStampModal');
document.querySelectorAll('.stamp').forEach(stamp => {
    stamp.onclick = () => {
        document.getElementById('stampTitle').textContent = stamp.dataset.title + " 🛂";
        document.getElementById('stampFact').textContent = stamp.dataset.fact;
        stampModal.style.display = 'flex';
    }
});
closeStampModal.onclick = () => stampModal.style.display = 'none';

// Contact Form Validation
document.getElementById('contactForm').onsubmit = function(e){
    e.preventDefault();
    let valid = true;
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';
    document.getElementById('formSuccess').textContent = '';

    if(!name) {
        document.getElementById('nameError').textContent = 'Name required';
        valid = false;
    }
    if(!email || !/\S+@\S+\.\S+/.test(email)){
        document.getElementById('emailError').textContent = 'Valid email required';
        valid = false;
    }
    if(!message || message.length < 6){
        document.getElementById('messageError').textContent = 'Message required (min 6 chars)';
        valid = false;
    }
    if(valid) {
        document.getElementById('formSuccess').textContent = "Thank you for contacting us!";
        this.reset();
    }
};

// Dark Mode
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.onclick = () => {
    document.body.classList.toggle('dark');
    darkModeToggle.textContent = document.body.classList.contains('dark') ? "☀️" : "🌙";
};

// Back to Top
const backToTop = document.getElementById('backToTop');
window.onscroll = () => {
    if(window.scrollY > 250) backToTop.style.display = "block";
    else backToTop.style.display = "none";
};
backToTop.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});

// Sign Up & Login (demo, with state)
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const closeLogin = document.getElementById('closeLogin');
const closeSignup = document.getElementById('closeSignup');
const openSignup = document.getElementById('openSignup');
const openLogin = document.getElementById('openLogin');
const doLogin = document.getElementById('doLogin');
const doSignup = document.getElementById('doSignup');
const loginError = document.getElementById('loginError');
const signupError = document.getElementById('signupError');
const userBtns = document.getElementById('userBtns');
const userWelcome = document.getElementById('userWelcome');

loginBtn.onclick = () => { loginModal.style.display = "flex"; }
signupBtn.onclick = () => { signupModal.style.display = "flex"; }
closeLogin.onclick = () => { loginModal.style.display = "none"; }
closeSignup.onclick = () => { signupModal.style.display = "none"; }
openSignup.onclick = () => { loginModal.style.display = "none"; signupModal.style.display = "flex"; }
openLogin.onclick = () => { signupModal.style.display = "none"; loginModal.style.display = "flex"; }

doSignup.onclick = () => {
    const user = document.getElementById('signupUser').value.trim();
    const pass = document.getElementById('signupPass').value.trim();
    signupError.textContent = "";
    if(user.length < 3 || pass.length < 3) {
        signupError.textContent = "Username and password must be at least 3 characters.";
        return;
    }
    localStorage.setItem('user', user);
    signupModal.style.display = "none";
    updateUserState();
}
doLogin.onclick = () => {
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value.trim();
    loginError.textContent = "";
    const regUser = localStorage.getItem('user');
    if(!regUser || user !== regUser || pass.length < 3) {
        loginError.textContent = "Incorrect credentials.";
        return;
    }
    loginModal.style.display = "none";
    updateUserState();
}
function updateUserState() {
    const user = localStorage.getItem('user');
    if(user){
        userBtns.style.display = "none";
        userWelcome.style.display = "block";
        userWelcome.innerHTML = `👋 Welcome, <b>${user}</b>! <button id="logoutBtn">Log out</button>`;
        document.getElementById('logoutBtn').onclick = () => {
            localStorage.removeItem('user');
            userBtns.style.display = "block";
            userWelcome.style.display = "none";
        }
    } else {
        userBtns.style.display = "block";
        userWelcome.style.display = "none";
    }
}
updateUserState();
