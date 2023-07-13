<script lang="ts">
	import type { ActionData } from "./$types";

    //data returned from server when form is submitted
	
	//this form prop will be populate in +page.svelte of route
	//where +page.server.ts file is located

	//however we can also access form results from pagestores

	import {page} from '$app/stores'; 
    //$page.form will have same results as form but it can be accessed
	//anywhere in the application
	//$page.status will also be populated based on form return value


	export let form: ActionData;

	$: console.log(form);

</script>

{#if form?.success}
<p style='color:green'>You are now logged in!</p>
{/if}
<!-- add action='/login'  if we need to access action in page,server.ts 
file from a different route i.e. form is in different route -->

<!-- if we need to redirect to the same page in which the form is present 
we need to give query parameters like this 

in case of default action

<form method='POST' action='/login?redirectTo={$page.url.pathname}'>


	in case of named action

<form method='POST' action='/login?/login&redirectTo={$page.url.pathname}'>

-->


<form method='POST' action='?/login'>
    <label for="username">Username</label><br/>
    <input 
   id='username' name='username' placeholder="Username">
   <br/>
   {#if form?.usernameMissing}
	 <p style='color:orange'>Username is required!</p>
   {/if}
<br/><br/>
<label for="password">Password</label><br/>
<input  id='password' name='password' placeholder="Password" type="password">
<br/>
{#if form?.passwordMissing}
<p style='color:orange'>Password is required!</p>
{/if}
<br/><br/>
<button type="submit">Login</button>
</form>