//this function will run both on server and client
// if we rename this file to +page.server.ts   
//then it will run only on the server

import type { PageLoad } from './$types';

//type definitions does not give error in async functions
export const load: PageLoad = async ({data}) => {

	// if we have both page.ts and page.server.ts then
	// data from page.server.ts file is available to page.ts
	//file with data input field to load function
	console.log('Products Load Function');

	//const products = await (await import('$lib/data/dummy-products.json')).default;
	//console.log(products);

	return { products: data.products,
	title:'Products List' };
};
