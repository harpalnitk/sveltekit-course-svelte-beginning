//derived store values depnd on other stores

import {derived} from 'svelte/store';
import settings from '$lib/stores/custom-store';
import location from '$lib/stores/readable-store';


//direction of text in website depends on language selected
//in settings store

//instead of one store array of multiple stores can also be passed
const direction = derived([settings,location], ([$settings,$location],set)=>{
    const timer = setTimeout(()=>{
        set($settings.lang === 'ar' ? 'rtl' : 'ltr')
    },1000)
   // return $settings.lang === 'ar' ? 'rtl' : 'ltr';

   //runs when there are no subscribers
   return ()=>{
         clearTimeout(timer);
   }
},'default value');

export default direction;
