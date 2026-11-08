const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-wrap nav');
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.textContent = open ? '✕' : '☰'; });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = '☰'; }));
const progress = document.querySelector('.progress');
let scrollPending = false;
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%';scrollPending=false;}
window.addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(updateProgress)}},{passive:true});updateProgress();
if(reduced){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}else{
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}})},{threshold:.10});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
if(window.matchMedia('(pointer:fine)').matches){
const glow=document.querySelector('.cursor-glow');let frame=0;
window.addEventListener('pointermove',e=>{if(frame)return;frame=requestAnimationFrame(()=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';glow.style.opacity='1';frame=0;});},{passive:true});
document.querySelectorAll('.tilt').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(950px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateY(-3px)`;});card.addEventListener('pointerleave',()=>card.style.transform='');});
}}
