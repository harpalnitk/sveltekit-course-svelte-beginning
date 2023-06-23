<script>
	// actions are very similar to lifecycle functions except
	// that they are used on DOM elemnts and not svlete components

	//1. Initializing a 3rd party plugin on a DOM element
	//2. add custom event handlers on DOM elements

	import longpress from '$lib/actions/longpress';
	import { onMount } from 'svelte';

    import tippy from 'tippy.js';
    import 'tippy.js/dist/tippy.css';

	let showButton = true;
	let duration = 1000;
    let tippyButton;

    import tippyAction from '$lib/actions/tippy-action';


onMount(()=>{
    tippy('.tooltip',{
        content:'tooltip content'
    })
    tippy(tippyButton,{
        content:'tippy binded button content'
    });
});


let tippyActionContent = 'Hello';
</script>

<h1>Actions</h1>

<!-- there is no browser in built functionality for longpress 
so we need to use svelte actions  -->
<label><input type="checkbox" bind:checked={showButton} />Toggle</label>

{#if showButton}
	<button 
    use:longpress={{ duration: duration }}
    on:longpress={()=>{alert('pressed')}}
    >Long Press Button</button>
{/if}

<label for="">
    <input type="range" bind:value={duration} max={4000} step={100}>
    {duration}ms
</label>


<h1>Initializing a 3rd party plugin on a DOM element</h1>

<button class="tooltip">Tippy Button</button>
<button class="tooltip" data-tippy-content='some other text'>Tippy Button</button>
<button bind:this={tippyButton}>Tippy Button Binded</button>


<!-- using actions all this tippy functionality can be exported to action file  -->
<h1>Tippy using actions</h1>

<input type="text" bind:value={tippyActionContent}>
<button use:tippyAction={{content:tippyActionContent
,placement:'right',theme:'light'}}>Tippy Button Using Actions </button>
<style>
</style>
