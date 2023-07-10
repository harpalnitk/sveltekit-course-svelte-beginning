<script>

	import { goto,preloadCode,preloadData } from "$app/navigation";

</script>
<h1>Home</h1>

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






