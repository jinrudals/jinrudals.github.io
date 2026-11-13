# Jenkins Plugin 스터디 시리즈 TODO

`series: jenkins`, 슬러그는 `jenkins-plugin-<topic>`(번호 없음), 순서는 frontmatter `order`로 정합니다.
빈 초안 페이지는 만들지 않고, 한 번에 한 페이지씩 작성합니다.

## 범위

Plugin 기초부터 Pipeline, jenkinsci 배포, 운영, 공유 라이브러리 → 플러그인 사례까지.

## 진행 상황

### 기초 (`part: basics`)

- [x] 1. overview — Plugin 개요와 아키텍처
- [x] 2. hello-world — 첫 플러그인 실행
- [x] 3. builder — HelloWorldBuilder 해부
- [x] 4. config-jelly — config.jelly 이해하기

### 핵심 구현 (`part: core`)

- [x] 5. modify-builder — Builder 직접 수정하기
- [x] 6. validation — doCheck / doFill
- [x] 7. unit-test — `perform`과 검증 메서드 단위 테스트
- [ ] 8. jenkins-rule — JenkinsRule 통합 테스트
- [ ] 9. global-configuration — GlobalConfiguration
- [ ] 10. job-property — JobProperty
- [ ] 11. credentials-use — Credentials 사용
- [ ] 12. credentials-type — 커스텀 Credentials 타입
- [ ] 13. action — Action / 결과 페이지
- [ ] 14. jelly-deep-dive — Jelly 심화
- [ ] 15. custom-extension-point — 커스텀 Extension Point
- [ ] 16. dependencies — 플러그인 의존성

### Pipeline (`part: pipeline`)

- [ ] Step
- [ ] StepExecution / 비동기
- [ ] 재시작 복원력
- [ ] `@Symbol` / Declarative 연동

### 배포: jenkinsci (`part: release`)

- [ ] 준비 — 이름, 라이선스, 문서
- [ ] 호스팅 요청
- [ ] repository-permissions-updater
- [ ] GitHub Actions CD
- [ ] Update Center / 플러그인 사이트

### 운영 (`part: ops`)

- [ ] 호환성 / 업그레이드
- [ ] 보안
- [ ] 유지보수
- [ ] 디버깅

### 사례 (`part: case`)

공유 라이브러리 → 공식 플러그인.

- [ ] 동기
- [ ] 설계
- [ ] 마이그레이션
- [ ] 회고

### 부록 (`part: appendix`)

기본 Extension Point 사전. 슬러그는 `jenkins-plugin-ep-*`.
각 항목은 용도, 구현해야 할 핵심 메서드(계약), 인스턴스 vs `Descriptor` 구조, 최소 예제를 다룹니다. 개요 글에서는 표로 나열하지 않고 이 부록으로 안내만 합니다.

- [ ] Builder
- [ ] Publisher / Recorder / Notifier
- [ ] BuildWrapper
- [ ] Trigger
- [ ] SCM
- [ ] RunListener
- [ ] SCMListener
- [ ] ItemListener
- [ ] ComputerListener
- [ ] GlobalConfiguration
- [ ] JobProperty
- [ ] PageDecorator
- [ ] ManagementLink
- [ ] ParameterDefinition
- [ ] Cloud
- [ ] ComputerLauncher
- [ ] QueueTaskDispatcher
- [ ] SecurityRealm
- [ ] AuthorizationStrategy
- [ ] Credentials
- [ ] Step / StepContext

## 작성 메모

- 참조 링크는 `Refs` 컴포넌트로 연결합니다(클릭 → 목록 → 새 탭).
- 한국어 본문에 마크다운 이탤릭(`*...*`)은 조사와 붙어 보이므로 피합니다.
- 헤딩에 `${%Name}` 같은 `${` 표기를 넣으면 빌드가 실패합니다. 본문 인라인 코드로만 씁니다.
- Mermaid 간선 라벨에 `@`, `/`가 있으면 따옴표로 감쌉니다.
- 아직 검증하지 못한 사실: `hpi:run` 중 Jelly 핫리로드, `@Extension`의 `ordinal`/`optional` 세부, 아키타입 직접 실행.
