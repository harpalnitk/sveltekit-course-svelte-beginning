<script context="module">
    let allVideos = new Set();// is a collection of values which are unique

    export function playAll(){
       allVideos.forEach(video=>{
        video.play()}) 
    }
    export function pauseAll(){
       allVideos.forEach(video=>{
        video.pause()}) 
    }
</script>

<script>
	import { onDestroy, onMount } from "svelte";


    export let src = undefined;

    let paused = true;
   let video;
   
   // to learn video player bindings
    let currentTime = 0;
    let volume = 0;

    onMount(()=>{
        allVideos.add(video);
    })
    onDestroy(()=>{
        allVideos.delete(video);
    })

</script>


<div>
    <video {src} controls 
    bind:paused={paused} 
    bind:volume={volume} 
    bind:currentTime={currentTime}
    bind:this={video}
    class:playing={!paused}
    on:play={()=>{
        allVideos.forEach(_video =>{
            if(_video !== video) {_video.pause()}
        })
    }}>
  <track kind="captions" />    
</video>
    <button on:click={()=>{paused = !paused}}>{paused ? 'Play' : 'Pause'}</button>
    <p>{currentTime}</p>
    <p>{volume}</p>
    
   
</div>



<style>
	video{
        width: 200px;
        height: 200px;
    }
    video.playing {
        outline: 4px solid orange;
    }
</style>