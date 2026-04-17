// ===== 1. CUSTOM CURSOR =====
const curD = document.getElementById('cur-d');
const curR = document.getElementById('cur-r');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;

  curD.style.left = mx + 'px';
  curD.style.top  = my + 'px';
});

(function animCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;

  curR.style.left = rx + 'px';
  curR.style.top  = ry + 'px';

  requestAnimationFrame(animCursor);
})();


// ===== 2. MOBILE NAV (FIXED) =====
const hbtn = document.getElementById('hbtn');
const mnav = document.getElementById('mnav');

let open = false;

function toggleMenu() {
  open = !open;

  mnav.classList.toggle('on', open);

  const s = hbtn.querySelectorAll('span');

  s[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  s[1].style.opacity   = open ? 0 : 1;
  s[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
}

// زر الهامبرغر
hbtn.addEventListener('click', toggleMenu);

// إغلاق عند الضغط على رابط
mnav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    open = false;
    mnav.classList.remove('on');

    const s = hbtn.querySelectorAll('span');
    s[0].style.transform = '';
    s[1].style.opacity = 1;
    s[2].style.transform = '';
  });
});


// ===== 3. NAVBAR SCROLL =====
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('up', window.scrollY > 50);
}, { passive: true });


// ===== 4. LAZY LOAD IMAGES (OPTIMIZED) =====
const allImgContainers = document.querySelectorAll('.product-img');

function loadImage(container) {
  const img = container.querySelector('img');
  const src = container.getAttribute('data-src');

  if (!src || img.src) return;

  img.src = src;

  img.onload = () => {
    img.classList.add('loaded');
    container.classList.add('loaded');
  };

  img.onerror = () => {
    container.style.background = '#ddd';
    container.classList.add('loaded');
  };
}

// تحميل مسبق ذكي
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImage(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, {
  rootMargin: '300px 0px',
  threshold: 0
});

allImgContainers.forEach(c => observer.observe(c));'.rv, .rv2').forEach(el => obs.observe(el));
