<script lang='ts'>
    import {page} from '$app/stores';
</script>

<h1>error.svelte page in /routes/products/[id]</h1>
<h2>{$page.status}: {$page.error?.message}</h2>
<h3>Code: {$page.error?.code}</h3>