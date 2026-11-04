export interface Career {
  company: string;
  team: string[]; // chronological team affiliations
  start: string; // YYYY-MM
  end?: string; // omit for current
  summary: string;
  highlights: string[];
  stack: string[];
}

export const career: Career[] = [
  {
    company: '한온시스템',
    team: ['Platform SW 팀 (차량 Embedded SW 플랫폼)'],
    start: '2026-08',
    summary: '글로벌 cloud-native DevOps 환경 구축',
    highlights: ['AWS, Terraform 기반 글로벌 DevOps 환경 구축'],
    stack: ['AWS', 'Terraform']
  },
  {
    company: '오픈엣지코리아',
    team: ['IT 팀'],
    start: '2026-05',
    end: '2026-08',
    summary: 'Kubernetes 기반 병렬 파일 시스템 도입',
    highlights: ['Kubernetes 위에 Rook-Ceph(병렬 파일 시스템) 적용'],
    stack: ['Kubernetes', 'Rook-Ceph']
  },
  {
    company: '보스반도체',
    team: ['SW 팀', 'IT Infra 팀'],
    start: '2023-08',
    end: '2026-05',
    summary: '설계 검증·품질 관리 시스템 개발 및 사내 AI 도구 조사',
    highlights: [
      'Design Verification Regression System 개발: regression 실행 및 리포트 환경',
      '유사한 구조의 Design Quality System 개발',
      'SLURM 앞단에서 회사 정책을 적용하는 Task Manager 설계 (구현은 후배 담당)',
      'BeeGFS 탐색 및 운영',
      '사내 AI 활용을 위한 MCP gateway, LLM proxy 등 도구 조사'
    ],
    stack: ['Django', 'Webhook', 'Kafka', 'SLURM', 'BeeGFS']
  },
  {
    company: 'SemiFive',
    team: ['Logic Design Team (현 Logic Design Center)'],
    start: '2020-02',
    end: '2023-08',
    summary: 'SoC 설계로 입사 후 CI/CD 및 설계 인프라 담당',
    highlights: [
      '사내 Jenkins pipeline 설계 및 운영',
      '편의를 위해 만든 shared library가 정식 jenkinsci plugin으로 발전',
      'SLURM 도입',
      'Jinja2 extension 개발 (GitHub 공개)',
      'SoC 프로젝트 regression 실행·리포트 환경 구축 (프로젝트당 2,000개 이상 test vector)',
      'Scala 기반 FIRRTL transformer 개발',
      'Document generator 개발'
    ],
    stack: ['Jenkins', 'SLURM', 'Jinja2', 'Scala', 'FIRRTL']
  }
];

export interface Education {
  school: string;
  major: string;
  start: string;
  end: string;
}

export const education: Education[] = [
  { school: '성균관대학교', major: '전자전기공학부', start: '2014-03', end: '2020-02' }
];
