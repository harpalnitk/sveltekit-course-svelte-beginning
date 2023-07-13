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

				<!-- attribute will run the load functions of the page as well as code 
				on second time visiting the page it will only load the data
			and not the code
		second option is 'tap' i.e. when we click but not release the mouse
	
	if used in nav then if we want to switch off for some link then
on that link use data-sveltekit-preload-data='off'

data-sveltekit-preload-code='hover' will only load code and not data

data-sveltekit-preload-code='eager' all the links on the page will be pre loaded
without hover

data-sveltekit-preload-code='viewport'  code will be loaded only when the
link appears in viewport

if links are rendered conditionally then viewport or eager will not work

data-sveltekit-reload : client side navigation will not be used and 
page will be refreshed

data-sveltekit-noscroll: previous scroll position of page will be maintained
in the new page

also can be used conditionally using a variable e.g. noScroll

data-sveltekit-noscroll ={noScroll ? '': 'off'}

-->
				<li><a href="/products" data-sveltekit-preload-data='hover'>Products</a></li>
				<li><a href="/settings">Settings</a></li>
				<li><a href="/users">Users</a></li>

				<!-- it will not update until we refresh the page  -->
				{#if !data.user}
					<li><a href="/login">Login</a></li>
					<li><a href="/login-form-action">Login-Using-Form-Action</a></li>
				{/if}

			</ul>
		</nav>
		{#if data.user}

		<!-- using api -->
			<!-- <button
				on:click={async () => {
					const res = await fetch('/api/logout', {
						method: 'POST'
					});
					if (res.ok) {
						await invalidateAll();
					}
				}}>Logout</button> -->

				<!-- using FORM ACTION -->

				<form method='POST' action="/login-form-action?/logout&redirectTo={$page.url.pathname}">
					<button type="submit">Logout</button>
				</form>

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
		flex-wrap: wrap;
		li {
			margin-left: 1rem;
		}
	}
</style>
