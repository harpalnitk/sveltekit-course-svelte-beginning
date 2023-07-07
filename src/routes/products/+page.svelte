<script lang='ts'>
   
   import type {PageData} from './$types';
   export let data: PageData;

   // console.log(data);
    $: products = data.products.products || [];
    //$: console.log(products);
</script>

<h2>{data.title}</h2>

<!-- data coming from root layout server file  -->
<h3>User: {data.user.name}</h3>

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