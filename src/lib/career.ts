import type { Lang } from './i18n';

export type Localized<T> = Record<Lang, T>;

export interface Career {
  company: Localized<string>;
  team: Localized<string[]>; // chronological team affiliations
  start: string; // YYYY-MM
  end?: string; // omit for current
  summary: Localized<string>;
  highlights: Localized<string[]>;
  stack: string[];
}

export const career: Career[] = [
  {
    company: { ko: '한온시스템', en: 'Hanon Systems' },
    team: {
      ko: ['Platform SW 팀 (차량 Embedded SW 플랫폼)'],
      en: ['Platform SW Team (vehicle embedded SW platform)']
    },
    start: '2026-08',
    summary: { ko: '글로벌 cloud-native DevOps 환경 구축', en: 'Building a global cloud-native DevOps environment' },
    highlights: {
      ko: ['AWS, Terraform 기반 글로벌 DevOps 환경 구축'],
      en: ['Built a global DevOps environment on AWS and Terraform']
    },
    stack: ['AWS', 'Terraform']
  },
  {
    company: { ko: '오픈엣지코리아', en: 'OpenEdge Korea' },
    team: { ko: ['IT 팀'], en: ['IT Team'] },
    start: '2026-05',
    end: '2026-08',
    summary: {
      ko: 'Kubernetes 기반 병렬 파일 시스템 도입',
      en: 'Introduced a Kubernetes-based parallel file system'
    },
    highlights: {
      ko: ['Kubernetes 위에 Rook-Ceph(병렬 파일 시스템) 적용'],
      en: ['Deployed Rook-Ceph (parallel file system) on Kubernetes']
    },
    stack: ['Kubernetes', 'Rook-Ceph']
  },
  {
    company: { ko: '보스반도체', en: 'BOS Semiconductor' },
    team: { ko: ['SW 팀', 'IT Infra 팀'], en: ['SW Team', 'IT Infra Team'] },
    start: '2023-08',
    end: '2026-05',
    summary: {
      ko: '설계 검증·품질 관리 시스템 개발 및 사내 AI 도구 조사',
      en: 'Built design verification and quality management systems; researched in-house AI tools'
    },
    highlights: {
      ko: [
        'Design Verification Regression System 개발: regression 실행 및 리포트 환경',
        '유사한 구조의 Design Quality System 개발',
        'SLURM 앞단에서 회사 정책을 적용하는 Task Manager 설계 (구현은 후배 담당)',
        'BeeGFS 탐색 및 운영',
        '사내 AI 활용을 위한 MCP gateway, LLM proxy 등 도구 조사'
      ],
      en: [
        'Developed the Design Verification Regression System: regression execution and reporting environment',
        'Developed the Design Quality System, built on a similar structure',
        'Designed a Task Manager that applies company policy in front of SLURM (implemented by a junior colleague)',
        'Evaluated and operated BeeGFS',
        'Researched tools for in-house AI use, such as an MCP gateway and LLM proxy'
      ]
    },
    stack: ['Django', 'Webhook', 'Kafka', 'SLURM', 'BeeGFS']
  },
  {
    company: { ko: 'SemiFive', en: 'SemiFive' },
    team: {
      ko: ['Logic Design Team (현 Logic Design Center)'],
      en: ['Logic Design Team (now Logic Design Center)']
    },
    start: '2020-02',
    end: '2023-08',
    summary: {
      ko: 'SoC 설계로 입사 후 CI/CD 및 설계 인프라 담당',
      en: 'Joined as an SoC design engineer, then took on CI/CD and design infrastructure'
    },
    highlights: {
      ko: [
        '사내 Jenkins pipeline 설계 및 운영',
        '편의를 위해 만든 shared library가 정식 jenkinsci plugin으로 발전',
        'SLURM 도입',
        'Jinja2 extension 개발 (GitHub 공개)',
        'SoC 프로젝트 regression 실행·리포트 환경 구축 (프로젝트당 2,000개 이상 test vector)',
        'Scala 기반 FIRRTL transformer 개발',
        'Document generator 개발'
      ],
      en: [
        'Designed and operated the in-house Jenkins pipelines',
        'A shared library built for convenience grew into an official jenkinsci plugin',
        'Introduced SLURM',
        'Developed a Jinja2 extension (open-sourced on GitHub)',
        'Built the regression execution and reporting environment for SoC projects (2,000+ test vectors per project)',
        'Developed Scala-based FIRRTL transformers',
        'Developed a document generator'
      ]
    },
    stack: ['Jenkins', 'SLURM', 'Jinja2', 'Scala', 'FIRRTL']
  }
];

export interface Education {
  school: Localized<string>;
  major: Localized<string>;
  start: string;
  end: string;
}

export const education: Education[] = [
  {
    school: { ko: '성균관대학교', en: 'Sungkyunkwan University' },
    major: { ko: '전자전기공학부', en: 'Electrical and Electronic Engineering' },
    start: '2014-03',
    end: '2020-02'
  }
];
