import {cubicInOut} from 'svelte/easing';


//node: DOM node to which transition is applied

export default function spin(
    node,
    {
        delay=0,
        duration=400,
        easing=cubicInOut,
        spin=1
    }
    )
    {

        const originalOpacity = +getComputedStyle(node).opacity;
       //if we don't have any transforms then we will get none
       //but in our custom animation we don't want to put none
       //but empty strings
        const originalTransform = getComputedStyle(node).
        transform.replace('none','');
        return {
            delay,
            duration,
            easing,
            //css: (t,u) t will change from 0 to 1 in in 
//transitions and 1 to 0 in out transitions
//u = 1-t; we will only use t and not u
            css:(t) => {
                return `
                opacity:${t * originalOpacity};
                transform: ${originalTransform} scale(${t}) rotate(${spin * 360 * t}deg)
                `

            }
        }

}