import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return new Response(String(Math.random()));
};

//this will run this function only once during build time 
//and will store the response somewhere
//same random number will be returned everytime
export const prerender = true;

//to check
//> npm run build
//> npm run preview
//preview will run build app using a different port
