//this function will run both on server and client
// if we rename this file to +page.server.ts   
//then it will run only on the server

//however when we navigate to this page on client
//a special _data.json request will go to server and 
//this load function will return on server
//and data will be sent back to the client

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

//type definitions does not give error in async functions
export const load: PageServerLoad = async ({
	parent,
	url,
	route,
	params,
	fetch,
	depends,
	cookies,
	getClientAddress,// gives client address
	locals, //related to hooks
	platform,//platform where we are deploying our application
	setHeaders
}) => {

	//data from layout is also available in pages and layouts
    //data from all parent layouts (including nested)
	const parentData = await parent();

	console.log('Products Load Function');

	//calling our own endpoints in server.ts file using svelte fetch function
	//in normal js fetch function full path needs to be provided

	//this will not actually send an http request
	//but only call the GET function in our own server.ts file

	//when we use fetch on the server
	//also we can make authorized request as it will inherit cookies
	//and authorization headers
	const res = await fetch('/api/products');
	if(res.ok){
		//return { products: await res.json() }
		// we can also return promise directly without awaiting
		//page will still work fine
		return { products:  res.json() }

	}
	// thismis our own error thrown from server.ts file
	//and it will be in the body of the response
	const errorJSON = await res.json()
	throw error(res.status, errorJSON.message);

	//const products = await (await import('$lib/data/dummy-products.json')).default;
	//console.log(products);

	;
};
