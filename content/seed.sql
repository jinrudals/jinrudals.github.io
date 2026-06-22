PRAGMA foreign_keys = ON;

DELETE FROM project_highlights;
DELETE FROM project_stack;
DELETE FROM projects;
DELETE FROM study_post_tags;
DELETE FROM study_posts;

INSERT INTO study_posts (slug, category, title, date, summary, body, position)
VALUES
(
  'lean-philosophy',
  'devops',
  'Lean Philosophy',
  '2026-06-22',
  '고객 가치가 흐르는 전체 시스템을 보고 낭비, 대기, 병목을 줄이는 Lean의 기본 관점.',
  'Lean은 사람을 더 바쁘게 만드는 방법이 아니라 고객에게 가치가 전달되는 흐름을 개선하는 철학이다.
핵심은 가치 흐름을 보고, 고객 가치를 만들지 않는 대기와 재작업과 과잉 생산을 줄이는 데 있다.
소프트웨어에서는 큰 PR, 긴 배포 대기, 리뷰 대기, 배포되지 않은 코드가 재고와 낭비가 될 수 있다.
작은 배치, WIP 제한, 빠른 피드백은 문제를 더 빨리 드러내고 전체 흐름을 건강하게 만든다.',
  1
),
(
  'agile-philosophy',
  'devops',
  'Agile Philosophy',
  '2026-06-22',
  '불확실한 소프트웨어 개발에서 작동하는 결과물과 짧은 피드백으로 방향을 조정하는 Agile의 관점.',
  'Agile은 Scrum 회의나 Jira 보드 자체가 아니라 불확실한 개발에서 학습 속도를 높이는 철학이다.
처음 계획을 절대시하기보다 작게 만들고, 빨리 보여주고, 피드백을 받아 방향을 조정한다.
Lean이 흐름이 막히는 이유를 묻는다면 Agile은 지금 만드는 것이 정말 필요한지 묻는다.
Scrum, XP, Kanban 같은 방법론과 실천 체계는 Agile 철학을 각기 다른 방식으로 구현한다.',
  2
),
(
  'scrum-framework',
  'devops',
  'Scrum',
  '2026-06-22',
  '짧은 Sprint 단위로 계획, 실행, 리뷰, 회고를 반복하는 Agile 팀 운영 프레임워크.',
  'Scrum은 티켓을 많이 관리하기 위한 회의 체계가 아니라 짧은 반복을 통해 학습하고 적응하는 프레임워크다.
Sprint는 팀이 집중할 범위를 정하고 실제 Increment를 만들어 피드백을 받는 학습 단위다.
역할, 이벤트, 산출물은 무엇을 만들지, 어떻게 진행할지, 무엇을 배웠는지 반복적으로 확인하게 만든다.
중요한 질문은 Sprint마다 완성된 결과물이 있는지, 피드백으로 다음 계획이 바뀌는지, 문제가 투명하게 드러나는지다.',
  3
),
(
  'kanban-methodology',
  'devops',
  'Kanban',
  '2026-06-22',
  '작업을 시각화하고 WIP를 제한해 병목을 드러내는 Lean 기반 흐름 관리 방식.',
  'Kanban은 보드나 카드 자체가 아니라 일을 눈에 보이게 만들고 전체 흐름을 개선하는 방식이다.
뿌리는 Toyota Production System과 Just-in-Time에 있으며, 과잉 생산을 막고 필요한 만큼만 흐르게 하는 pull 관점과 연결된다.
소프트웨어에서는 요구사항, 개발 중인 기능, 리뷰 대기 PR, 테스트 대기 변경사항, 배포되지 않은 코드가 흐름 위의 재고가 된다.
WIP 제한은 일을 많이 시작하는 것보다 시작한 일이 안정적으로 끝나는 흐름을 중요하게 만든다.',
  4
),
(
  'xp-methodology',
  'devops',
  'XP, Extreme Programming',
  '2026-06-22',
  'TDD, CI, 리팩토링 같은 개발 실천으로 변경을 안전하게 다루는 Agile 방법론.',
  'XP는 팀 운영보다 개발자가 코드를 어떻게 작성하고 검증하고 품질을 유지할지에 더 직접적으로 초점을 둔다.
변경을 막으려 하기보다 변경을 감당할 수 있는 개발 방식을 만드는 것이 핵심이다.
TDD, 페어 프로그래밍, CI, 리팩토링, 단순 설계, 작은 릴리스는 빠른 피드백과 품질을 위한 연결된 실천이다.
Scrum이 반복 개발 리듬을 제공한다면 XP는 그 반복 안에서 코드를 안전하게 진화시키는 기술적 기반을 제공한다.',
  5
),
(
  'devops-philosophy',
  'devops',
  'DevOps Philosophy',
  '2026-06-22',
  '개발, 배포, 운영을 하나의 가치 흐름으로 보고 흐름과 피드백과 학습을 개선하는 DevOps의 관점.',
  'DevOps는 CI/CD, Kubernetes, Terraform 같은 도구 목록이 아니라 배포와 운영까지 포함한 가치 흐름을 보는 철학이다.
소프트웨어의 가치는 코드 작성에서 끝나지 않고 안정적으로 배포되고 운영되어 사용자에게 전달될 때 완성된다.
DevOps는 개발과 운영의 사일로를 줄이고, 작은 변경을 자주 안전하게 배포하며, 운영 피드백을 개발로 되돌린다.
Lean이 가치 전달 시스템 전체의 흐름을 본다면 DevOps는 소프트웨어 변경이 운영 서비스로 안전하게 흘러가는 흐름을 본다.',
  6
),
(
  'process-vs-workflow',
  'devops',
  'Process vs Workflow',
  '2026-06-22',
  'DevOps 문맥에서 절차와 기준인 process, 실제 실행 흐름인 workflow, 자동화를 구분하는 정리.',
  'Process는 어떤 결과를 만들기 위한 절차와 원칙과 기준을 개념적으로 정의한 것이다.
Workflow는 그 절차가 실제로 수행될 때 사람, 시스템, 도구, 상태가 어떻게 흘러가는지를 나타낸 것이다.
Automation은 workflow의 일부 또는 전체를 시스템이 대신 수행하게 만든 것이다.
DevOps에서 process 개선은 기준과 책임을 다듬는 일에 가깝고, workflow 개선은 CI/CD 단계, 알림, 상태 전이, 자동화 지점을 다듬는 일에 가깝다.',
  7
),
(
  'scrum-ticket-operation',
  'devops',
  'Scrum Ticket Operation',
  '2026-06-22',
  'Scrum을 Jira 같은 이슈 관리 도구와 함께 운영할 때 티켓을 어떻게 이해하고 관리할지 정리.',
  'Scrum의 본질은 티켓 관리가 아니라 짧은 반복을 통한 학습과 적응이다.
현실의 팀에서는 Product Backlog, Sprint Backlog, 진행 상태, 완료 기준을 티켓으로 표현하기 때문에 운영 기준이 필요하다.
티켓은 단순한 할 일 목록이 아니라 팀이 무엇을 만들고 왜 만들고 어떤 기준으로 완료할지 합의하는 작업 단위다.
Sprint 중 새 티켓이 생기면 Sprint Goal과 기존 Backlog에 미치는 영향을 보고 조정해야 하며, 완료되지 못한 티켓은 자동 이월하지 않고 원인을 다시 판단해야 한다.',
  8
),
(
  'sqlite-content-source',
  'frontend',
  'SQLite content source for static SvelteKit',
  '2026-06-22',
  'GitHub Pages can serve prerendered SvelteKit pages generated from a repo-managed SQLite database.',
  'SQLite is used only during build time.
The generated JavaScript module becomes the content source for SvelteKit routes.
GitHub Pages still receives static HTML, CSS, JavaScript, and assets.',
  1
);

