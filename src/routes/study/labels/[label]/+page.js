import { error } from '@sveltejs/kit';
import { getStudyPostsByLabel, studyLabels } from '$lib/content.js';

export function entries() {
  return studyLabels.map((label) => ({ label: label.id }));
}

export function load({ params }) {
  const label = studyLabels.find((item) => item.id === params.label);

  if (!label) {
    error(404, 'Study label not found');
  }

  return {
    label,
    posts: getStudyPostsByLabel(label.id)
  };
}
