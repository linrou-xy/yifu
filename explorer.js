/* ==========================================================================
   Page two — the garment explorer.

   1. Scroll: the green bar is pinned in CSS; page one stays behind and fades
      out while page two rides up over it. Both are driven by how far page two
      has entered the viewport, so the motion follows the user's finger or
      wheel instead of a timer.
   2. Details: each numbered marker opens a loupe centred on itself. The loupe
      shows a magnified crop of the same artwork (shirt + embroidered emblem),
      so the detail reads before any photography exists. Drop real close-ups in
      and they take over automatically — see DETAILS[id].image below.
   ========================================================================== */
(()=>{
  'use strict';

  /* Copy for the four markers. image:'' => magnify the artwork instead of
     loading a photo. Put a file in assets/details/ and write its path here to
     use a real close-up (it is shown cover-cropped inside the loupe). */
  const DETAILS={
    collar:{
      num:'01',label:'Collar',zoom:1.75,image:'',
      title:'The collar',
      body:'A button-down collar is stitched down at both points, so it stays flat instead of lifting in the wind. It is the first part of a shirt you meet, which is why it carries the shape of the whole garment.'
    },
    buttons:{
      num:'02',label:'Buttons',zoom:2.8,image:'',
      title:'The buttons',
      body:'Eight buttons down a single placket, spaced so the front never gapes open. Pearl-look resin, four holes, cross-stitched — and replaced by hand at the store, never thrown away with the shirt.'
    },
    logo:{
      num:'03',label:'Logo',zoom:4.2,image:'',focus:[.6477,.3425],
      title:'The emblem',
      body:'A small embroidered shield above the pocket: two letters, a star, one line of stitching. It is the only part of the shirt that exists purely to be looked at — everything around it is there for a reason.'
    },
    cuff:{
      num:'04',label:'Cuff',zoom:1.9,image:'',focus:[.1412,.900],
      title:'The cuff',
      body:'Two buttons let you wear the cuff closed against the wrist or left loose. Turn it back once and it reads the same width as the placket — the quiet measurement that makes a shirt look considered.'
    }
  };

  const panelOne=document.querySelector('#panel-one');
  const panelTwo=document.querySelector('#panel-two');
  const frame=document.querySelector('#shirt-frame');
  const scene=document.querySelector('#loupe-scene');
  const loupe=document.querySelector('#loupe');
  const shot=document.querySelector('#loupe-shot');
  const loupeNum=document.querySelector('#loupe-num');
  const loupeLabel=document.querySelector('#loupe-label');
  const reader=document.querySelector('#detail-reader');
  const readerTitle=document.querySelector('#reader-title');
  const readerBody=document.querySelector('#reader-body');
  if(!panelOne||!panelTwo)return;

  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];

  /* ── 1. page turn ─────────────────────────────────────────────────────── */
  let queued=false;
  const headH=()=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--head-h'))||74;

  function paint(){
    queued=false;
    const vh=innerHeight;
    const top=panelTwo.getBoundingClientRect().top;
    const travel=Math.max(1,vh-headH());
    const entered=Math.min(1,Math.max(0,(vh-top)/travel));

    panelOne.style.setProperty('--entered',entered.toFixed(3));
    if(reduced){
      panelOne.style.opacity=entered>0.98?'0':'';
      panelOne.style.transform='';
      return;
    }
    panelOne.style.opacity=String((1-entered*0.94).toFixed(3));
    panelOne.style.transform=`translate3d(0,${(-entered*28).toFixed(1)}px,0) scale(${(1-entered*0.018).toFixed(4)})`;
    panelOne.style.filter=entered>0.02?`saturate(${(1-entered*0.25).toFixed(2)})`:'';
  }
  function schedule(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(paint);
  }
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',()=>{schedule();if(openId)place(openId)}, {passive:true});
  paint();

  /* ── 2. loupe ─────────────────────────────────────────────────────────── */
  let openId=null;

  function setReader(detail){
    if(!reader||!readerTitle||!readerBody)return;
    reader.classList.add('is-swapping');
    const swap=()=>{
      readerTitle.textContent=detail.title;
      readerBody.textContent=detail.body;
      reader.classList.remove('is-swapping');
    };
    reduced?swap():setTimeout(swap,140);
  }

  /* The marker's own anchor (its untouched left/top, before the -12px nudge
     that lines the dot up) is exactly the centre of its dot. */
  function place(id){
    const marker=$(`.marker[data-detail="${id}"]`,frame);
    if(!marker)return;
    const w=frame.clientWidth;
    const h=frame.clientHeight;
    const detail=DETAILS[id]||{};
    /* focus lets a detail sit dead centre in the glass when the marker's dot
       sits beside it rather than on it (the emblem, the cuff). */
    const fx=detail.focus?detail.focus[0]:null;
    const fy=detail.focus?detail.focus[1]:null;
    const cx=fx===null?marker.offsetLeft:fx*w;
    const cy=fy===null?marker.offsetTop:fy*h;
    const zoom=detail.zoom||2.6;
    const size=loupe.offsetWidth||parseFloat(getComputedStyle(loupe).width)||170;

    loupe.style.left=`${cx}px`;
    loupe.style.top=`${cy}px`;
    scene.style.width=`${(w*zoom).toFixed(1)}px`;
    scene.style.height=`${(h*zoom).toFixed(1)}px`;
    scene.style.left=`${(size/2-cx*zoom).toFixed(1)}px`;
    scene.style.top=`${(size/2-cy*zoom).toFixed(1)}px`;
  }

  function open(id){
    const detail=DETAILS[id];
    const marker=$(`.marker[data-detail="${id}"]`,frame);
    if(!detail||!marker)return;

    openId=id;
    marker.setAttribute('aria-expanded','true');
    $$('.marker',frame).forEach(m=>{if(m!==marker)m.setAttribute('aria-expanded','false')});

    loupeNum.textContent=detail.num;
    loupeLabel.textContent=detail.label;

    if(detail.image){
      if(shot.getAttribute('src')!==detail.image)shot.src=detail.image;
      shot.hidden=false;
      shot.alt=`${detail.title} 细节图`;
      loupe.dataset.source='photo';
    }else{
      shot.hidden=true;
      shot.removeAttribute('src');
      loupe.dataset.source='art';
    }

    place(id);
    loupe.dataset.open='true';
    loupe.setAttribute('aria-hidden','false');
    setReader(detail);
  }

  function close(){
    if(!openId)return;
    const last=$(`.marker[data-detail="${openId}"]`,frame);
    if(last)last.setAttribute('aria-expanded','false');
    openId=null;
    loupe.dataset.open='false';
    loupe.setAttribute('aria-hidden','true');
  }

  $$('.marker',frame).forEach(marker=>{
    marker.addEventListener('click',e=>{
      e.stopPropagation();
      const id=marker.dataset.detail;
      openId===id?close():open(id);
    });
  });

  document.addEventListener('click',e=>{
    if(!openId)return;
    if(e.target.closest('.loupe')||e.target.closest('.marker'))return;
    close();
  });
  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape'||!openId)return;
    const last=$(`.marker[data-detail="${openId}"]`,frame);
    close();
    if(last)last.focus();
  });

  /* Keyboard: arrow keys walk the four markers once one has focus. */
  frame.addEventListener('keydown',e=>{
    if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft'&&e.key!=='ArrowDown'&&e.key!=='ArrowUp')return;
    const markers=$$('.marker',frame);
    const at=markers.indexOf(document.activeElement);
    if(at<0)return;
    e.preventDefault();
    const next=markers[(at+(e.key==='ArrowRight'||e.key==='ArrowDown'?1:markers.length-1))%markers.length];
    next.focus();
  });
})();
