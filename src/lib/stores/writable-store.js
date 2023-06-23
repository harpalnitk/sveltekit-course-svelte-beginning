//writable store : both read and write

import { writable } from "svelte/store";

const settings = writable({
    colorScheme:'dark',
    language:'en',
    fontSize: 12
},(set)=>{
    // const timer = setTimeout(()=>{
    //     set({
    //         colorScheme:'light',
    //         language:'en',
    //         fontSize: 12
    //     })
    // },1000)
    // //this is useful when we need to get our 
    // //settings from a remote endpoint
    // console.log('This function will run when subscribers go from 0 to 1');
    // return ()=>{
    //     clearTimeout(timer)
    //     console.log('from 1 to 0 subscribers')
    // }
})

export default settings;