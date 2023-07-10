import type { PageServerLoad } from './$types';

export const load = (async ({fetch}) => {
	const res = await fetch('https://dummyjson.com/users');

    const users = await res.json();

	return {
		users
	};
}) satisfies PageServerLoad;

//by default all pages are SSR; however if we export ssr = false
//ssr will be turned off

export const ssr = false;
//turn off client side rendering also; nothing will be rendered on the page
//export const csr = false;

//if ssr is true and csr false then client side navigation will not work
// and on each link click entire page will be loaded

export const trailingSlash = 'never'; // always; ignore
//never is default and url will never have trailingSlash

//trailingSlash option can also be added to api endpoints

// if these options are used in layouts(layout.ts,layout.server.ts) then all child pages of those layout
//will use these options

// these options can also be set in +page.ts
