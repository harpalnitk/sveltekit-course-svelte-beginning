<script lang="ts">
	import '../app.css';
	import Head from '$lib/Head.svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	export let data: LayoutData;

	function onRouteChange() {
		console.log(window.location.hash);
	}
</script>

<Head />

<!-- below hashchange not working read on it more  -->
<svelte:window on:hashchange={onRouteChange} />

<!-- example of passing data from page to the root layout  -->
<svelte:head>
	<title>Website Name {$page.data.title ? `-${$page.data.title}` : ''}</title>
	{#if $page.data.description}
		<meta name="description" content={$page.data.description} />
	{/if}
</svelte:head>

<!--  however we can conditionally render layouts 
like for settings URL we don't want any root layout -->
{#if $page.url.pathname.startsWith('/settings')}
	<slot />
{:else}
	<div style:background="#f03" style:padding="10px">
		<nav>
			<ul>
				<li><a href="/counter">Counter</a></li>
				<li><a href="/todos">Todos</a></li>
				<li>
					<a href="/actions">Actions</a>
				</li>
				<li><a href="/home">Home</a></li>
				<li><a href="/context">Context API</a></li>
				<li><a href="/module-context">Module Context</a></li>
				<li><a href="/products">Products</a></li>
				<li><a href="/settings">Settings</a></li>

				<!-- it will not update until we refresh the page  -->
				{#if !data.user}
					<li><a href="/login">Login</a></li>
				{/if}
			</ul>
		</nav>
		{#if data.user}
			<button
				on:click={async () => {
					const res = await fetch('/api/logout', {
						method: 'POST'
					});
					if (res.ok) {
						await invalidateAll();
					}
				}}>Logout</button
			>
		{/if}

		<h3>Root Layout</h3>

		<slot />

		<footer style="margin-top: 80px;">All rights reserved</footer>
	</div>
{/if}

<style lang="scss">
	ul {
		list-style: none;
		display: flex;
		li {
			margin-left: 1rem;
		}
	}
</style>
