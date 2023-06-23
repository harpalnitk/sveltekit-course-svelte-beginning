// import {writable} from 'svelte/store';
import { spring } from 'svelte/motion';


//spring will also create a writable store
// duration of spring depends upon 
//stiffness and damping parameters

//we can't have colors or strings in spring
const boxProps = spring(
	{ scale: 1, width: 100, height: 100 },
    //stiffness value from 0 to 1;higher value means tighter spring
    //damping: 0 to 1 ; lower value means bouncy spring
    {stiffness:0.1, damping:0.3}
);

export default boxProps;
