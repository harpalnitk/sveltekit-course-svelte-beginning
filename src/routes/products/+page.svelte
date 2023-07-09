<script lang='ts'>
	import { invalidate } from '$app/navigation';

   
   import type {PageData} from './$types';
   export let data: PageData;

   // console.log(data);
    $: products = data.products.products || [];
    //$: console.log(products);
</script>

<h2>{data.title}</h2>

<!-- data coming from root layout server file  -->
<h3>User: {data?.user?.name}</h3>
<button on:click={()=>{

    // if there is fetch with this url in the load function
    //then the load function will re-run on calling
    //invalidate with the url in fetch function
    //invalidate('https://dummyjson.com/users')

    //USING AN IDENTIFIER
    //invalidate('app:products');
    
    //OR USE FUNCTION; if you don't know the exact URL
     //on which load function depends
     invalidate(url=> {
        //return true to invalidate based on your own check
        return url.hostname === 'dummyjson.com'
     })

     //! this also works for page.server.ts file
     // but for URL invalidation there is bug in svelte
     //however depnds invalidation will work


    }}>Re-Run Load function</button>

{#if products && products.length > 0}
    <ul>
        {#each products as product}
        <li>
            <img src={product.thumbnail} alt={product.title}>
            <h3><a href="/products/{product.id}">{product.title}</a></h3>
            <p>{product.description}</p>
        </li>
            
        {/each}
    </ul>
{/if}

<style>
    ul{
        padding: 0;
        margin: 0;
        list-style: none;
        display: grid;
        grid-template-columns: repeat(2, minmax(0,1fr));
        gap: 30px;
    }
    img{
        width: 100%;
    }
</style>