import type { PageLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageLoad;

//will pre render the home page
export const prerender=true;
