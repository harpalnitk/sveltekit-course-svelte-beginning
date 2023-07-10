//only catches unexpected errors not thrown by us on client

import type { HandleClientError } from "@sveltejs/kit";

// in page.ts file or page.svelte file
export const handleError: HandleClientError = ({event,error})=>{
    console.log('from handle error hook Error:', error);

    //send to error loggong service

    //OR customize error

    return {
        message: 'An unexpected error has occurred.',
        code: 'UNEXPECTED_ERROR'

    }

}