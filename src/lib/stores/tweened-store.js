// import {writable} from 'svelte/store';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import {interpolateRgb} from 'd3-interpolate';

//tweened will also create a writable store
// whose value will change over time

//using color purple will give error cannot interpolate string
//values, so we add our own interpolate function
//to interpolate string values
const boxProps = tweened(
	{ scale: 1, width: 100, height: 100, color: 'purple' },
	{
		duration: 400,
		easing: cubicOut,
		//for using color string values;
		//else not needed if only numerical values are used
		//a will be nitial object
		//b will be final object
		//we return another function where t is time
		interpolate: (a, b) => (t) => {
            const deltaScale = b.scale - a.scale;
            const deltaWidth = b.width - a.width;
            const deltaHeight = b.height - a.height;
            const color = interpolateRgb(a.color,b.color)(t);
			return {
                scale: a.scale + deltaScale * t,
                width: a.width + deltaWidth * t,
                height: a.height + deltaHeight * t,

                //use 3rd party library d3-interpolate
                //to interpolate between two colors
                color: color,
            };
		}
	}
);

export default boxProps;
