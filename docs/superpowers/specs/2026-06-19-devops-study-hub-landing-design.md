# DevOps Study Hub Landing Design

## Goal

Redesign the landing page as a study-centered personal hub. The page should introduce the site as a place where jinrudals records learning around DevOps, automation, reliability, and infrastructure, while lightly grounding that direction in semiconductor development experience.

The landing page should not read like a resume. Career-oriented details belong under `/career`, and project-level implementation details belong under `/projects`.

## Positioning

Primary impression:

> A developer studying and documenting DevOps through automation, reliability, and infrastructure work.

Hero headline:

> Building toward DevOps through study and automation.

Hero supporting copy:

> 반도체 개발 환경에서 CI, 자동화, 검증 인프라를 다뤄왔고, 그 경험을 바탕으로 DevOps/SRE 영역을 공부하고 기록합니다.

The page can use mixed language. The hero headline may be English for concise direction-setting, while explanatory copy can stay Korean for natural context.

## Page Structure

### Hero

The hero should be direct and lightweight:

- English headline: `Building toward DevOps through study and automation.`
- Korean supporting copy connecting semiconductor automation experience to DevOps/SRE study.
- Primary action: `Study`
- Secondary actions: `Projects`, `Career`

The hero should avoid detailed project claims. It only needs to establish direction and invite the user into the site's records.

### Current Focus

Show the study areas currently guiding the site. Suggested focus items:

- DevOps
- CI/CD
- Infrastructure
- Observability
- Backend
- AI Automation

Each item can have a short Korean description, but the section should stay compact. Its job is to show the learning map, not to explain every topic.

### Study Notes

Move study content earlier than projects. This section should connect to the existing `/study` route and reuse the existing study categories where possible.

When there are no posts, the empty state should still feel intentional. It can say that notes will be added as the study record grows.

### Projects

Keep projects as supporting evidence rather than the main story. The landing page should only show a light preview and route users to `/projects` for details.

Suggested grouping:

- Work Systems: CI stability, Jenkins pipeline, HPC/farm infrastructure, regression automation, design quality checks.
- Personal Projects: AI Cage and future public projects.

The landing page should not include deep implementation details for these systems. Detailed descriptions, stacks, outcomes, and constraints belong on project pages.

### Career

Keep career links near the bottom as supporting navigation:

- Resume
- Cover Letter
- Portfolio

This preserves the distinction between the homepage as a study hub and `/career` as the career document area.

## Content Boundaries

Do:

- Keep the landing page personal, clear, and study-oriented.
- Mention DevOps/SRE as a direction of study and growth.
- Mention semiconductor development experience as context.
- Use project previews only as navigation into `/projects`.

Do not:

- Present the landing page as a full resume.
- Over-explain internal company systems on the homepage.
- Claim broad industry DevOps experience beyond what has been described.
- Add a separate `/about` page for this version.

## Visual Direction

Follow the existing site's restrained layout and card system:

- Keep the current SvelteKit single-page landing route at `/`.
- Reuse the existing global palette, typography, card radius, and grid conventions.
- Make the page scan-friendly and calm rather than promotional.
- Place study/focus content before project previews.
- Keep responsive behavior simple: stacked sections on mobile, compact grids on desktop.

## Components and Data

The implementation can stay in the current structure:

- `src/routes/+page.svelte` owns the landing layout.
- `src/lib/content.js` can provide focus items, project previews, career links, and study categories.
- Existing routes under `/study`, `/projects`, and `/career` remain unchanged.

No new backend, content pipeline, or route type is required for this design.

## Testing and Verification

Before completion, run:

- `npm run check`
- `npm run build`

Manual checks:

- The homepage reads as a study hub, not a resume.
- Study and focus sections appear before project details.
- Empty study/project states remain intentional and professional.
- Mobile layout does not overlap or crowd text.