INSERT INTO study_post_tags (category, post_slug, tag, position)
VALUES
  ('devops', 'lean-philosophy', 'devops', 1),
  ('devops', 'lean-philosophy', 'lean', 2),
  ('devops', 'agile-philosophy', 'devops', 1),
  ('devops', 'agile-philosophy', 'agile', 2),
  ('devops', 'scrum-framework', 'devops', 1),
  ('devops', 'scrum-framework', 'scrum', 2),
  ('devops', 'kanban-methodology', 'devops', 1),
  ('devops', 'kanban-methodology', 'kanban', 2),
  ('devops', 'lean-philosophy', 'process', 3),
  ('devops', 'xp-methodology', 'devops', 1),
  ('devops', 'xp-methodology', 'xp', 2),
  ('devops', 'devops-philosophy', 'devops', 1),
  ('devops', 'process-vs-workflow', 'devops', 1),
  ('devops', 'process-vs-workflow', 'process', 2),
  ('devops', 'process-vs-workflow', 'workflow', 3),
  ('devops', 'scrum-ticket-operation', 'devops', 1),
  ('devops', 'scrum-ticket-operation', 'scrum', 2),
  ('devops', 'scrum-ticket-operation', 'workflow', 3),
  ('frontend', 'sqlite-content-source', 'sqlite', 1),
  ('frontend', 'sqlite-content-source', 'sveltekit', 2);

INSERT INTO projects (slug, title, period, role, summary)
VALUES (
  'github-pages-content-db',
  'GitHub Pages Content DB',
  '2026',
  'Personal site architecture',
  'A static SvelteKit site whose study and project pages are generated from a repo-managed SQLite database.'
);

INSERT INTO project_stack (project_slug, item, position)
VALUES
  ('github-pages-content-db', 'SvelteKit', 1),
  ('github-pages-content-db', 'SQLite', 2),
  ('github-pages-content-db', 'GitHub Pages', 3);

INSERT INTO project_highlights (project_slug, item, position)
VALUES
  ('github-pages-content-db', 'Keeps content in a portable SQLite file committed with the repository.', 1),
  ('github-pages-content-db', 'Generates static routes at build time without a runtime server.', 2),
  ('github-pages-content-db', 'Preserves the existing study and project route structure.', 3);
