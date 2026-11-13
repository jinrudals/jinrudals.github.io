# AWS 스터디 시리즈 TODO

`series: aws`, 슬러그는 `aws-<topic>`(번호 없음, 예: `aws-nlb-overview`), 순서는 frontmatter `order`로 정합니다.
빈 초안 페이지는 만들지 않고, 한 번에 한 페이지씩 작성합니다.
새 파트를 추가하면 `src/lib/content-select.ts`의 `SECTION_ORDER`와 `src/lib/i18n.ts`의 `section.<part>`(ko/en)를 함께 등록합니다.

## 범위

NLB부터 시작해 이후 VPC, ALB 등 AWS 주제를 같은 시리즈에 이어 붙입니다.
동기: NLB를 잘 몰라서, ALB와 비교하며 "AWS의 고정 진입점(정적 IP)"이 필요할 때의 선택지로 이해하는 것.

## 진행 상황

### NLB (`part: nlb`)

- [x] 1. lb-types — LB 종류와 L4/L7 개념
- [x] 2. nlb-overview — NLB 개요 (리스너 · 타깃그룹 · AZ)
- [ ] 3. nlb-vs-alb — NLB vs ALB
- [ ] 4. nlb-static-ip — 정적 IP / EIP와 고정 진입
- [ ] 5. nlb-client-ip — 클라이언트 IP 보존과 Proxy Protocol
- [ ] 6. nlb-health-check — 헬스체크와 Cross-zone
- [ ] 7. nlb-tls — TLS 종료
- [ ] 8. nlb-privatelink — PrivateLink
- [ ] 9. nlb-terraform — Terraform 실습
