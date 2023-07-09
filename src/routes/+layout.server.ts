//this file will run only on server

import type { LayoutServerLoad } from "./$types";

//it will check if user is authenticated or not

//This load function will run only once when we load our application
//load function will not re-run again if cookies change

// HOWEVER by using invalidateAll we can re-run this load function
//also any other load function using data returned by this load
// function will also re-run
export const load: LayoutServerLoad = ({cookies})=> {

    //token set in /api/login/+server.ts file during login process
    const token = cookies.get('token');
    //get user from token in real world
    console.log('cookies in root layoout server file');

    const user = {name:'john', id: 1}

    //Anydata we return here will be 
    //available to all pages (products pages  both svelte page and page.ts)
    // and also to children layouts (settings layout)
    return {
        user: token ? user: null
    }

}