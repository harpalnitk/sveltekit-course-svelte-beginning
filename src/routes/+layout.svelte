<script>
    import '../app.css';
    import Head from '$lib/Head.svelte';

    function onRouteChange(){
      console.log(window.location.hash);
    }
  </script>
  
  <Head/>

<nav>
  <ul>
    <li><a href="/counter">Counter</a></li>
    <li><a href="/todos">Todos</a></li>
    <li>
        <a href="/actions">Actions</a></li>
    <li><a href="/home">Home</a></li>
    <li><a href="/context">Context API</a></li>
    <li><a href="/module-context">Module Context</a></li>
    <li><a href="/settings">Settings</a></li>
  </ul>
</nav>
<!-- below hashchange not working read on it more  -->
<svelte:window on:hashchange={onRouteChange}/>

  
  <slot />

  <style lang='scss'>
    ul{
        list-style: none;
        display: flex;
        li{
            margin-left: 1rem;
        }
    }
</style>
