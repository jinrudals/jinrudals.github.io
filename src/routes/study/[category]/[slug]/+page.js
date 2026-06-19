import { error } from '@sveltejs/kit';
import { getStudyCategory, getStudyPost, studyPosts } from '$lib/content.js';

export function entries() {
  return studyPosts.map((post) => ({ category: post.category, slug: post.slug }));
}

export function load({ params }) {
  const post = getStudyPost(params.category, params.slug);
  const category = getStudyCategory(params.category);

  if (!post || !category) {
    error(404, 'Study post not found');
  }

  return { post, category };
}
