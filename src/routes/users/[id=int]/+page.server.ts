import type { PageServerLoad } from './$types';

export const load = (async ({params}) => {

   const userId = params.id;

   const res = await fetch(`https://dummyjson.com/users/${userId}`);

   const user = await res.json();


	return {
		user
	};
}) satisfies PageServerLoad;


export const prerender=true;
//it will automatically generate 6 individual user pages
//without us telling it anything about dynamic params
// however if we access /users/7 it will give error

//however prerender='auto'   will shift to SSR for all those
//users links which are not pre-rendered
