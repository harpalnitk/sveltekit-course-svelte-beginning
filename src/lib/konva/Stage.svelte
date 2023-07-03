<script>
    import Konva from 'konva';
    import { onMount, onDestroy, setContext } from 'svelte';
  import { stageKey } from './context-keys';
    // export let width;
    // export let height;
    
    let container;
    let stage;


    //our stage will be undefined initially before component mounts
    // therefore instead of passing stage directly we pass a function
    // to initialize stage later

    setContext(stageKey, {
    getStage: () => stage
    });
    
    onMount(() => {
      // stage = new Konva.Stage({
      //   container,
      //   width,
      //   height
      // });

      stage = new Konva.Stage({
        container,
        ...$$props
      });
    });
    
    onDestroy(() => {
      if (stage) stage.destroy();
    });

    //For updation
    $: if(stage) stage.setAttrs($$props)
  
  
  </script>
  
  <div bind:this={container}>

     <!-- layer will call getStage only when this component renders  -->
    {#if stage}
    <slot />
     {/if}
  </div>