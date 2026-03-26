window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('out'),1800));
const cd=document.getElementById('cur-d'),cr=document.getElementById('cur-r');
let mx=0,my=0,rx=0,ry=0;
window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function ac(){cd.style.cssText=`left:${mx}px;top:${my}px`;rx+=(mx-rx)*.13;ry+=(my-ry)*.13;cr.style.cssText=`left:${rx}px;top:${ry}px`;requestAnimationFrame(ac)})();
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('up',scrollY>50));
const hbtn=document.getElementById('hbtn'),mnav=document.getElementById('mnav'),mx2=document.getElementById('mnav-x');
let open=false;
function tog(v){open=v;mnav.classList.toggle('on',v);const s=hbtn.querySelectorAll('span');s[0].style.transform=v?'rotate(45deg) translate(5px,5px)':'';s[1].style.opacity=v?0:1;s[2].style.transform=v?'rotate(-45deg) translate(5px,-5px)':'';}
hbtn.addEventListener('click',()=>tog(!open));
mx2.addEventListener('click',()=>tog(false));
mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>tog(false)));
const obs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis')});
},{threshold:0.12});
document.querySelectorAll('.rv,.rv2').forEach(el=>obs.observe(el));