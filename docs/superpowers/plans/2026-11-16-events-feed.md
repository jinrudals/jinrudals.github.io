# 행사 소식 (/events) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 빌드 시 dev-events-digest RSS를 가져와 `/events`, `/en/events`에 렌더링하고 주간 cron으로 갱신한다.

**Architecture:** 순수 함수 `parseFeed`/`loadFeed`(`src/lib/events-feed.ts`)가 피드를 `FeedItem[]`로 바꾸고, `events/+page.ts`가 프리렌더 시 호출한다. 실패하면 `[]`를 반환해 빈 상태 페이지로 배포된다. `deploy.yml`에 월요일 cron을 추가한다.

**Tech Stack:** SvelteKit(static adapter), TypeScript, Node test runner (`npm test`), GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-11-16-events-feed-design.md`

## Global Constraints

- 피드 URL: `https://jinrudals.github.io/dev-events-digest/feed.xml`
- 의존성 추가 금지(직접 파서 구현). XML 엔티티 `&lt; &gt; &amp; &quot; &#39;` 디코딩.
- 피드 실패 시 예외 금지: `[]` 반환 + `console.warn`.
- nav 키 `events`는 `notes` 뒤. 문구: ko `행사 소식`, en `Events`.
- cron: `'30 1 * * 1'` (월요일 10:30 KST).
- 커밋은 Angular 스타일(`feat(events): ...`), Co-authored-by: Copilot 트레일러 포함.

## Review Focus

- `<description>`이 CDATA로 감싸진 피드: 내용을 그대로 `html`로 반환 (Task 1 테스트).
- `<item>` 하나가 title/link/pubDate 누락: 해당 항목만 건너뜀 (Task 1 테스트).
- 피드가 404/네트워크 오류/비XML: `[]` (Task 1 테스트).
- 빈 피드일 때 `/events`가 깨지지 않고 안내 문구 표시 (Task 2 빌드 확인).
- `/en/events`에서 한국어 전용 안내 표시 (Task 2 빌드 확인).

---

### Task 1: 피드 파싱/로딩 로직

**Files:**
- Create: `src/lib/events-feed.ts`
- Test: `src/lib/events-feed.test.ts`

**Interfaces:**
- Produces:
  - `export const FEED_URL: string`
  - `export type FeedItem = { title: string; link: string; date: string; html: string }` (`date`는 ISO 문자열)
  - `export function parseFeed(xml: string): FeedItem[]` — 날짜 내림차순, 필수 필드(title, link, pubDate) 누락/날짜 파싱 불가 항목 제외
  - `export function loadFeed(fetchFn?: typeof fetch, url?: string): Promise<FeedItem[]>`

- [ ] **Step 1: 실패하는 테스트 작성** (`src/lib/events-feed.test.ts`, 기존 테스트처럼 `node:test` + `assert/strict`, `./events-feed.ts` import)
  - `parseFeed parses items newest first`: 2개 item(`pubDate` 서로 다른 날짜, `title`, `link`, `description`) → 길이 2, `[0].date`가 더 최신, `[0].title`/`link` 일치.
  - `parseFeed decodes entities and keeps CDATA html`: `<title>A &amp; B</title>` → `'A & B'`; `<description><![CDATA[<h2>x</h2>]]></description>` → `html === '<h2>x</h2>'`; 엔티티 이스케이프된 description(`&lt;h2&gt;`)은 `'<h2>'`로 디코딩.
  - `parseFeed skips items missing required fields`: link 없는 item 포함 → 결과에서 제외.
  - `parseFeed returns [] for empty or non-xml input`: `''`, `'<html>Site not found</html>'` → `[]`.
  - `loadFeed returns [] on non-2xx`: fetchFn이 `{ ok: false, status: 404 }` 반환 → `[]`.
  - `loadFeed returns [] when fetch throws`: fetchFn이 reject → `[]`.
  - `loadFeed parses a successful response`: fetchFn이 `{ ok: true, text: async () => xml }` → 항목 1개.
- [ ] **Step 2: 실패 확인** — Run: `npm test` / Expected: FAIL (`events-feed.ts` 없음)
- [ ] **Step 3: 구현** — 시그니처는 위 Interfaces 그대로. `<item>...</item>` 블록을 정규식으로 분리하고 태그별로 추출한다. 값이 `<![CDATA[...]]>`이면 그대로, 아니면 엔티티 디코딩. `date`는 `new Date(pubDate).toISOString()`. `loadFeed`는 try/catch로 감싸고 실패 시 `console.warn('events feed unavailable', ...)` 후 `[]`. 기본값은 `fetchFn = fetch`, `url = FEED_URL`.
- [ ] **Step 4: 통과 확인** — Run: `npm test` / Expected: 모든 테스트 PASS (기존 포함)
- [ ] **Step 5: 커밋**

