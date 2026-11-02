(() => {
  const sections = [
    document.querySelector('#panel-one'),
    document.querySelector('#panel-two'),
    ...document.querySelectorAll('.story-chapter')
  ].filter(Boolean);
  if (sections.length < 2) return;

  let locked = false;
  const headerHeight = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--head-h')) || 0;
  const stage = document.querySelector('#stage');
  let anchors = [];

  const measure = () => {
    const pageTop = element => element.getBoundingClientRect().top + scrollY;
    anchors = sections.map((section, index) => index === 0 && stage ? pageTop(stage) : pageTop(section));
  };

  const currentIndex = () => {
    const target = scrollY + headerHeight();
    let nearest = 0;
    anchors.forEach((anchor, index) => {
      if (Math.abs(anchor - target) < Math.abs(anchors[nearest] - target)) nearest = index;
    });
    return nearest;
  };

  const move = direction => {
    if (locked) return;
    const next = Math.max(0, Math.min(sections.length - 1, currentIndex() + direction));
    if (next === currentIndex()) return;
    locked = true;
    scrollTo({
      top: Math.max(0, anchors[next] - headerHeight()),
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
    setTimeout(() => { locked = false; }, 720);
  };

  measure();
  addEventListener('resize', measure, { passive: true });

  addEventListener('wheel', event => {
    if (Math.abs(event.deltaY) < 16 || document.querySelector('dialog[open]')) return;
    event.preventDefault();
    move(event.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  addEventListener('message', event => {
    if (event.data?.type !== 'story-chapter-wheel' || Math.abs(event.data.deltaY) < 16) return;
    move(event.data.deltaY > 0 ? 1 : -1);
  });
})();
