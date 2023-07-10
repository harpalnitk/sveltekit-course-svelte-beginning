<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const {users} = data.users;
	//console.log(users);
</script>

<h1>Users Page</h1>
<!-- <pre>{JSON.stringify(data.users)}</pre> -->

<ul>
	{#each users as user}
	<li>
	<h2>{user.id}</h2>	
	<h3><a href="/users/{user.id}">{user.firstName}</a></h3>
	</li>
{/each}
</ul>

<style>
	ul{
		list-style: none;
		
	}
	li{
		display: flex;
		gap: 1rem;
	}
	a{
		text-decoration: none;
	}
</style>



