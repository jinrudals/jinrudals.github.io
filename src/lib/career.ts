export interface Career {
  company: string;
  role: string;
  start: string; // YYYY-MM
  end?: string; // omit for current
  summary?: string;
  highlights?: string[];
}

// Add entries here, newest first.
export const career: Career[] = [
  {
    company: '한온시스템',
    role: 'DevOps 엔지니어',
    start: '2026-09',
    summary: '글로벌 cloud-native DevOps 환경을 구축하고 있습니다.',
    highlights: ['AWS, Terraform 기반 글로벌 DevOps 환경 구축']
  },
  {
    company: '오픈엣지코리아',
    role: '인프라 엔지니어',
    start: '2026-05',
    end: '2026-08',
    summary: '짧은 기간 근무하며 Kubernetes 기반 병렬 파일 시스템 도입을 마무리했습니다.',
    highlights: ['Kubernetes 위에 Rook-Ceph(병렬 파일 시스템) 적용']
  },
  {
    company: '보스반도체',
    role: '개발 환경 · 플랫폼 엔지니어',
    start: '2023-08',
    end: '2026-05',
    summary: '설계 검증과 품질 관리를 위한 사내 시스템을 만들고, 마지막에는 사내 AI 도입을 위한 도구를 조사했습니다.',
    highlights: [
      'Design Verification Regression System 개발: regression 실행과 리포트 환경 (Django, Webhook, Kafka)',
      '이후 유사한 구조로 Design Quality System 개발',
      'SLURM 앞단에서 회사 정책을 적용하는 Task Manager 설계 (구현은 후배 담당)',
      'BeeGFS 직접 탐색 및 운영',
      '사내 AI 활용을 위한 도구(MCP gateway, LLM proxy 등) 탐색 및 조사'
    ]
  },
  {
    company: 'SemiFive',
    role: 'CI/CD · 개발 환경 엔지니어 (입사 당시 SoC 설계 직무)',
    start: '2020-02',
    end: '2023-08',
    summary:
      'SoC 설계로 입사했지만 Jenkins를 계기로 사내 파이프라인과 설계 인프라를 만드는 일을 맡았습니다.',
    highlights: [
      '사내 Jenkins pipeline 설계 및 운영, 편의를 위해 만든 shared library가 이후 정식 jenkinsci plugin으로 발전',
      'SLURM 도입',
      'Jinja2 extension 개발 (GitHub 공개)',
      'SoC 프로젝트 regression 실행·리포트 환경 구축 (프로젝트당 2,000개 이상의 test vector)',
      'Scala 기반 FIRRTL transformer 개발',
      'Document generator 개발'
    ]
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
