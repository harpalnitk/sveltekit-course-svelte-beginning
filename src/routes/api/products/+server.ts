//! what happens if this file instead of being in api folder
//is in normal route folder alongwith page.ts file

// if the header is application/json and this file is in products folder
//along with page.ts we will get json response; however if request is from browser
//with header accept text/html we will get html response
//from page.ts and page.svelte




import { json, error } from '@sveltejs/kit';
import type {RequestHandler} from './$types'; 


export const GET: RequestHandler = async ({url,params,cookies,fetch}) => {

    //fetch function is similar to js fetch function with some
    //additional functionality

    const res = await fetch('https://dummyjson.com/products');

    if(res.ok){
        const resJSON = await res.json();
        return json(resJSON,{
            status:200
        })
    }
    throw error (res.status,res.statusText)
    
    
//USING LOAD FILE FROM SERVER

    //const products = await (await import('$lib/data/dummy-products.json')).default;

    //!Response is javascript standard response
    
    // return new Response(JSON.stringify(products),{
    //     status: 200
    // });

    // return json(products,{
    //     status:200
    // })

    //throw error(401,'Not authorized')
};


//! to handle post request better way is form action in svelte kit
//which works without js enabled in browser

export const POST: RequestHandler =  async ({request}) => {
    // in body of request if  we send {
//   "title":"Product title"
// }
const product = await request.json();
console.log(product); // { title: 'Product title' }

if (!product.title){
    throw error(400,'Product title is required');
}

return json({id:1, title: product.title},{
    status: 200
})
}