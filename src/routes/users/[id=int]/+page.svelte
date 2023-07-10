<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const user = data.user;
</script>

<h2>User Id: {user.id}</h2>
<h3>User First Name: {user.firstName}</h3>
