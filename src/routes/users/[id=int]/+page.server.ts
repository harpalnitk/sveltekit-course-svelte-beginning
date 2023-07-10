import type { PageServerLoad } from './$types';

export const load = (async ({params}) => {

   const userId = params.id;

   const res = await fetch(`https://dummyjson.com/users/${userId}`);

   const user = await res.json();


	return {
		user
	};
}) satisfies PageServerLoad;
