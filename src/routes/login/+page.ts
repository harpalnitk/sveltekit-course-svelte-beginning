// to disable visiting login page both on client 
// and server if user is logged in 

import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load:PageLoad = async ({parent})=> {
    //get data from root layout using parent
    //in root layout user is returned

    //here we destructure the root layout returned data
    // to extract user
const  {user} = await parent();
if(user){
    // 307 is code for temporary redirect
    throw redirect(307,'/');
}
    }
