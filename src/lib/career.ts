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
