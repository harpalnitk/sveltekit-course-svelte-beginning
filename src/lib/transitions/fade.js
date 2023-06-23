import {cubicInOut} from 'svelte/easing';
export default function fade(
    node,
    {delay=0,duration=400,easing=cubicInOut})
    {
        const originalOpacity = +getComputedStyle(node).opacity;
      return{
        delay,
        duration,
        easing,
        //  t will change from 0 to 1 
        tick:(t)=>{
              node.style.opacity = t * originalOpacity;
        }
      }
}