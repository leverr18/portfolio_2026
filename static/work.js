const starsEl = document.getElementById('stars');
for (let i = 0; i < 60; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.animationDuration = (2 + Math.random() * 4) + 's';
  s.style.animationDelay = (Math.random() * 5) + 's';
  const sz = Math.random() > 0.7 ? '3px' : '2px';
  s.style.width = sz; s.style.height = sz;
  starsEl.appendChild(s);
}
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));
const track = document.querySelector('.slides-track');
if (track) {
  const slides = Array.from(track.querySelectorAll('.slide'));
  const dotsContainer = document.querySelector('.slide-dots');
  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(n) {
    current = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.slide-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  document.querySelector('.slide-prev').addEventListener('click', () => goTo(current - 1));
  document.querySelector('.slide-next').addEventListener('click', () => goTo(current + 1));

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });
}