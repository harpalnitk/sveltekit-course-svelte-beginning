import type { PageServerLoad } from './$types';

export const load = (async ({fetch}) => {
	const res = await fetch('https://dummyjson.com/users?limit=6');

    const users = await res.json();

	return {
		users
	};
}) satisfies PageServerLoad;

//by default all pages are SSR; however if we export ssr = false
//ssr will be turned off

//! export const ssr = false;
//turn off client side rendering also; nothing will be rendered on the page
//export const csr = false;

//if ssr is true and csr false then client side navigation will not work
// and on each link click entire page will be loaded

//! export const trailingSlash = 'never'; // always; ignore

//never is default and url will never have trailingSlash

//trailingSlash option can also be added to api endpoints

// if these options are used in layouts(layout.ts,layout.server.ts) then all child pages of those layout
//will use these options

// these options can also be set in +page.ts


//! PRERENDERING
//this will render the users page as static html file; in output/prerendered folder
//however since this page has dynamic content it will not work
//for this page
// even endpoints can be pre-rendered
//e.g. /api/random-number
export const prerender = true;

// if we are fetching from /api/users i.e. our own endpoint
// then that endpoint should only have GET method
//if it has POST method then error will be thrown

// if we load users page by refresh we will get static html page generated
//during build time

//however if we go to users page through client side navigation
//_data.json request will be made to the server where data is already stored 
// in a json file and we will not hit the external server for the
//data

