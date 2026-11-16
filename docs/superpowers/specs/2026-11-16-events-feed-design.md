# 행사 소식 (/events) — dev-events-digest RSS 표시

## 목표

`jinrudals/dev-events-digest`가 매주 발행하는 RSS(`https://jinrudals.github.io/dev-events-digest/feed.xml`)를 이 사이트의 새 섹션 `/events`(영어 `/en/events`)에서 읽을 수 있게 한다. 정적 사이트이므로 빌드 시점에 피드를 가져와 렌더링한다.

## 범위 밖

- 브라우저 런타임 fetch, `repository_dispatch` 기반 즉시 갱신.
- digest 본문 HTML을 이 사이트 스타일에 맞게 재가공하는 것(아래 "본문 처리" 참고).
- `dev-events-digest` 저장소 코드 변경. 단, 선행 작업(아래)은 필요하다.

## 선행 작업 (이 저장소 밖)

`dev-events-digest`의 Pages가 아직 배포된 적이 없어 `feed.xml`이 404이다. `weekly-digest` 워크플로를 한 번 수동 실행(`dry_run` 아님)해 Pages와 피드를 생성해야 한다. 그 전까지 `/events`는 빈 상태로 동작한다.

## 구성

### 1. `src/lib/events-feed.ts` (순수 로직)

- `parseFeed(xml: string): FeedItem[]` — RSS 2.0의 `<item>`에서 `title`, `link`, `pubDate`, `description`을 추출한다. `FeedItem = { title: string; link: string; date: string /* ISO */; html: string }`. 날짜 내림차순, 항목이 깨졌으면(필수 필드 누락) 건너뛴다.
- `loadFeed(fetchFn = fetch, url = FEED_URL): Promise<FeedItem[]>` — fetch 실패, 비-2xx, 파싱 실패 시 예외를 던지지 않고 `[]`를 반환하고 `console.warn`만 남긴다(빌드를 깨지 않는다).
- 의존성 추가 없이 최소한의 파서(정규식/문자열)로 구현한다. XML 엔티티(`&lt;`, `&gt;`, `&amp;`, `&quot;`, `&#39;`)는 디코딩한다.
- `src/lib/events-feed.test.ts`에서 샘플 XML, 깨진 항목, 빈 피드, fetch 실패를 테스트한다(`npm test`, Node test runner).

### 2. 라우트

- `src/routes/[[lang=lang]]/events/+page.ts` — `prerender = true`, `load`에서 `loadFeed()` 호출 후 `{ items }` 반환.
- `src/routes/[[lang=lang]]/events/+page.svelte` — 제목·소개문, RSS 구독 링크(`feed.xml`), 최신 순 목록(날짜, 제목, digest 아카이브 원문 링크). 항목이 없으면 "아직 소식이 없습니다" 안내와 RSS/사이트 링크만 보여준다.
- 최신 1건은 본문(`html`)을 펼쳐 보여주고, 나머지는 제목 링크 목록으로 둔다.
- digest 본문은 신뢰할 수 있는 자기 저장소 산출물이므로 `{@html}`로 렌더링하되, 이 사이트 스타일과 충돌하지 않도록 `.digest-body` 래퍼 안에 간단한 스코프 스타일만 둔다.

### 3. i18n / nav

- `src/routes/+layout.svelte`의 `keys`에 `'events'`를 `'notes'` 뒤에 추가한다.
- `src/lib/i18n.ts`에 ko/en으로 `nav.events`(행사 소식 / Events), `events.title`, `events.blurb`, `events.empty`, `events.subscribe`, `events.source`를 추가한다.
- 피드 본문은 한국어뿐이므로 `/en/events`에서도 본문은 한국어이고, 상단에 `events.koOnly` 안내 문구("이 소식은 한국어로만 제공됩니다")를 표시한다. 이 키도 ko/en 양쪽에 추가한다.

### 4. 주간 재빌드

`.github/workflows/deploy.yml`에 스케줄을 추가한다.

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
  schedule:
    - cron: '30 1 * * 1' # 월요일 10:30 KST, digest 발행(10:00 KST) 직후
```

GitHub cron 지연을 감안해 30분 여유를 둔다. 빌드 시 피드를 못 받아도 위의 빈 상태 폴백으로 배포는 성공한다.

### 5. 문서

`AGENTS.md`의 Routing 목록에 `/events`를, Content 항목에 "피드는 빌드 시 `dev-events-digest` RSS에서 가져오며 주간 cron으로 갱신된다"를 추가한다.

## 에러 처리

| 상황 | 동작 |
| --- | --- |
| 피드 404/네트워크 오류 | `[]` 반환, 경고 로그, 빈 상태 페이지로 배포 |
| 일부 `<item>` 필드 누락 | 해당 항목만 건너뜀 |
| 피드가 비어 있음 | 빈 상태 페이지 |

## 테스트 / 검증

- `npm test`: `events-feed` 단위 테스트.
- `npm run check`, `npm run build`: `/events`, `/en/events`가 프리렌더되고 nav에 링크가 나타나는지 확인.
- 선행 작업 완료 후 로컬에서 실제 피드로 한 번 빌드해 렌더링을 눈으로 확인한다.

## 성공 기준

- 헤더에 "행사 소식"이 보이고 `/events`에서 최신 digest와 지난 소식 목록을 읽을 수 있다.
- 피드가 없어도 빌드·배포가 실패하지 않는다.
- 매주 월요일 digest 발행 후 자동으로 반영된다.
