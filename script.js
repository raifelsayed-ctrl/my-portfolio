const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-wrap nav');
menu?.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.textContent = open ? '✕' : '☰'; });
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = '☰'; }));
const progress = document.querySelector('.progress');
let scrollPending = false;
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;if(progress) progress.style.width=(max>0?scrollY/max*100:0)+'%';scrollPending=false;}
window.addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(updateProgress)}},{passive:true});updateProgress();
if(reduced){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}else{
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}})},{threshold:.10});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
if(window.matchMedia('(pointer:fine)').matches){
const glow=document.querySelector('.cursor-glow');let frame=0;
window.addEventListener('pointermove',e=>{if(frame)return;frame=requestAnimationFrame(()=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';glow.style.opacity='1';}frame=0;});},{passive:true});
document.querySelectorAll('.tilt').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(950px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateY(-3px)`;});card.addEventListener('pointerleave',()=>card.style.transform='');});
}}


// Detail-page screenshot lightbox
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const buttons = [...document.querySelectorAll('.screenshots-grid button')];
  const image = lightbox.querySelector('img');
  const counter = lightbox.querySelector('[data-count]');
  let active = 0;
  function showImage(index) {
    if (!buttons.length) return;
    active = (index + buttons.length) % buttons.length;
    const source = buttons[active].querySelector('img');
    image.src = source.currentSrc || source.src;
    image.alt = source.alt;
    counter.textContent = `${active + 1} / ${buttons.length}`;
  }
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    showImage(index);
    if (!lightbox.open) lightbox.showModal();
  }));
  lightbox.querySelector('[data-close]').addEventListener('click', () => lightbox.close());
  lightbox.querySelector('[data-prev]').addEventListener('click', () => showImage(active - 1));
  lightbox.querySelector('[data-next]').addEventListener('click', () => showImage(active + 1));
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') showImage(active - 1);
    if (event.key === 'ArrowRight') showImage(active + 1);
  });
}
