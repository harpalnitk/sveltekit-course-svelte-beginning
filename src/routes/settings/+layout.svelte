<!-- by default layouts inside sub-routes will inherit
 main layouts -->

 <script lang='ts'>
	import type { LayoutData } from "./$types";


    export let data: LayoutData
 </script>



<h3>Settings for user : {data.user.name}</h3>
 <div style:background='#b779d1' style:padding='10px'>
<nav>
<a href="/settings">Settings</a>
<a href="/settings/general">General Settings</a>
<a href="/settings/profile">Profile Settings</a>
</nav>
<h3>Settings Layout</h3>

<slot/>
</div>
