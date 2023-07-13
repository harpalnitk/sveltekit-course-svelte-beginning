<script lang='ts'>

	import { goto,preloadCode,preloadData } from "$app/navigation";
	import { onMount } from "svelte";

    //gives information on the environment on which this page is running
    import {browser,building,dev,version} from '$app/environment';
//console.log({browser,building,dev,version});
//version is timestamp when app is built





    //! dynamic data in pre-rendering

    let data: string[] = [];
    onMount(()=>{
        setTimeout(()=>{
            data= ['Data1', 'Data2'];
        },1000)
    })

</script>
<h1>Home</h1>
 <!-- even though the page is statically rendered using pre-rendering 
 dynamic data will still be generated after page load  -->
{#if data.length > 0}
<ul>
    {#each data as item}
        <li>{item}</li>
    {/each}
</ul>

{/if}

<!-- to programatically preload data 

if on:mouseover is used if we don't use on:focus it
will give error so using on: focus with empty function
-->

<button 
on:focus={()=>{}}
on:mouseover={async ()=>{
    await preloadData('/products')
}}
on:click={()=>{
    goto('/products',{
        noScroll:true
    })
}}>Go to Products Page</button>






