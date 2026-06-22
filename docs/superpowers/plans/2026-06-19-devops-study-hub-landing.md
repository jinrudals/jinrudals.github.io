# DevOps Study Hub Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `/` as a study-centered DevOps hub with a lightweight project preview and career links.

**Architecture:** Keep the existing SvelteKit route structure. Add small landing-page data exports to `src/lib/content.js`, cover them with the existing Node content tests, then update `src/routes/+page.svelte` to render the approved hero, focus, study, project-preview, and career sections.

**Tech Stack:** SvelteKit, Svelte 5, static prerendering, plain CSS, Node test runner.

---

## File Structure

- Modify `src/lib/content.js`: add `focusItems` and `landingProjectGroups` exports. Keep this file as the shared source for navigation and landing content.
- Modify `tests/content.test.mjs`: add assertions for focus items and landing project preview grouping.
- Modify `src/routes/+page.svelte`: replace the existing project-first homepage with the study-hub flow and route CTAs.
- No new routes, backend services, content loaders, or dependencies are required.

---

### Task 1: Add Landing Content Metadata

**Files:**
- Modify: `src/lib/content.js`
- Modify: `tests/content.test.mjs`

- [ ] **Step 1: Add failing tests for landing focus and project groups**

Append these tests to `tests/content.test.mjs`, and add `focusItems` and `landingProjectGroups` to the existing import list.

```js
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
```

```js
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

  assert.deepEqual(landingProjectGroups[0].items, [
    'MR CI stability',
    'YAML Jenkins pipeline',
    'HPC computing farm',
    'DV regression reporting',
    'Design quality checks'
  ]);

  assert.deepEqual(landingProjectGroups[1].items, ['AI Cage']);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test
```

Expected: FAIL with a module export error for `focusItems` or `landingProjectGroups`.

- [ ] **Step 3: Add the landing content exports**

In `src/lib/content.js`, add these exports after `studyCategories` and before `studyPosts`.

```js
export const focusItems = [
  {
    label: 'DevOps',
    description: '개발과 운영 사이의 반복 가능한 흐름을 공부하고 정리합니다.'
  },
  {
    label: 'CI/CD',
    description: '변경을 빠르게 검증하고 안정적으로 전달하는 파이프라인에 집중합니다.'
  },
  {
    label: 'Infrastructure',
    description: 'Linux, HPC, 자동화 도구를 바탕으로 실행 환경을 이해합니다.'
  },
  {
    label: 'Observability',
    description: '시스템 상태를 보고 판단할 수 있는 지표와 리포팅을 다룹니다.'
  },
  {
    label: 'Backend',
    description: '자동화와 운영 도구를 지탱하는 서버 애플리케이션을 정리합니다.'
  },
  {
    label: 'AI Automation',
    description: 'AI 도구를 개발 워크플로와 개인 자동화에 연결해 실험합니다.'
  }
];

export const landingProjectGroups = [
  {
    label: 'Work Systems',
    href: '/projects',
    description: '업무에서 다뤄온 자동화와 신뢰성 시스템은 상세 페이지에서 정리합니다.',
    items: [
      'MR CI stability',
      'YAML Jenkins pipeline',
      'HPC computing farm',
      'DV regression reporting',
      'Design quality checks'
    ]
  },
  {
    label: 'Personal Projects',
    href: '/projects',
    description: '공개 가능한 개인 프로젝트와 실험을 별도로 기록합니다.',
    items: ['AI Cage']
  }
];
```

- [ ] **Step 4: Run the content tests**

Run:

```bash
npm test
```

Expected: PASS. The new landing metadata tests and existing content tests should all pass.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/lib/content.js tests/content.test.mjs
git commit -m "feat(content): add landing study hub metadata"
```

---

### Task 2: Rebuild the Landing Page Markup

**Files:**
- Modify: `src/routes/+page.svelte`

- [ ] **Step 1: Replace the landing import**

In `src/routes/+page.svelte`, replace the current import with:

```svelte
<script lang="ts">
  import {
    careerLinks,
    focusItems,
    landingProjectGroups,
    recentStudyPosts,
    studyCategories
  } from '$lib/content.js';
</script>
```

- [ ] **Step 2: Update the page metadata**

Replace the existing `<svelte:head>` block with:

```svelte
<svelte:head>
  <title>jinrudals | DevOps study hub</title>
  <meta
    name="description"
    content="Study hub for DevOps, automation, reliability, infrastructure, and related project notes."
  />
