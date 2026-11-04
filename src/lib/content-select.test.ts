import { test } from 'node:test';
import assert from 'node:assert/strict';
import { langsOf, listFor, parseName, pick } from './content-select.ts';

const items = [
  { slug: 'a', lang: 'ko' as const, value: 'a-ko' },
  { slug: 'a', lang: 'en' as const, value: 'a-en' },
  { slug: 'b', lang: 'ko' as const, value: 'b-ko' },
  { slug: 'c', lang: 'en' as const, value: 'c-en' }
];

test('parseName reads slug and language from the file name', () => {
  assert.deepEqual(parseName('/src/content/writing/a.en.md'), { slug: 'a', lang: 'en' });
  assert.deepEqual(parseName('/x/a.md'), { slug: 'a', lang: 'ko' });
});

test('pick returns the exact language version', () => {
  assert.deepEqual(pick(items, 'a', 'en'), { value: 'a-en', fellBack: false });
});

test('pick falls back to ko when the translation is missing', () => {
  assert.deepEqual(pick(items, 'b', 'en'), { value: 'b-ko', fellBack: true });
});

test('pick returns undefined when neither exists, including en-only under ko', () => {
  assert.equal(pick(items, 'zzz', 'en'), undefined);
  assert.equal(pick(items, 'c', 'ko'), undefined);
});

test('listFor excludes other languages', () => {
  assert.deepEqual(listFor(items, 'en'), ['a-en', 'c-en']);
  assert.deepEqual(listFor(items, 'ko'), ['a-ko', 'b-ko']);
});

test('langsOf lists the languages a slug exists in', () => {
  assert.deepEqual(langsOf(items, 'a'), ['ko', 'en']);
  assert.deepEqual(langsOf(items, 'c'), ['en']);
  assert.deepEqual(langsOf(items, 'zzz'), []);
});