```bash
git add src/lib/events-feed.ts src/lib/events-feed.test.ts
git commit -m "feat(events): parse dev-events-digest RSS feed"
```

### Task 2: 라우트, i18n, nav

**Files:**
- Create: `src/routes/[[lang=lang]]/events/+page.ts`
- Create: `src/routes/[[lang=lang]]/events/+page.svelte`
- Modify: `src/routes/+layout.svelte` (8행 `keys`에 `'events'` 추가, `'notes'` 뒤)
- Modify: `src/lib/i18n.ts` (ko/en 사전 양쪽)

**Interfaces:**
- Consumes: `loadFeed(): Promise<FeedItem[]>`, `FeedItem`, `FEED_URL` (Task 1)
- Produces: i18n 키 `nav.events`, `events.title`, `events.blurb`, `events.empty`, `events.subscribe`, `events.source`, `events.past`, `events.koOnly`

- [ ] **Step 1: i18n 키 추가** — ko/en 양쪽에 위 8개 키. 값(ko / en):
  - `nav.events`: `행사 소식` / `Events`
  - `events.title`: `행사 소식` / `Event digest`
  - `events.blurb`: `매주 월요일, 개발자 웨비나와 한국 오프라인 컨퍼런스를 주제별로 정리합니다.` / `Every Monday: developer webinars and Korean in-person conferences, grouped by topic.`
  - `events.empty`: `아직 소식이 없습니다.` / `No issues yet.`
  - `events.subscribe`: `RSS 구독` / `Subscribe via RSS`
  - `events.source`: `원문 보기` / `View original`
  - `events.past`: `지난 소식` / `Past issues`
  - `events.koOnly`: `이 소식은 한국어로만 제공됩니다.` / `This digest is available in Korean only.`
- [ ] **Step 2: `+page.ts`** — `export const prerender = true;` 와 `export async function load() { return { items: await loadFeed() }; }` (`$lib/events-feed` import).
- [ ] **Step 3: `+page.svelte`** — `notes/+page.svelte`와 같은 패턴(`data.lang`, `t`). 구성: `<h1>`, blurb, `lang === 'en'`이면 `events.koOnly` 문구, RSS 링크(`FEED_URL`, `events.subscribe`). 항목이 없으면 `events.empty`. 있으면 최신 1건은 제목(원문 링크 `events.source`)과 `<div class="digest-body">{@html items[0].html}</div>`, 나머지는 `events.past` 아래 `날짜 · 제목` 링크 목록. 날짜는 `item.date.slice(0, 10)`. `.digest-body`에 `img { max-width: 100% }`, 링크/목록 기본 스타일만 스코프 `<style>`로 둔다.
- [ ] **Step 4: nav 추가** — `+layout.svelte`의 `keys`에 `'events'`.
- [ ] **Step 5: 검증** — Run: `npm run check && npm test && npm run build` / Expected: 오류 0, 테스트 PASS, 빌드 성공 (피드가 아직 404이므로 경고 로그와 함께 빈 상태로 빌드). `build/events.html`과 `build/en/events.html`이 존재하고 `grep -c "아직 소식이 없습니다" build/events.html`이 1, `grep -c "available in Korean only" build/en/events.html`이 1.
- [ ] **Step 6: 커밋**

```bash
git add src
git commit -m "feat(events): add /events section rendering the digest feed"
```

### Task 3: 주간 재빌드와 문서

**Files:**
- Modify: `.github/workflows/deploy.yml` (`on:`에 schedule 추가)
- Modify: `AGENTS.md` (Routing, Content)

- [ ] **Step 1: cron 추가** — `on:` 아래 `workflow_dispatch:` 뒤에 `schedule: - cron: '30 1 * * 1'` (주석으로 "digest 발행(10:00 KST) 직후" 명시).
- [ ] **Step 2: AGENTS.md** — Routing에 `- /events: dev-events-digest RSS를 빌드 시 가져와 보여주는 행사 소식`; Content 아래에 피드는 `src/lib/events-feed.ts`가 빌드 시 가져오며 deploy 워크플로의 주간 cron으로 갱신된다는 한 줄.
- [ ] **Step 3: 검증** — Run: `python -c "import yaml;print(yaml.safe_load(open('.github/workflows/deploy.yml'))[True]['schedule'])"` / Expected: `[{'cron': '30 1 * * 1'}]` (PyYAML은 `on`을 `True`로 읽음)
- [ ] **Step 4: 커밋**

```bash
git add .github/workflows/deploy.yml AGENTS.md
git commit -m "ci(events): rebuild weekly after digest publishes"
```

## 선행 작업 (코드 외)

`dev-events-digest`의 `weekly-digest`를 `dry_run` 없이 한 번 실행해 Pages/피드를 생성한다. 이후 `npm run build`로 실제 피드가 렌더링되는지 확인한다.
