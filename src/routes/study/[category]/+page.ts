import { error } from '@sveltejs/kit';
import { getStudyCategory, studyCategories, studyPosts } from '$lib/content.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => {
  return studyCategories.map((category) => ({ category: category.id }));
};

export const load: PageLoad = ({ params }) => {
  const category = getStudyCategory(params.category);

  if (!category) {
    error(404, 'Study category not found');
  }

  return {
    category,
    posts: studyPosts.filter((post) => post.category === category.id)
  };
};
