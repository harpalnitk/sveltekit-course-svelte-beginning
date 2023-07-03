<!-- leaflet is javascript map API 

    konva.js is another 3rd party library for using canvass

Using context we can use this library in declarative way rather 
then imperative way-->

<script>
    import { Stage, Layer, Rect } from '$lib/konva';
    let showCanvas = true;
    let x = 20;

    let rect1,rect2;
  </script>


<h1>Convert 3rd party Konva ibrary to svelte components using Context</h1>

<input type="checkbox" bind:checked={showCanvas} />
<input type="range" bind:value={x} min={0} max={600}>


<button on:click={()=>{
  console.log(rect1.rect.getAttrs())
  console.log(rect2.rect.getAttrs())
  rect2.rect.x(0);
}}>Get Rect Info</button>

  
{#if showCanvas}
  <Stage width={600} height={600}>
    <Layer draggable on:dragmove={(e)=>{console.log(e.detail)}}>
      <Rect x={x} y={20} fill="pink" width={200} height={100} />
      <Rect x={20} y={20} fill="yellow" width={100} height={200} />
    </Layer>
    <Layer {x}>
        <Rect bind:this={rect1} x={x} y={320} fill="green" width={200} height={100} />
        <Rect bind:this={rect2} x={220} y={220} fill="red" width={100} height={200} 
        stroke='white' strokeWidth={4}/>
      </Layer>
  </Stage>

{/if}