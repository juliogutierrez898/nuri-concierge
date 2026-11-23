/* NURI Signature launcher. Install once in the Shopify theme layout (theme.liquid)
   so it appears on every storefront page. Configure HTTPS backend via data-concierge-url. */
(()=>{'use strict';
if(document.getElementById('nuri-concierge-launcher'))return;
const script=document.currentScript;
const configured=script?.getAttribute('data-concierge-url');
const base=new URL(configured||script.src,document.baseURI);
if(base.protocol!=='https:'&&base.hostname!=='localhost')return;
const origin=base.origin;
const css=document.createElement('style');css.textContent=`
#nuri-concierge-launcher{position:fixed;right:20px;bottom:20px;z-index:2147483001;display:flex;align-items:center;gap:10px;min-height:48px;padding:7px 17px 7px 11px;background:#080808;color:#fff;border:2px solid #a4ff00;border-radius:999px;font:800 13px/1.2 system-ui,-apple-system,sans-serif;letter-spacing:-.025em;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.28),0 0 5px rgba(164,255,0,.24),inset 0 1px 0 rgba(255,255,255,.09);transform:translateY(-2px);transition:box-shadow 180ms ease,transform 180ms ease;isolation:isolate}
#nuri-concierge-launcher:before{content:'';position:absolute;right:-2px;top:12%;height:75%;width:14px;border-right:3px solid #ff18a7;border-radius:50%;filter:drop-shadow(0 0 2px rgba(255,24,167,.45));pointer-events:none}
#nuri-concierge-launcher:hover{box-shadow:0 9px 22px rgba(0,0,0,.34),0 0 7px rgba(164,255,0,.32),inset 0 1px 0 rgba(255,255,255,.11);transform:translateY(-4px)}
#nuri-concierge-launcher:focus-visible{outline:3px solid #fff;outline-offset:4px}
#nuri-concierge-launcher .nuri-crown{width:44px;height:32px;flex:none;filter:drop-shadow(0 0 3px rgba(164,255,0,.40))}
#nuri-concierge-frame{display:none;position:fixed;right:20px;bottom:100px;width:min(390px,calc(100vw - 24px));height:min(620px,calc(100dvh - 116px));z-index:2147483000;border:1px solid #a4ff00;border-radius:17px;background:#111;box-shadow:0 12px 32px rgba(0,0,0,.30),0 0 5px rgba(164,255,0,.13)}
@media(max-width:767px){#nuri-concierge-launcher{right:calc(16px + env(safe-area-inset-right,0px));bottom:calc(16px + env(safe-area-inset-bottom,0px));width:54px;height:54px;min-height:54px;padding:0;justify-content:center;gap:0}#nuri-concierge-launcher:before{top:15%;height:70%;width:12px}#nuri-concierge-launcher .nuri-label{display:none}#nuri-concierge-launcher .nuri-crown{width:36px;height:27px}#nuri-concierge-frame{right:0;bottom:0;width:100vw;height:100dvh;border-radius:0;border:0}}
@media(prefers-reduced-motion:reduce){#nuri-concierge-launcher{transition:none;transform:none}#nuri-concierge-launcher:hover{transform:none}}
`;document.head.append(css);
const button=document.createElement('button');button.id='nuri-concierge-launcher';button.type='button';button.setAttribute('aria-label','Open NURI AI Concierge');button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','nuri-concierge-frame');
const crown=document.createElementNS('http://www.w3.org/2000/svg','svg');crown.setAttribute('viewBox','0 0 80 60');crown.setAttribute('class','nuri-crown');crown.setAttribute('aria-hidden','true');crown.innerHTML='<path d="M8 17 L22 40 L29 6 L44 34 L65 10 L65 43 L15 50 Z M15 55 L67 48" fill="none" stroke="#a4ff00" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>';
const label=document.createElement('span');label.className='nuri-label';label.textContent='Chat with NURI';button.append(crown,label);
const frame=document.createElement('iframe');frame.id='nuri-concierge-frame';frame.title='NURI AI Concierge';frame.src=origin+'/';frame.setAttribute('aria-label','NURI AI Concierge conversation');
function setOpen(open){frame.style.display=open?'block':'none';button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Close NURI AI Concierge':'Open NURI AI Concierge');label.textContent=open?'Close NURI chat':'Chat with NURI';try{sessionStorage.setItem('nuri-concierge-open',open?'1':'0')}catch{}}
button.addEventListener('click',()=>setOpen(button.getAttribute('aria-expanded')!=='true'));
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&button.getAttribute('aria-expanded')==='true'){setOpen(false);button.focus()}});
document.body.append(frame,button);
try{if(sessionStorage.getItem('nuri-concierge-open')==='1')setOpen(true)}catch{}
})();
