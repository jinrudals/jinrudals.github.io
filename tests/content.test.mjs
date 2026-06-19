import test from 'node:test';
import assert from 'node:assert/strict';

import {
  careerLinks,
  getProjectBySlug,
  getStudyPostLabels,
  getStudyPostsByLabel,
  getStudyCategory,
  getStudyPost,
  navItems,
  projectItems,
  studyLabels,
  studyCategories,
  studyPosts
} from '../src/lib/content.js';

test('top navigation exposes home, study, projects, and career without about', () => {
  assert.deepEqual(
    navItems.map((item) => item.href),
    ['/', '/study', '/projects', '/career']
  );
});

test('study index has categories and each post belongs to a known category', () => {
  const categoryIds = new Set(studyCategories.map((category) => category.id));

  assert.ok(categoryIds.has('backend'));
  assert.ok(categoryIds.has('frontend'));
  assert.ok(categoryIds.has('cs'));
  assert.equal(studyPosts.length, 0);

  for (const post of studyPosts) {
    assert.ok(categoryIds.has(post.category));
    assert.equal(getStudyPost(post.category, post.slug)?.title, post.title);
  }
});

test('category pages can resolve their display metadata', () => {
  assert.equal(getStudyCategory('backend')?.label, 'Backend');
  assert.equal(getStudyCategory('missing'), undefined);
});

test('projects expose detail slugs for portfolio pages', () => {
  assert.equal(projectItems.length, 0);

  for (const project of projectItems) {
    assert.equal(getProjectBySlug(project.slug)?.title, project.title);
  }
});

test('career hub separates resume, cover letter, and portfolio', () => {
  assert.deepEqual(
    careerLinks.map((item) => item.href),
    ['/career/resume', '/career/cover-letter', '/career/portfolio']
  );
});

test('study labels are deduplicated and sorted for filtering', () => {
  const labels = studyLabels.map((label) => label.id);

  assert.deepEqual(labels, [...new Set(labels)]);
  assert.deepEqual(labels, [...labels].sort());
  assert.deepEqual(labels, []);
});

test('study posts can be filtered by label', () => {
  const sveltekitPosts = getStudyPostsByLabel('sveltekit');

  assert.equal(sveltekitPosts.length, 0);
  assert.deepEqual(getStudyPostsByLabel('missing'), []);
});

test('study post labels resolve display metadata', () => {
  const post = getStudyPost('frontend', 'sveltekit-routing');
  const labels = getStudyPostLabels(post);

  assert.deepEqual(
    labels.map((label) => label.id),
    []
  );
});
