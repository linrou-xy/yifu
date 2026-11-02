import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => readFileSync(join(root, file), 'utf8');
const pages = ['index.html', 'heritage.html', 'behind-the-garment.html', 'then-and-now.html', 'shop.html'];

test('every page exposes the approved five-route navigation', () => {
  for (const page of pages) {
    const html = read(page);
    for (const route of pages) {
      assert.match(html, new RegExp(`href=["']${route.replace('.', '\\.')}["']`), `${page} links to ${route}`);
    }
  }
});

test('homepage actions follow the Illustrator page map', () => {
  const html = read('index.html');
  assert.match(html, /READ THE STORY[\s\S]*?href="heritage\.html"|href="heritage\.html"[\s\S]*?READ THE STORY/);
  assert.match(html, /SEE HOW IT IS MADE[\s\S]*?href="oxford-cloth\.html"|href="oxford-cloth\.html"[\s\S]*?SEE HOW IT IS MADE/);
});

test('canvas five is rebuilt as an Oxford cloth page', () => {
  const html = read('oxford-cloth.html');
  assert.match(html, /Where the Story Begins/);
  assert.match(html, /Oxford Cloth/);
  for (const image of [
    'raw-cotton.jpg',
    'carded-cotton.jpg',
    'cloth-motion.jpg',
    'cloth-factory.jpg',
    'cloth-roll.jpg',
  ]) {
    assert.match(html, new RegExp(`assets/story/${image.replace('.', '\\.')}`));
  }
  assert.match(html, /Raw cotton is cleaned, spun into yarn, woven into Oxford cloth and carefully finished/);
  assert.doesNotMatch(html, /class="cloth-next"/);
  assert.match(html, /href="behind-the-garment\.html"/);
  for (const route of pages) assert.match(html, new RegExp(`href=["']${route.replace('.', '\\.')}["']`));
});

test('discover call-to-action is a direct link to the supplied video', () => {
  const html = read('index.html');
  const app = read('app.js');
  assert.match(html, /<a[^>]*id="discover"[^>]*href="assets\/yifu\.mp4"/);
  assert.doesNotMatch(app, /querySelector\(['"]#discover['"]\)\.addEventListener/);
});

test('heritage contains the six artboard chapters', () => {
  const html = read('heritage.html');
  for (let chapter = 1; chapter <= 6; chapter++) {
    assert.match(html, new RegExp(`data-chapter=["']0${chapter}["']`));
  }
  assert.match(html, /From\s+shirtmaker[\s\S]*Ivy League/i);
});

test('manufacturing page contains five accessible process tabs', () => {
  const html = read('behind-the-garment.html');
  assert.match(html, /role="tablist"/);
  for (const step of ['fabric', 'pattern', 'collar', 'stitching', 'finishing']) {
    assert.match(html, new RegExp(`data-process=["']${step}["']`));
  }
  assert.match(html, /src="interior\.js"/);
});

test('then-now and shop implement the approved artboard states', () => {
  assert.match(read('then-and-now.html'), /1949[\s\S]*Still in rotation/i);
  const shop = read('shop.html');
  assert.match(shop, /data-shop-color="yellow"/);
  assert.match(shop, /data-shop-color="blue"/);
  assert.match(shop, /data-shop-color="pink"/);
  assert.match(shop, /data-shop-color="white"/);
  assert.match(shop, /data-shop-color="brown"/);
  assert.match(shop, /src="interior\.js"/);
});

