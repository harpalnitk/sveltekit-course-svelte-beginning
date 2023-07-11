import { json, error } from '@sveltejs/kit';
import type {RequestHandler} from './$types'; 


export const GET: RequestHandler = async ({url,params,cookies,fetch}) => {

    //fetch function is similar to js fetch function with some
    //additional functionality

    const res = await fetch('https://dummyjson.com/users');

    if(res.ok){
        const resJSON = await res.json();
        return json(resJSON,{
            status:200
        })
    }
    throw error (res.status,res.statusText)
    
};