import { error } from '@sveltejs/kit';
import { getProjectBySlug, projectItems } from '$lib/content.js';

export function entries() {
  return projectItems.map((project) => ({ slug: project.slug }));
}

export function load({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    error(404, 'Project not found');
  }

  return { project };
}
