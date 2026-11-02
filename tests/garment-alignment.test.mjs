import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const configPath = fileURLToPath(new URL('../clothes.config.js', import.meta.url));
const sandbox = {
  window: {},
  document: { currentScript: { src: 'http://localhost/clothes.config.js' } },
  URL
};
vm.runInNewContext(readFileSync(configPath, 'utf8'), sandbox);

const expected = {
  'chalk-white': {hangPoint: {x: 1467.19, y: 277}, bounds: {left: 1292, right: 1618, bottom: 1461}},
  'blossom-pink': {hangPoint: {x: 1887.72, y: 274}, bounds: {left: 1708, right: 2047, bottom: 1405}},
  'butter-yellow': {hangPoint: {x: 771.44, y: 202}, bounds: {left: 607, right: 927, bottom: 1393}},
  'clear-sky-blue': {hangPoint: {x: 1195.48, y: 232}, bounds: {left: 1055, right: 1346, bottom: 1404}},
  'caramel-brown': {hangPoint: {x: 1009.86, y: 287}, bounds: {left: 872, right: 1172, bottom: 1491}}
};

test('every side garment uses measurements from its current transparent image', () => {
  for (const product of sandbox.window.KNIT_RAIL_CONFIG.products) {
    assert.equal(JSON.stringify(product.side.hangPoint), JSON.stringify(expected[product.id].hangPoint), `${product.id} hang point`);
    assert.equal(JSON.stringify(product.side.bounds), JSON.stringify(expected[product.id].bounds), `${product.id} visible bounds`);
  }
});

