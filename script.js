// Each project has its own independent image gallery.
document.querySelectorAll('.project-gallery').forEach(gallery => {
  const images = [...gallery.querySelectorAll('.gallery-image')];
  const counter = gallery.querySelector('.gallery-counter');
  let current = 0;

  function showImage(nextIndex) {
    images[current].classList.remove('active');
    current = (nextIndex + images.length) % images.length;
    images[current].classList.add('active');
    counter.textContent = `${current + 1} / ${images.length}`;
  }

  gallery.querySelector('.previous').addEventListener('click', () => showImage(current - 1));
  gallery.querySelector('.next').addEventListener('click', () => showImage(current + 1));
});

// Reveal sections gently as the visitor scrolls.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}
