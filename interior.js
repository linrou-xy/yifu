(() => {
  const processTabs = [...document.querySelectorAll('[data-process]')];
  const processPanel = document.querySelector('#process-panel');
  if (processTabs.length && processPanel) {
  const content = {
    fabric: ['Stage 01 · Material', 'The fabric', 'assets/story/fabric.jpg', '牛津布细密条纹的近景', '40s two-ply cotton · breathable Oxford weave', 'The fine stripes and visible weave show the character of the cloth at the start of the shirt-making process.'],
    pattern: ['Stage 02 · Shape', 'The pattern', 'assets/story/pattern.jpg', '条纹衬衫上的刺绣徽标', 'Measured placement · embroidered crest', 'A close detail of the embroidered crest shows how a small motif is placed and stitched onto the fabric.'],
    collar: ['Stage 03 · Construction', 'The collar', 'assets/story/collar.jpg', '扣领与领标细节', 'Button-down points · shaped collar stand', 'The striped cloth, collar shape, and neck label come together at the shirt’s neckline.'],
    stitching: ['Stage 04 · Assembly', 'The stitching', 'assets/story/stitching.jpg', '袖口、纽扣与缝线细节', '18 stitches per inch · reinforced cuff', 'The buttons and seam details show the careful construction along the front of the shirt.'],
    finishing: ['Stage 05 · Final details', 'The finishing', 'assets/story/finishing.jpg', '模特穿着完成的条纹衬衫', 'Pressed, inspected, ready to wear', 'The finished striped shirt brings its fabric, construction, and details together in one complete garment.']
  };
  const image = document.querySelector('#process-image');
  const stage = document.querySelector('#process-stage');
  const title = document.querySelector('#process-title');
  const description = document.querySelector('#process-description');
  const note = document.querySelector('#process-note');
  const select = (tab, focus = false) => {
    const value = content[tab.dataset.process];
    processTabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; });
    processPanel.classList.add('is-changing');
    window.setTimeout(() => {
      stage.textContent = value[0]; title.textContent = value[1]; image.src = value[2]; image.alt = value[3]; note.textContent = value[4]; description.textContent = value[5];
      processPanel.setAttribute('aria-labelledby', tab.id); processPanel.classList.remove('is-changing');
    }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 140);
    if (focus) tab.focus();
  };
  processTabs.forEach(tab => tab.addEventListener('click', () => select(tab)));
  document.querySelector('.process-tabs').addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const current = processTabs.indexOf(document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? processTabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + processTabs.length) % processTabs.length;
    select(processTabs[next], true);
  });
  }

  const shopButtons = [...document.querySelectorAll('[data-shop-color]')];
  const shopFront = document.querySelector('#shop-front');
  if (shopButtons.length && shopFront) {
    const products = {
      white: {index: 0, name: 'Chalk White Oxford', cn: '月白', price: 599, copy: 'The clean white Oxford is a wardrobe constant—quiet, crisp, and ready for every layer.'},
      pink: {index: 1, name: 'Blossom Pink Oxford', cn: '樱粉', price: 569, copy: 'A soft blossom pink brings a lighter note to the familiar Oxford construction.'},
      yellow: {index: 2, name: 'Butter Yellow Oxford', cn: '奶黄', price: 569, copy: 'The butter yellow Oxford shirt at the heart of this story. Explore the details, then discover the GANT collection.'},
      blue: {index: 3, name: 'Clear Sky Blue Oxford', cn: '晴空蓝', price: 599, copy: 'Clear sky blue keeps the Oxford fresh and easy—the colour that belongs beside denim.'},
      brown: {index: 4, name: 'Caramel Brown Oxford', cn: '焦糖棕', price: 629, copy: 'A grounded caramel brown made for autumn layers and the years beyond them.'}
    };
    const art = document.querySelector('#product-art');
    const side = document.querySelector('#shop-side');
    const name = document.querySelector('#shop-name');
    const copy = document.querySelector('#shop-description');
    const selectColour = button => {
      const colour = button.dataset.shopColor;
      const product = products[colour];
      shopButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      art.classList.add('is-changing');
      window.setTimeout(() => {
        shopFront.src = `assets/front/${colour}.png`; shopFront.alt = `${product.cn}牛津衬衫正面`;
        side.src = `assets/side/${colour}.png`; side.alt = `${product.cn}牛津衬衫侧面`; side.dataset.sideColor = colour;
        name.innerHTML = `${product.name}<br>¥ ${product.price}`;
        copy.textContent = product.copy;
        art.classList.remove('is-changing');
      }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 150);
    };
    shopButtons.forEach(button => button.addEventListener('click', () => selectColour(button)));
  }
})();
