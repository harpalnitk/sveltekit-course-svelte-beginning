//this file will run only on server

import type { LayoutServerLoad } from "./$types";

//it will check if user is authenticated or not

export const load: LayoutServerLoad = ()=> {

    const user = {name:'john', id: 1}

    //Anydata we return here will be 
    //available to all pages (products pages  both svelte page and page.ts)
    // and also to children layouts (settings layout)
    return {
        user
    }

}