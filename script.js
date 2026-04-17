// Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => loader.classList.add('out'), 1800);
  }
});

// Cursor effect
const cd = document.getElementById('cur-d'),
      cr = document.getElementById('cur-r');

let mx = 0, my = 0, rx = 0, ry = 0;

window.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function ac() {
  cd.style.cssText = `left:${mx}px;top:${my}px`;
  rx += (mx - rx) * .13;
  ry += (my - ry) * .13;
  cr.style.cssText = `left:${rx}px;top:${ry}px`;
  requestAnimationFrame(ac);
})();

// Navbar scroll effect
const nav = document.getElementById('nav');

window.addEventListener('scroll', () =>
  nav.classList.toggle('up', scrollY > 50)
);

// Mobile navigation (Hamburger only)
const hbtn = document.getElementById('hbtn'),
      mnav = document.getElementById('mnav');

let open = false;

function tog() {
  open = !open;
  mnav.classList.toggle('on', open);

  const s = hbtn.querySelectorAll('span');

  s[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  s[1].style.opacity   = open ? 0 : 1;
  s[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
}

// Toggle on click
hbtn.addEventListener('click', tog);

// Close menu when clicking a link
mnav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    open = false;
    mnav.classList.remove('on');

    const s = hbtn.querySelectorAll('span');
    s[0].style.transform = '';
    s[1].style.opacity = 1;
    s[2].style.transform = '';
  })
);

// Scroll reveal animation
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('vis');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.rv, .rv2').forEach(el => obs.observe(el));

// ===== LAZY LOAD PRODUCTS IMAGES =====
const allImgContainers = document.querySelectorAll('.product-img');

function loadImage(container) {
  const img = container.querySelector('img');
  const src = container.getAttribute('data-src');

  if (!img || !src || img.src) return;

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

// إذا المتصفح يدعم IntersectionObserver
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '300px',
    threshold: 0
  });

  allImgContainers.forEach(c => observer.observe(c));

} else {
  // fallback (تحميل مباشر)
  allImgContainers.forEach(loadImage);
}
