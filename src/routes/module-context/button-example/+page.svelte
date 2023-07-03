<script>
    //getTotalButtons is a function which enables us
    //to access context module variables
import Button, {getTotalButtons} from '$lib/Button.svelte';

let showButton = false;

let total;
</script>



<input type="checkbox" bind:checked={showButton}>
<Button>Button</Button>
<Button>Button</Button>

{#if showButton}
<Button>Button</Button>
     
{/if}

<button on:click={()=>{
    total = getTotalButtons();
}}>Update Buttons Counts</button>

<p>Total buttons: {total}</p>