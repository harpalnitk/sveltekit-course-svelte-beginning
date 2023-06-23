<script>
    // import settings from '$lib/stores/settings';
    import settings from '$lib/stores/custom-store';

    import direction from '$lib/stores/derived-store'
 //   import { onDestroy } from 'svelte';

    //console.log(settings);

//     let colorScheme;

//     const unsubscribe = settings.subscribe((settings) => {
//     console.log('settings subscribe',colorScheme);
//     colorScheme = settings.colorScheme;
//   });
//   $: {
//     settings.update((prevSettings) => ({ ...prevSettings, colorScheme }));
//   }
//   onDestroy(unsubscribe);
</script>


<h2>Settings</h2>
<p>Color Scheme : {$settings.colorScheme}</p>
<p>Language : {$settings.lang}</p>
<p>Direction of Text: {$direction}</p>
<!-- if we need to access methods in store we don't need 
to use dollar sign -->
<button on:click={()=>{settings.toggleColorScheme()}}>Toggle Color Scheme</button>
<br/>
<label>
    <input type="radio" bind:group={$settings.colorScheme} name="colorScheme" value="dark" /> Dark
  </label>
  <label>
    <input type="radio" bind:group={$settings.colorScheme} name="colorScheme" value="light" /> Light
  </label>
  <br/>

  <select bind:value={$settings.lang}>
    <option value="en">English</option>
    <option value="ar">Arabic</option>
    <option value="hn">Hindi</option>
  </select>
  <!-- <button on:click={()=>{
    settings.updateSetting('lang','ar')
  }}>Update Language</button> -->
  <br/>
  <button on:click={()=>{
    settings.reset()
  }}>Reset Settings</button>
  