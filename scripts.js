document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Java", "Spring Boot", "APIs REST", "PostgreSQL", "Backend"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex>=textArray.length) textArrayIndex=0;
        setTimeout(type, typingDelay + 1100);
    }
}

// Particulas.js - Cria um efeito dinâmico sutil
const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';
canvas.style.opacity = '0.9';
document.querySelector('.hero').prepend(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = document.querySelector('.hero').offsetHeight;

const particles = Array.from({length: 100}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 4 + 2,
    speed: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? 'rgba(106,17,203,0.9)' : 'rgba(37,117,252,0.9)'
}));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.y += p.speed;
        if (p.y > canvas.height) p.y = 0;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(type, newTextDelay + 250);
});

function adjustCoreSkills() {
    const container = document.querySelector('.core-skills-list');
    const items = document.querySelectorAll('.core-skill-item');
    const containerWidth = container.offsetWidth;
    let totalWidth = 0;
    
    items.forEach(item => {
        totalWidth += item.offsetWidth + 16;
    });
    
    if (totalWidth > containerWidth) {
        container.style.justifyContent = 'flex-start';
    } else {
        container.style.justifyContent = 'center';
    }
}

window.addEventListener('load', adjustCoreSkills);
window.addEventListener('resize', adjustCoreSkills);

const copyBtn = document.getElementById('copy-btn');
const emailText = document.getElementById('email-text');
const toast = document.getElementById('toast');

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText.textContent)
        .then(() => {
            toast.classList.add('active');

            setTimeout(() => {
                toast.classList.remove('active');
            }, 3000);
        })
        .catch(err => {
            console.error('Erro ao copiar: ', err);
            alert('Não foi possível copiar o e-mail automaticamente. Por favor, copie manualmente.');
        });
});

toast.addEventListener('click', () => {
    toast.classList.remove('active');
});

document.getElementById('year').textContent = new Date().getFullYear();

let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'transform 0.3s ease-out';
    } else if (currentScroll > lastScroll && !document.querySelector('.navbar__links').classList.contains('active')) {
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease-out';
    } else if (currentScroll < lastScroll) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'transform 0.3s ease-out';
    }
    
    lastScroll = currentScroll;

    if (currentScroll > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById('hamburger').addEventListener('click', function() {
    const navbarLinks = document.querySelector('.navbar__links');
    navbarLinks.classList.toggle('active');
});

