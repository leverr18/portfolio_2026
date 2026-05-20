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