document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const navbarLinks = document.querySelector('.navbar__links');
            if (navbarLinks) {
                navbarLinks.classList.toggle('active');
                this.classList.toggle('active');
            }
        });
    }

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;

            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    if (typedTextSpan && cursorSpan) {
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

        setTimeout(type, newTextDelay + 250);
    }

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.9';
        heroSection.prepend(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = heroSection.offsetHeight;

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
    }

    function adjustCoreSkills() {
        const container = document.querySelector('.core-skills-list');
        if (container) {
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
    }

    window.addEventListener('load', adjustCoreSkills);
    window.addEventListener('resize', adjustCoreSkills);

    const copyBtn = document.getElementById('copy-btn');
    const emailText = document.getElementById('email-text');
    const toast = document.getElementById('toast');

    if (copyBtn && emailText && toast) {
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
    }

    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');

    if (navbar && backToTop) {
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
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });

                const navbarLinks = document.querySelector('.navbar__links');
                const hamburger = document.getElementById('hamburger');
                if (navbarLinks && hamburger && navbarLinks.classList.contains('active')) {
                    navbarLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    const carousel = document.querySelector('.carousel-container');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');

    if (carousel && prevBtn && nextBtn) {
        const certificateCards = document.querySelectorAll('.certificate-card');
        const cardWidth = certificateCards[0].offsetWidth + 32;

        let currentPosition = 0;
        let maxScroll = carousel.scrollWidth - carousel.offsetWidth;

        window.addEventListener('resize', () => {
            maxScroll = carousel.scrollWidth - carousel.offsetWidth;
            updateButtons();
        });

        nextBtn.addEventListener('click', () => {
            currentPosition += cardWidth;
            if (currentPosition > maxScroll) {
                currentPosition = maxScroll;
            }
            carousel.scrollTo({
                left: currentPosition,
                behavior: 'smooth'
            });
            setTimeout(updateButtons, 300);
        });

        prevBtn.addEventListener('click', () => {
            currentPosition -= cardWidth;
            if (currentPosition < 0) {
                currentPosition = 0;
            }
            carousel.scrollTo({
                left: currentPosition,
                behavior: 'smooth'
            });
            setTimeout(updateButtons, 300);
        });

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
            
            if (currentScroll >= maxScroll - 5) {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.cursor = 'not-allowed';
                nextBtn.disabled = true;
            } else {
                nextBtn.style.opacity = '0.8';
                nextBtn.style.cursor = 'pointer';
                nextBtn.disabled = false;
            }
        }

        carousel.addEventListener('scroll', () => {
            currentPosition = carousel.scrollLeft;
            updateButtons();
        });

        updateButtons();
    }

    const certificateModal = document.getElementById('certificateModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalPlatform = document.getElementById('modalPlatform');
    const modalLearnings = document.getElementById('modalLearnings');

    const certificatesData = {
        'certificado-redhat': {
            title: 'Red Hat System Linux Administration',
            date: '12/10/2023',
            platform: 'Red Hat Education',
            learnings: [
                'Gerenciamento de usuários e grupos;',
                'Comandos para arquivos e diretórios;',
                'Execução de scripts e comandos Bash;',
                'Instalação e remoção de pacotes;',
                'Controle de serviços com systemd.'
            ]
        },
        'certificado-java': {
            title: 'Java Completo: do Zero ao Profissional + Projetos',
            date: '10/05/2025',
            platform: 'Udemy',
            learnings: [
                'Sintaxe básica e estruturas de controle;',
                'POO com classes e interfaces;',
                'Manipulação de listas, arrays e coleções;',
                'Tratamento de exceções e fluxo de erros;',
                'Acesso a banco de dados com JDBC.'
            ]
        },
        'certificado-swift': {
            title: 'Algoritmos e Programação Orientada a Objetos com Swift',
            date: '25/11/2024',
            platform: 'Instituto Eldorado',
            learnings: [
                'Sintaxe básica e tipos de dados em Swift;',
                'Criação de classes, structs e enums;',
                'Propriedades e métodos em objetos;',
                'Pilares da orientação a objetos;',
                'Uso de protocolos e opcionais.'
            ]
        }
    };

    document.querySelectorAll('.certificate-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const certId = link.getAttribute('data-certificate');
        const certData = certificatesData[certId];
        
        if (certData) {
            const certImg = document.querySelector(`img.certificate-img[alt="${certId}"]`);
            if (certImg) {
                modalImage.src = certImg.src;
                console.log('Imagem encontrada:', certImg.src);
            } else {
                console.error('Imagem não encontrada para o certificado:', certId);
            }
            
            modalTitle.textContent = certData.title;
            modalDate.textContent = `Data de emissão: ${certData.date}`;
            modalPlatform.textContent = `Plataforma: ${certData.platform}`;
            
            modalLearnings.innerHTML = '';
            certData.learnings.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                modalLearnings.appendChild(li);
            });
            
            certificateModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

    if (modalClose && certificateModal) {
        modalClose.addEventListener('click', () => {
            certificateModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        certificateModal.addEventListener('click', (e) => {
            if (e.target === certificateModal) {
                certificateModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    document.querySelectorAll('.period').forEach(period => {
        period.addEventListener('click', function() {
            document.querySelectorAll('.period-info').forEach(info => {
                if (info !== this.querySelector('.period-info')) {
                    info.style.opacity = '0';
                    info.style.visibility = 'hidden';
                }
            });

            const info = this.querySelector('.period-info');
            if (info) {
                if (info.style.opacity === '1') {
                    info.style.opacity = '0';
                    info.style.visibility = 'hidden';
                } else {
                    info.style.opacity = '1';
                    info.style.visibility = 'visible';
                    info.style.transform = 'translateX(-50%) translateY(10px)';
                }
            }
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.period')) {
            document.querySelectorAll('.period-info').forEach(info => {
                info.style.opacity = '0';
                info.style.visibility = 'hidden';
            });
        }
    });
});