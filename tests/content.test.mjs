import test from 'node:test';
import assert from 'node:assert/strict';

import {
  careerLinks,
  focusItems,
  getProjectBySlug,
  getStudyPostLabels,
  getStudyPostsByLabel,
  getStudyCategory,
  getStudyPost,
  landingProjectGroups,
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
  assert.ok(categoryIds.has('devops'));
  assert.equal(studyPosts.length, 9);

  for (const post of studyPosts) {
    assert.ok(categoryIds.has(post.category));
    assert.equal(getStudyPost(post.category, post.slug)?.title, post.title);
  }
});

test('category pages can resolve their display metadata', () => {
  assert.equal(getStudyCategory('backend')?.label, 'Backend');
  assert.equal(getStudyCategory('devops')?.label, 'DevOps');
  assert.equal(getStudyCategory('missing'), undefined);
});

test('devops study guide is split into ordered notes', () => {
  const devopsPosts = studyPosts.filter((post) => post.category === 'devops');

  assert.deepEqual(
    devopsPosts.map((post) => post.slug),
    [
      'lean-philosophy',
      'agile-philosophy',
      'scrum-framework',
      'kanban-methodology',
      'xp-methodology',
      'devops-philosophy',
      'process-vs-workflow',
      'scrum-ticket-operation'
    ]
  );

  assert.equal(getStudyPost('devops', 'lean-philosophy')?.title, 'Lean Philosophy');
  assert.equal(getStudyPost('devops', 'scrum-ticket-operation')?.title, 'Scrum Ticket Operation');
});

test('projects expose detail slugs for portfolio pages', () => {
  assert.equal(projectItems.length, 1);

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
  assert.deepEqual(labels, [
    'agile',
    'devops',
    'kanban',
    'lean',
    'process',
    'scrum',
    'sqlite',
    'sveltekit',
    'workflow',
    'xp'
  ]);
});

test('study posts can be filtered by label', () => {
  const sveltekitPosts = getStudyPostsByLabel('sveltekit');
  const devopsPosts = getStudyPostsByLabel('devops');

  assert.equal(sveltekitPosts.length, 1);
  assert.equal(sveltekitPosts[0].slug, 'sqlite-content-source');
  assert.equal(devopsPosts.length, 8);
  assert.deepEqual(getStudyPostsByLabel('missing'), []);
});

test('study post labels resolve display metadata', () => {
  const post = getStudyPost('frontend', 'sqlite-content-source');
  const labels = getStudyPostLabels(post);

  assert.deepEqual(
    labels.map((label) => label.id),
    ['sqlite', 'sveltekit']
  );
});

test('landing focus items describe the devops study direction', () => {
  assert.deepEqual(
    focusItems.map((item) => item.label),
    ['DevOps', 'CI/CD', 'Infrastructure', 'Observability', 'Backend', 'AI Automation']
  );

  for (const item of focusItems) {
    assert.equal(typeof item.description, 'string');
    assert.ok(item.description.length > 0);
  }
});

test('landing project groups preview work systems and personal projects', () => {
  assert.deepEqual(
    landingProjectGroups.map((group) => group.label),
    ['Work Systems', 'Personal Projects']
  );

  assert.deepEqual(
    landingProjectGroups.map((group) => group.href),
    ['/projects', '/projects']
  );

  assert.deepEqual(landingProjectGroups[0].items, [
    'MR CI stability',
    'YAML Jenkins pipeline',
    'HPC computing farm',
    'DV regression reporting',
    'Design quality checks'
  ]);

  assert.deepEqual(landingProjectGroups[1].items, ['AI Cage']);
});