</svelte:head>
```

- [ ] **Step 3: Replace the `<main>` markup**

Replace the full `<main class="page">...</main>` block in `src/routes/+page.svelte` with:

```svelte
<main class="page">
  <section class="hero" aria-labelledby="site-title">
    <div class="hero-copy">
      <p class="eyebrow">DevOps-oriented study hub</p>
      <h1 id="site-title">Building toward DevOps through study and automation.</h1>
      <p class="lede">
        반도체 개발 환경에서 CI, 자동화, 검증 인프라를 다뤄왔고, 그 경험을 바탕으로
        DevOps/SRE 영역을 공부하고 기록합니다.
      </p>
      <div class="actions" aria-label="Primary links">
        <a class="primary" href="/study">Study</a>
        <a href="/projects">Projects</a>
        <a href="/career">Career</a>
      </div>
    </div>
    <div class="signal" aria-label="Current direction">
      <span>Reliability</span>
      <span>Automation</span>
      <span>Infrastructure</span>
      <strong>DevOps</strong>
    </div>
  </section>

  <section class="section" aria-labelledby="focus-title">
    <div class="section-heading">
      <p class="eyebrow">Current Focus</p>
      <h2 id="focus-title">공부하고 기록할 기술 축</h2>
    </div>
    <div class="grid three focus-grid">
      {#each focusItems as item}
        <article class="card compact-card">
          <h3>{item.label}</h3>
          <p>{item.description}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="section split" aria-labelledby="study-title">
    <div>
      <p class="eyebrow">Study Notes</p>
      <h2 id="study-title">학습 기록</h2>
      <p class="lede">
        DevOps, 인프라, 백엔드, AI 자동화로 이어지는 공부를 카테고리별로 쌓아갑니다.
      </p>
      <a class="text-link" href="/study">전체 Study 보기</a>
    </div>
    <div class="list">
      {#each recentStudyPosts as post}
        <a class="list-item" href={`/study/${post.category}/${post.slug}`}>
          <span>{post.date} · {post.category}</span>
          <strong>{post.title}</strong>
          <p>{post.summary}</p>
        </a>
      {:else}
        <div class="empty-panel">
          <strong>아직 등록된 공부 글이 없습니다.</strong>
          <p>먼저 채울 카테고리부터 정리해두었습니다.</p>
          <div class="pill-row">
            {#each studyCategories as category}
              <a class="pill-link" href={`/study/${category.id}`}>{category.label}</a>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </section>

  <section class="section" aria-labelledby="project-preview-title">
    <div class="section-heading">
      <p class="eyebrow">Projects</p>
      <h2 id="project-preview-title">경험과 실험의 기록</h2>
      <p class="lede">
        홈에서는 방향만 보여주고, 시스템별 상세 내용은 프로젝트 페이지에 따로 정리합니다.
      </p>
    </div>
    <div class="grid two">
      {#each landingProjectGroups as group}
        <a class="card link-card project-preview" href={group.href}>
          <h3>{group.label}</h3>
          <p>{group.description}</p>
          <div class="pill-row">
            {#each group.items as item}
              <span class="pill">{item}</span>
            {/each}
          </div>
        </a>
      {/each}
    </div>
  </section>

  <section class="section" aria-labelledby="career-title">
    <p class="eyebrow">Career</p>
    <h2 id="career-title">Career Documents</h2>
    <div class="grid three">
      {#each careerLinks as item}
        <a class="card link-card" href={item.href}>
          <h3>{item.label}</h3>
          <p>{item.description}</p>
        </a>
      {/each}
    </div>
  </section>
</main>
```

- [ ] **Step 4: Run Svelte validation**

Run:

```bash
npm run check
```

Expected: PASS. If it fails, the likely issues are a mistyped imported export or malformed Svelte block.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/routes/+page.svelte
git commit -m "feat: restructure landing as study hub"
```

---

### Task 3: Update Landing Styles and Responsive Behavior

**Files:**
- Modify: `src/routes/+page.svelte`

- [ ] **Step 1: Replace the `<style>` block**

Replace the full `<style>...</style>` block in `src/routes/+page.svelte` with:

```svelte
<style>
  .hero {
    display: grid;
    align-items: center;
    gap: 36px;
    grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
    min-height: calc(100vh - 180px);
  }

  .hero-copy {
    max-width: 860px;
  }

  h1 {
    margin: 0;
    color: var(--ink);
    font-size: clamp(3rem, 7vw, 6.2rem);
    line-height: 1;
    letter-spacing: 0;
  }

  h2 {
    margin: 0 0 18px;
    color: var(--ink);
    font-size: 2rem;
    letter-spacing: 0;
  }

  .section-heading {
    max-width: 760px;
    margin-bottom: 24px;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 32px;
  }

  .actions a {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 0 18px;
    background: var(--surface);
    font-weight: 700;
    text-decoration: none;
  }

  .actions .primary {
    border-color: var(--accent-strong);
    background: var(--accent-strong);
    color: white;
  }

  .actions a:hover {
    border-color: var(--accent);
  }

  .signal {
    display: grid;
    min-height: 360px;
    align-content: end;
    gap: 12px;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 24px;
    background:
      linear-gradient(135deg, rgb(66 107 95 / 0.16), transparent 45%),
      var(--surface);
  }

  .signal span,
  .signal strong {
    display: block;
    border-left: 4px solid var(--accent);
    padding-left: 14px;
  }

  .signal span {
    color: var(--muted);
    font-weight: 800;
  }

  .signal strong {
    color: var(--ink);
    font-size: 2.4rem;
  }

  .focus-grid {
    align-items: stretch;
  }

  .compact-card p {
    margin-bottom: 0;
  }

  .split {
    display: grid;
    gap: 36px;
    grid-template-columns: minmax(260px, 0.75fr) minmax(0, 1.25fr);
  }

  .split .text-link {
    display: inline-flex;
    margin-top: 8px;
  }

  .list {
    display: grid;
    gap: 12px;
  }

  .list-item {
    display: block;
    border-bottom: 1px solid var(--line);
    padding: 0 0 18px;
    text-decoration: none;
  }

  .list-item span {
    color: var(--warm);
    font-size: 0.86rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .list-item strong {
    display: block;
    margin-top: 6px;
    color: var(--ink);
    font-size: 1.15rem;
  }

  .list-item p {
    margin: 8px 0 0;
    color: var(--muted);
    line-height: 1.6;
  }

  .empty-panel {
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 22px;
    background: var(--surface);
  }

  .empty-panel strong {
    color: var(--ink);
  }

  .empty-panel p {
    margin: 8px 0 18px;
    color: var(--muted);
    line-height: 1.7;
  }

  .pill-link {
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 6px 10px;
    color: var(--muted);
    font-size: 0.84rem;
    font-weight: 700;
    text-decoration: none;
  }

  .pill-link:hover {
    border-color: var(--accent);
    color: var(--ink);
  }

  .link-card {
    color: inherit;
    text-decoration: none;
  }

  .project-preview {
    display: grid;
    align-content: start;
  }

  .project-preview .pill-row {
    margin-top: 8px;
  }

  @media (max-width: 880px) {
    .hero,
    .split {
      grid-template-columns: 1fr;
    }

    .hero {
      min-height: auto;
    }
  }
</style>
```

- [ ] **Step 2: Run Svelte validation**

Run:

```bash
npm run check
```

Expected: PASS. There should be no unused CSS selector warnings.

- [ ] **Step 3: Run a production build**

Run:

```bash
npm run build
```

Expected: PASS. The static build should complete without route or prerender errors.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/routes/+page.svelte
git commit -m "style: polish landing study hub layout"
```

---

### Task 4: Final Verification

**Files:**
- Inspect: `src/routes/+page.svelte`
- Inspect: `src/lib/content.js`
- Inspect: `tests/content.test.mjs`

- [ ] **Step 1: Run all automated checks**

Run:

```bash
npm test
npm run check
npm run build
```

Expected: all commands PASS.

- [ ] **Step 2: Start the development server for manual review**

Run:

```bash
npm run dev
```

Expected: Vite prints a local URL, usually `http://localhost:5173/`.

- [ ] **Step 3: Manually review `/`**

Open the local URL and verify:

- The hero headline is `Building toward DevOps through study and automation.`
- The hero supporting copy mentions semiconductor development experience and DevOps/SRE study.
- The primary CTA points to `/study`.
- `Current Focus` appears before projects.
- `Study Notes` appears before projects and has an intentional empty state when there are no posts.
- `Projects` is a light preview only and links to `/projects`.
- `Career Documents` is near the bottom.
- Mobile width does not overlap text, cards, buttons, or pills.

- [ ] **Step 4: Stop the development server**

Use `Ctrl-C` in the running dev-server terminal.

- [ ] **Step 5: Commit any final fixes**

If manual review required code changes, run:

```bash
git add src/routes/+page.svelte src/lib/content.js tests/content.test.mjs
git commit -m "fix: refine landing study hub"
```

If no manual fixes were needed, do not create an empty commit.

---

## Self-Review Notes

- Spec coverage: Hero positioning, mixed-language copy, current focus, study-first flow, lightweight project preview, career links, visual restraint, and verification commands are all covered by tasks.
- Scope: This is one small landing-page implementation. No route decomposition is needed.
- Type consistency: `focusItems` and `landingProjectGroups` are defined in `src/lib/content.js`, imported in `src/routes/+page.svelte`, and tested in `tests/content.test.mjs`.
