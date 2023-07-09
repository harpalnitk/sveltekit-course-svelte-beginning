<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
    import type { PageData } from './$types';
    
    export let data: PageData;

    let username = '';
    let password = '';

    const login = async ()=>{
         const res = await fetch('/api/login',{
            method:'POST',
            body: JSON.stringify({
                username,
                password
            })
         })
         const resJSON = await res.json();
         if(res.ok){
            goto('/',{
                invalidateAll: true
            });
            // in order to re-render root layout
            //we need to re-run all load functions
            //invalidate all runs all load functions again in
            //all layouts
            
            //await invalidateAll()
            //OR ELSE call invalidateAll in goto function itself
         }else{
            alert(resJSON.message)
         }

        
         console.log(resJSON);
    }
</script>

<form on:submit|preventDefault={login}>
    <label for="username">Username</label><br/>
    <input 
    bind:value={username} id='username' name='username' placeholder="Username">
<br/><br/>
<label for="password">Password</label><br/>
<input 
bind:value={password} id='password' name='password' placeholder="Password" type="password">
<br/><br/>
<button type="submit">Login</button>
</form>