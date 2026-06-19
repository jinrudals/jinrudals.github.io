export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/study', label: 'Study' },
  { href: '/projects', label: 'Projects' },
  { href: '/career', label: 'Career' }
];

/**
 * @typedef {object} StudyPost
 * @property {string} slug
 * @property {string} category
 * @property {string} title
 * @property {string} date
 * @property {string[]} tags
 * @property {string} summary
 * @property {string[]} body
 */

/**
 * @typedef {object} ProjectItem
 * @property {string} slug
 * @property {string} title
 * @property {string} period
 * @property {string} role
 * @property {string[]} stack
 * @property {string} summary
 * @property {string[]} highlights
 */

export const studyCategories = [
  {
    id: 'backend',
    label: 'Backend',
    description: '서버 애플리케이션, API, 데이터 처리, 운영 관점의 정리'
  },
  {
    id: 'frontend',
    label: 'Frontend',
    description: '웹 UI, SvelteKit, 브라우저 동작, 접근성 정리'
  },
  {
    id: 'cs',
    label: 'CS',
    description: '네트워크, 운영체제, 데이터베이스, 컴퓨터 구조 기본기'
  },
  {
    id: 'infra',
    label: 'Infra',
    description: 'Linux, 배포, 클라우드, 관측 가능성, 자동화'
  },
  {
    id: 'ai',
    label: 'AI',
    description: 'AI 도구 활용, 모델 API, 자동화 실험 기록'
  },
  {
    id: 'til',
    label: 'TIL',
    description: '짧게 배운 것과 실수에서 남기는 메모'
  }
];

/** @type {StudyPost[]} */
export const studyPosts = [];

/** @type {ProjectItem[]} */
export const projectItems = [];

export const careerLinks = [
  {
    href: '/career/resume',
    label: 'Resume',
    description: '기술스택, 프로젝트 요약, 경력 정보를 빠르게 볼 수 있는 문서'
  },
  {
    href: '/career/cover-letter',
    label: 'Cover Letter',
    description: '지원 맥락에 맞춰 다듬을 수 있는 자기소개서 공간'
  },
  {
    href: '/career/portfolio',
    label: 'Portfolio',
    description: '제출용 프로젝트 묶음과 상세 프로젝트 페이지 링크'
  }
];

export const featuredProjects = projectItems.slice(0, 2);
export const recentStudyPosts = [...studyPosts].slice(0, 4);
export const studyLabels = [...new Set(studyPosts.flatMap((post) => post.tags))]
  .sort()
  .map((id) => ({
    id,
    label: id
  }));

/**
 * @param {string} id
 */
export function getStudyCategory(id) {
  return studyCategories.find((category) => category.id === id);
}

/**
 * @param {string} category
 * @param {string} slug
 */
export function getStudyPost(category, slug) {
  return studyPosts.find((post) => post.category === category && post.slug === slug);
}

/**
 * @param {string} label
 */
export function getStudyPostsByLabel(label) {
  return studyPosts.filter((post) => post.tags.includes(label));
}

/**
 * @param {{ tags: string[] } | undefined} post
 */
export function getStudyPostLabels(post) {
  if (!post) {
    return [];
  }

  return post.tags
    .map((tag) => studyLabels.find((label) => label.id === tag))
    .filter((label) => label !== undefined)
    .sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * @param {string} slug
 */
export function getProjectBySlug(slug) {
  return projectItems.find((project) => project.slug === slug);
}
