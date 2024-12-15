let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 3;
function loadShow() {
  let stt = 0;
  items[active].style.transform = `none`;
  items[active].style.zIndex = 1;
  items[active].style.filter = 'none';
  items[active].style.opacity = 1;
  for (var i = active + 1; i < items.length; i++) {
    stt++;
    items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
    items[i].style.zIndex = -stt;
    items[i].style.filter = 'blur(5px)';
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
  stt = 0;
  for (var i = active - 1; i >= 0; i--) {
    stt++;
    items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
    items[i].style.zIndex = -stt;
    items[i].style.filter = 'blur(5px)';
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
}
loadShow();
next.onclick = function () {
  active = active + 1 < items.length ? active + 1 : active;
  loadShow();
}
prev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : active;
  loadShow();
}





// Função para rolar  para o topo
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Ocultar o botão 
window.onscroll = function () {
  var scrollTopBtn = document.getElementById('scrollTopBtn');
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
};


//email

document.getElementById('copiarEmail').addEventListener('click', function () {
  var email = 'lucasalves2180@gmail.com'; 
  navigator.clipboard.writeText(email).then(function () {
      alert('E-mail copiado: ' + email);
  }).catch(function (err) {
      console.error('Erro ao copiar o e-mail: ', err);
  });
});





function typeWriter(node, text, speed) {
  let i = 0;

  function type() {
      if (i < text.length) {
          if (text[i] === '<') {
              const tagEndIndex = text.indexOf('>', i);
              if (tagEndIndex !== -1) {
                  i = tagEndIndex + 1;
              }
          } else {
              node.innerHTML += text.charAt(i);
              i++;
          }

          setTimeout(type, speed);
      } 
  }

  type();
}

const typedTextElement = document.getElementById('typed-text');
const textToType = typedTextElement.innerHTML;
typedTextElement.innerHTML = '';
typeWriter(typedTextElement, textToType, 50);
