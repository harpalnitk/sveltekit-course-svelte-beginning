<script lang='ts'>
import {page} from '$app/stores';

import type {PageData} from './$types';

export let data: PageData;

$: product = data.product;
</script>


<!-- <svelte:head>
	<title>{product?.title}</title>
<meta name="description" content={product.description}>
</svelte:head> -->

<h3>param = int checks if params is of type 
	integer something enforced by this app</h3>

PRODUCT ID : {JSON.stringify($page.params)}

<h2>Product</h2>
<img src={product?.thumbnail} alt={product?.title}>
<h1>{product?.title}</h1>
<p>{product?.description}</p>

<style>
	img{
		width: 300px;
	}
</style>
