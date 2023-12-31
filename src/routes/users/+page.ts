import type { PageLoad } from './$types';

export const load:PageLoad = (async ({data,fetch}) => {
	// const res = await fetch('https://dummyjson.com/users');

    // const users = await res.json();

	return { users: data.users,
		title:'Users List' };
}) satisfies PageLoad;


//this will render the users page as static html file; in output/prerendered folder
//however since this page has dynamic content it will not work
//for this page
// even endpoints can be pre-rendered
//e.g. /api/random-number
export const prerender = true;
