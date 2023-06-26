<!-- leaflet is javascript map API 

    konva.js is another 3rd party library for using canvass

Using context we can use this library in declarative way rather 
then imperative way-->

<script>
    import { Stage, Layer, Rect } from '$lib/konva';
    let showCanvas = true;
    let x = 20;
  </script>


<h1>Convert 3rd party LKonva ibrary to svelte components using Context</h1>

<input type="checkbox" bind:checked={showCanvas} />
<input type="range" bind:value={x} min={0} max={600}>

  
{#if showCanvas}
  <Stage width={600} height={600}>
    <Layer draggable>
      <Rect x={x} y={20} fill="pink" width={200} height={100} />
      <Rect x={20} y={20} fill="yellow" width={100} height={200} />
    </Layer>
    <Layer>
        <Rect x={120} y={320} fill="green" width={200} height={100} />
        <Rect x={220} y={220} fill="red" width={100} height={200} 
        stroke='white' strokeWidth='4'/>
      </Layer>
  </Stage>

{/if}