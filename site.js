/* Shared chrome for every page: the green bar's menu opens as a sheet on
   narrow screens. Nothing here touches the rail itself. */
(()=>{
  const head=document.querySelector('.site-head');
  const toggle=document.querySelector('#nav-toggle');
  const nav=document.querySelector('#site-nav');
  if(!head||!toggle||!nav)return;

  const set=open=>{
    head.dataset.open=String(open);
    toggle.setAttribute('aria-expanded',String(open));
    const label=toggle.querySelector('span');
    if(label)label.textContent=open?'Close':'Menu';
  };
  const isOpen=()=>head.dataset.open==='true';

  toggle.addEventListener('click',()=>set(!isOpen()));
  nav.addEventListener('click',e=>{if(e.target.closest('a'))set(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen()){set(false);toggle.focus()}});
  document.addEventListener('pointerdown',e=>{
    if(!isOpen())return;
    if(head.contains(e.target))return;
    set(false);
  });
  const wide=matchMedia('(min-width:901px)');
  wide.addEventListener('change',e=>{if(e.matches)set(false)});
})();
