<script>
   // import { onDestroy } from 'svelte';
    import settings from '$lib/stores/writable-store';
    import location from '$lib/stores/readable-store';
    // let colorScheme;
    // const unsubscribe = settings.subscribe((settings) => {
    //   console.log('home subscribe');
    //   colorScheme = settings.colorScheme;
    // });
    // onDestroy(unsubscribe);

    import tweened from '$lib/stores/tweened-store';
    import spring from '$lib/stores/spring-store';
  </script>

<h2>Home</h2>

{$settings.colorScheme}
{#if $location && !$location.error}
<p>Location: Latitude: {$location.latitude}, Longitude: {$location.longitude}</p>
{/if}
{#if $location && $location.error}
<p>{$location.error.message}</p>
{/if}

<!-- tweened store -->
<div>
  <button on:click={()=>{    
        tweened.update((values)=>({
        ...values,
         scale: values.scale + 1
    }))}
    }>Make it Bigger</button>
  <button on:click={()=>{    
    tweened.update((values)=>({
    ...values,
     scale: values.scale - 1
}))}
}>Make it Smaller</button>
</div>
<div>
  <button on:click={async ()=>{
    await tweened.update((values)=>({
        ...values,
         width: Math.random() * 500,
         height: Math.random() * 500,
         color:`#${Math.floor(Math.random() * 16777215).toString(16)}` 
    })
    ,{
      //we can even overirde options in set and update functions
    duration:4000
  });
    //if we need to do something after tweening completes
    //we can await the tweening function
    console.log('done');
  }}>Random Tweened Box</button>
</div>



<h1>Tweened Box</h1>
<div style='width:{$tweened.width}px;height:{$tweened.height}px;
background-color:{$tweened.color};
transform : scale({$tweened.scale});
transform-origin: 0 0'>
</div>

<div>
  <button on:click={async ()=>{
    await spring.update((values)=>({
        ...values,
         width: Math.random() * 500,
         height: Math.random() * 500,

    }),{
      //hard means value will change immediately
     // hard:true,
      //soft 2s spring will take 2s to settle
      soft:2
    });
    //if we need to do something after tweening completes
    //we can await the tweening function
    console.log('done');
  }}>Random Spring Box</button>
</div>

<h1>Spring Box</h1>
<div style='width:{$spring.width}px;height:{$spring.height}px;
background-color:purple;
transform : scale({$spring.scale});
transform-origin: 0 0'>
</div>