//this function will run both on server and client
// if we rename this file to +page.server.ts   
//then it will run only on the server

//however when we navigate to this page on client
//a special _data.json request will go to server and 
//this load function will return on server
//and data will be sent back to the client

import type { PageServerLoad } from './$types';

//type definitions does not give error in async functions
export const load: PageServerLoad = async ({parent}) => {

	//data from layout is also available in pages and layouts
    //data from all parent layouts (including nested)
	const parentData = await parent();

	console.log('Products Load Function');

	const products = await (await import('$lib/data/dummy-products.json')).default;
	//console.log(products);

	return { products };
};
