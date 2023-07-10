import type { Handle, HandleFetch, HandleServerError } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";


//this handle function will run every time
//sveltekit server receives a request
export const handle:Handle = async ({event,resolve})=> {
    //event is similar to server functions and contain stuff like
    //request,url,fetch,cookies,params etc.

    console.log(event.url.pathname);
    //  / for home,
    // /products  for server side product page load,
    // /products and /api/products for client side product page load

    console.log(event.isDataRequest); // true if data is accessed through client
    // i.e. page.svelte -> page.ts -> page.server.ts
    
    
    //! default behavior of sveltekit

    //! Locals
    //login token
    // we don't need locals for __data requests in /api routes
    if(!event.isDataRequest && !event.url.pathname.startsWith('/api')){
        const token = event.cookies.get('token');
        // console.log(token)
         event.locals.user = token ? {name:'John',id:1} : undefined;
      
    }
    const response = await resolve(event);
    //OR
    // const response = await resolve(event,{
    //     transformPageChunk: ({ html }) => html.replace('old', 'new'),
    //     filterSerializedResponseHeaders: (name) => name.startsWith('x-'),
    //     preload: ({ type, path }) => type === 'js' || path.includes('/important/')
    // });
    // read on above at:   https://kit.svelte.dev/docs/hooks#server-hooks-handle

    //! custom response
    // if(event.url.pathname) === '/products'){
    //     return new Response('Custom response');
    // }

    //response.headers.set('x-custom-header','custom-value');


    
    return response;

}

//! we can have multiple handle functions using sequence

// export const handle = sequence(handle1,handle2);


export const handleFetch: HandleFetch = ({request,event,fetch})=>{
    //it allows us to modify something when we call fetch from the server

    //may be we need to pass some authorization or cookies

    // in cross origin request cookies and headers are not going to
    //be included
    	// this request is different from the request in event.request
	// this is fetch request of url in fetch function
	if(request.url.startsWith('https://dymmyjson.com/')){
        const cookie = event.request.headers.get('cookie');
        if(cookie){
            request.headers.set('cookie',cookie);
        }
      }
      return fetch(request)
  
      ;
}

//only catches unexpected errors not thrown by us on server
export const handleError: HandleServerError = ({event,error})=>{
    console.log('from handle error hook Error:', error);

    //send to error loggong service

    //OR customize error

    return {
        message: 'An unexpected error has occurred.',
        code: 'UNEXPECTED_ERROR'

    }

}