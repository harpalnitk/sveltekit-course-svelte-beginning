//this function will run both on server and client
// if we rename this file to +page.server.ts   
//then it will run only on the server

import type { PageLoad } from './$types';

//! Acess environment variables
import {env} from '$env/dynamic/public';

//! import javascript files only on server
//import {secret} from './secrets.server';  // will give error

//type definitions does not give error in async functions
export const load: PageLoad = async ({data,url,route,
params,parent,fetch,depends,setHeaders}) => {

	// what we get from page.server.ts if that file exists
	//console.log('Data: ', data);
	//console.log('url: ', url);//standard js URL object
	//console.log('route: ', route);//information about route /products
	//console.log('params: ', params);
	//console.log('parent: ', await parent());//returns data from parent layout
	//console.log('fetch: ', fetch);
	//console.log('depends: ', depends);
	//console.log('setHeaders: ', setHeaders);//to set headers like caching for your page
	//this will have effect only when load function runs on server
	//on client it will not have any effect
	// setHeaders({
	// 	age:'100',
	// 	'cache-control':'max-age=604800'
	// })

	// if we have both page.ts and page.server.ts then
	// data from page.server.ts file is available to page.ts
	//file with data input field to load function
	//console.log('Products Load Function');

	//const products = await (await import('$lib/data/dummy-products.json')).default;
	//console.log(products);

	//LOAD FUNCTION INVALIDATION
	fetch('https://dummyjson.com/users');
	//OR use an identifier
	depends('app:products')

	return { products: data.products,
	title:'Products List' };
};
