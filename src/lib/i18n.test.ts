import { test } from 'node:test';
import assert from 'node:assert/strict';
import { detectRedirect, localePath, switchPath, t } from './i18n.ts';

test('localePath prefixes en only', () => {
  assert.equal(localePath('en', '/writing'), '/en/writing');
  assert.equal(localePath('ko', '/writing'), '/writing');
  assert.equal(localePath('en', '/'), '/en');
  assert.equal(localePath('ko', '/'), '/');
});

test('switchPath maps counterpart paths', () => {
  assert.equal(switchPath('/en', 'ko'), '/');
  assert.equal(switchPath('/en/', 'ko'), '/');
  assert.equal(switchPath('/en/writing/a/', 'ko'), '/writing/a/');
  assert.equal(switchPath('/writing', 'en'), '/en/writing');
  assert.equal(switchPath('/', 'en'), '/en');
  assert.equal(switchPath('/en/writing', 'en'), '/en/writing');
});

test('detectRedirect follows stored choice, then browser language', () => {
  assert.equal(detectRedirect({ pathname: '/writing', stored: null, browser: 'en-US' }), '/en/writing');
  assert.equal(detectRedirect({ pathname: '/en/writing', stored: 'ko', browser: 'en-US' }), '/writing');
  assert.equal(detectRedirect({ pathname: '/en', stored: null, browser: 'en-US' }), null);
  assert.equal(detectRedirect({ pathname: '/', stored: null, browser: 'ko-KR' }), null);
  assert.equal(detectRedirect({ pathname: '/writing', stored: 'ko', browser: 'en-US' }), null);
});

test('t falls back to ko then key', () => {
  assert.equal(t('en', 'missing.key'), 'missing.key');
  assert.equal(t('en', 'nav.writing'), 'Writing');
  assert.equal(t('ko', 'nav.writing'), '글');
});
