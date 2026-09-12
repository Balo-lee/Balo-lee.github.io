// ===============
// MOBILE MENU
// ===============

const menuToggle = 
document.getElementById("menu-toggle");
const closeMenuButton = 
document.getElementById("close-menu");
const mobileMenu = 
document.getElementById("mobile-menu");
const mobileOverlay = 
document.getElementById("mobile-overlay");
const mobileLinks = 
document.querySelectorAll(".mobile-link");
const body = 
document.body;

function openMenu() {
    mobileMenu.classList.add("open");
    mobileOverlay.classList.add("show");
    body.classList.add("menu-open");
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
    mobileMenu.classList.remove("open");
    mobileOverlay.classList.remove("show");
    body.classList.remove("menu-open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () =>{
    const isExpanded = 
    
    menuToggle.getAttribute("aria-expanded") === "true";
    if(isExpanded) {
        closeMenu();
    }else {
        openMenu();
    }
});

closeMenuButton.addEventListener("click", closeMenu);

mobileOverlay.addEventListener("click", closeMenu);

mobileLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

//Active navigation on scroll

const sections = 
document.querySelectorAll("main section[id]");
const desktopNavLinks = 
document.querySelectorAll(".nav-link");
const drawerNavLinks = 
document.querySelectorAll(".mobile-link");

function updateActiveNav() {
    let currentSectionId = "";
    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 120;
        if(window.scrollY >= sectionTop) {
            currentSectionId = section.getAttribute("id");
        }
    });
    
    [desktopNavLinks, drawerNavLinks].forEach(function (linkGroup){
    
        linkGroup.forEach(function (link) {
            link.classList.remove("active");
            if(link.getAttribute("href") === "#" + currentSectionId) {
                link.classList.add("active");
            }
        });
    });
}
window.addEventListener("scroll", updateActiveNav);

// DARK THEME 
const themeToggle = 
document.getElementById("theme-toggle");
const themeIcon = 
themeToggle.querySelector("i");

function toggleTheme() {
    document.body.classList.toggle("light-theme");
    
    const isLight = 
document.body.classList.contains("light-theme");

    if(isLight) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "light");
    }else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "dark");
    }
}

themeToggle.addEventListener("click", toggleTheme);

const savedTheme = 
localStorage.getItem("theme");

if(savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeIcon.classList.replace("fa-moon", "fa-sun");
}

//BACK TO TOP BUTTON
const backToTop = 
document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if(window.scrollY > 500) {
        backToTop.classList.add("show");
    }else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior:"smooth"
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");
        observer.unobserve(entry.target);
    });
}, {
    threshold: 0.2
});

revealElements.forEach((element) => {
    revealObserver.observe(element);
});
//skill card
const revealCards = 
document.querySelectorAll(".reveal-card");

const cardObserver = new
IntersectionObserver ((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        
        const delay = 
        entry.target.dataset.delay || 0;
        setTimeout(() => {
            entry.target.classList.add("show");
        }, delay);
        observer.unobserve(entry.target);
    });
}, {
   threshold: 0.2
});

revealCards.forEach((card) => {
    cardObserver.observe(card);
});
//projects
const projectCards = document.querySelectorAll(
    ".reveal-project-left, .reveal-project-right"
);

const projectObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");
        observer.unobserve(entry.target);
    });
}, {
    threshold: 0.2
});

projectCards.forEach((card) => {
    projectObserver.observe(card);
});

// Hero terminal typing effect
const terminalCode = document.getElementById("terminal-code");

if (terminalCode) {
    const lines = [
        "const developer = {",
        "  name: 'Muhibbullah Balogun',",
        "  role: 'Aspiring Software Engineer',",
        "  learning: 'JavaScript',",
        "  status: 'Open to opportunities'",
        "};"
    ];

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
        terminalCode.textContent = lines.join("\n");
    } else {
        let lineIndex = 0;
        let charIndex = 0;

        function typeNextChar() {
            if (lineIndex >= lines.length) return;

            const currentLine = lines[lineIndex];

            if (charIndex < currentLine.length) {
                terminalCode.textContent += currentLine[charIndex];
                charIndex++;
                setTimeout(typeNextChar, 25);
            } else {
                terminalCode.textContent += "\n";
                lineIndex++;
                charIndex = 0;
                setTimeout(typeNextChar, 150);
            }
        }

        setTimeout(typeNextChar, 500);
    }
}

// Animate skill proficiency bars on reveal
document.querySelectorAll(".skill-card").forEach((card) => {
    const fill = card.querySelector(".proficiency-fill");
    if (fill) {
        fill.style.setProperty("--fill-width", fill.style.width);
        fill.style.removeProperty("width");
    }
});

const proficiencyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
    });
}, { threshold: 0.3 });

document.querySelectorAll(".skill-card").forEach((card) => {
    proficiencyObserver.observe(card);
});

// Contact form validation
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const formSuccess = document.getElementById("form-success");

    function showError(input, errorId, message) {
        input.classList.add("invalid");
        document.getElementById(errorId).textContent = message;
    }

    function clearError(input, errorId) {
        input.classList.remove("invalid");
        document.getElementById(errorId).textContent = "";
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = true;

        if (nameInput.value.trim() === "") {
            showError(nameInput, "name-error", "Please enter your name.");
            isValid = false;
        } else {
            clearError(nameInput, "name-error");
        }

        if (emailInput.value.trim() === "") {
            showError(emailInput, "email-error", "Please enter your email.");
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, "email-error", "Please enter a valid email address.");
            isValid = false;
        } else {
            clearError(emailInput, "email-error");
        }

        if (messageInput.value.trim() === "") {
            showError(messageInput, "message-error", "Please write a message.");
            isValid = false;
        } else {
            clearError(messageInput, "message-error");
        }

        if (!isValid) return;

        // Placeholder success — will be replaced once backend is connected
        formSuccess.classList.add("show");
        contactForm.reset();

        setTimeout(() => {
            formSuccess.classList.remove("show");
        }, 5000);
    });

    // Clear error as user types
    [nameInput, emailInput, messageInput].forEach((input) => {
        input.addEventListener("input", () => {
            input.classList.remove("invalid");
        });
    });
}
