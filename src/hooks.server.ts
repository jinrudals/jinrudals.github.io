import type { Handle } from '@sveltejs/kit';

export const handle: Handle = ({ event, resolve }) => {
  const lang = /^\/en(\/|$)/.test(event.url.pathname) ? 'en' : 'ko';
  return resolve(event, { transformPageChunk: ({ html }) => html.replace('<html lang="ko">', `<html lang="${lang}">`) });
};
