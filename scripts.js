// Menu hambúrguer para mobile
document.getElementById('hamburger').addEventListener('click', function() {
    const navbarLinks = document.querySelector('.navbar__links');
    navbarLinks.classList.toggle('active');
    this.classList.toggle('active');
});

// Tabs de habilidades
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        
        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Efeito de digitação no hero
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

// Inicia o efeito de digitação
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(type, newTextDelay + 250);
});

// Animação de partículas no hero
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

// Ajuste de habilidades principais
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

// Copiar e-mail
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

// Atualiza o ano no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar scroll behavior
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

// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Fecha o menu mobile se estiver aberto
        if (document.querySelector('.navbar__links').classList.contains('active')) {
            document.querySelector('.navbar__links').classList.remove('active');
            document.getElementById('hamburger').classList.remove('active');
        }
    });
});

// Carrossel de Certificados
const carousel = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.carousel-button.prev');
const nextBtn = document.querySelector('.carousel-button.next');
const certificateCards = document.querySelectorAll('.certificate-card');
const cardWidth = certificateCards[0].offsetWidth + 32; // Largura do card + gap

let currentPosition = 0;
let maxScroll = carousel.scrollWidth - carousel.offsetWidth;

// Atualiza a posição máxima quando a janela é redimensionada
window.addEventListener('resize', () => {
    maxScroll = carousel.scrollWidth - carousel.offsetWidth;
    updateButtons();
});

// Navegação para o próximo certificado
nextBtn.addEventListener('click', () => {
    currentPosition += cardWidth;
    if (currentPosition > maxScroll) {
        currentPosition = maxScroll;
    }
    carousel.scrollTo({
        left: currentPosition,
        behavior: 'smooth'
    });
    setTimeout(updateButtons, 300); // Espera a animação terminar
});

// Navegação para o certificado anterior
prevBtn.addEventListener('click', () => {
    currentPosition -= cardWidth;
    if (currentPosition < 0) {
        currentPosition = 0;
    }
    carousel.scrollTo({
        left: currentPosition,
        behavior: 'smooth'
    });
    setTimeout(updateButtons, 300); // Espera a animação terminar
});

// Atualiza o estado dos botões de navegação
function updateButtons() {
    const currentScroll = carousel.scrollLeft;
    
    if (currentScroll <= 0) {
        prevBtn.style.opacity = '0.5';
        prevBtn.style.cursor = 'not-allowed';
        prevBtn.disabled = true;
    } else {
        prevBtn.style.opacity = '0.8';
        prevBtn.style.cursor = 'pointer';
        prevBtn.disabled = false;
    }
    
    if (currentScroll >= maxScroll - 5) { // -5 para margem de erro
        nextBtn.style.opacity = '0.5';
        nextBtn.style.cursor = 'not-allowed';
        nextBtn.disabled = true;
    } else {
        nextBtn.style.opacity = '0.8';
        nextBtn.style.cursor = 'pointer';
        nextBtn.disabled = false;
    }
}

// Atualiza os botões quando o usuário arrasta o carrossel
carousel.addEventListener('scroll', () => {
    currentPosition = carousel.scrollLeft;
    updateButtons();
});

// Inicializa os botões
updateButtons();

// Tooltips da timeline
document.querySelectorAll('.period').forEach(period => {
    period.addEventListener('click', function() {
        // Fecha todos os outros tooltips
        document.querySelectorAll('.period-info').forEach(info => {
            if (info !== this.querySelector('.period-info')) {
                info.style.opacity = '0';
                info.style.visibility = 'hidden';
            }
        });
        
        // Alterna o tooltip atual
        const info = this.querySelector('.period-info');
        if (info.style.opacity === '1') {
            info.style.opacity = '0';
            info.style.visibility = 'hidden';
        } else {
            info.style.opacity = '1';
            info.style.visibility = 'visible';
            info.style.transform = 'translateX(-50%) translateY(10px)';
        }
    });
});

// Fechar tooltips ao clicar em qualquer lugar
document.addEventListener('click', function(e) {
    if (!e.target.closest('.period')) {
        document.querySelectorAll('.period-info').forEach(info => {
            info.style.opacity = '0';
            info.style.visibility = 'hidden';
        });
    }
});