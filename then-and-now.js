(() => {
  const dialog = document.querySelector('#poster-dialog');
  const dialogImage = document.querySelector('#poster-dialog-image');
  const actions = [...document.querySelectorAll('[data-poster-action]')];
  const posters = {
    then: { src: 'assets/posters/then-poster.png', alt: 'THEN：灰色经典牛津衬衫海报' },
    now: { src: 'assets/posters/now-poster.jpg', alt: 'NOW：黄色当代牛津衬衫海报' }
  };

  if (!dialog || !dialogImage) return;

  const setActive = value => {
    actions.forEach(button => {
      const active = button.dataset.posterAction === value;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };

  const openPoster = value => {
    const poster = posters[value];
    if (!poster) return;
    dialogImage.src = poster.src;
    dialogImage.alt = poster.alt;
    setActive(value);
    dialog.showModal();
  };

  actions.forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.posterAction;
    if (value === 'both') {
      setActive('both');
      if (dialog.open) dialog.close();
      return;
    }
    openPoster(value);
  }));

  document.querySelectorAll('[data-poster-open]').forEach(button => {
    button.addEventListener('click', () => openPoster(button.dataset.posterOpen));
  });

  document.querySelector('.poster-dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => setActive('both'));
})();
