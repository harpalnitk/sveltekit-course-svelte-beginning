<script context='module'>
	//To learn about module context
	//var to keep track of number of buttons created
	
	let totalButtons = 0;

	//context Module will not have ccess to the props of the
	//component or it's State

	//! Var in module context are not reactive
	//first button created will show 1;
	//when second button is created first will still show 1 
	//while second will show 2

	//To access this variable ouside of the button component

	export function getTotalButtons(){
		return totalButtons;
	}
</script>



<script>
	import { onDestroy } from "svelte";

	export let size = 'small';
	export let shadow = false;
    // inherit will use variable value defined in css file
	export let bgColor = 'inherit';
	export let textColor = 'inherit';
	let isLeftHovered;
	totalButtons += 1;

	onDestroy(()=>{
		totalButtons -= 1;
	})
</script>
<!--! Var in module context are not reactive
first button created will show 1;
when second button is created first will still show 1 
while second will show 2 -->
<!-- {totalButtons} -->
<button
	on:click
	style:--buttonBgColor={bgColor}
	style:--buttonTextColor={textColor}
	class:size-lg={size === 'large'}
	class:size-sm={size === 'small'}
	class:has-left={$$slots.leftContent}
	class:shadow
	{...$$restProps}
>
	{#if $$slots.leftContent}
		<div
			class="left-content"
			on:mouseenter={() => (isLeftHovered = true)}
			on:mouseleave={() => (isLeftHovered = false)}
		>
			<slot name="leftContent" />
		</div>
	{/if}
	<slot {isLeftHovered}>Fallback</slot>
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		border: none;
		background-color: var(--buttonBgColor);
		color: var(--buttonTextColor);
		font-weight: bold;
		border-radius: 5px;
		cursor: pointer;
		.left-content {
			margin-right: 10px;
		}
		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
		&:hover {
			background-image: linear-gradient(rgba(0, 0, 0, 0.4) 0 0);
		}
		&:active {
			background-image: linear-gradient(rgba(255, 255, 255, 0.1) 0 0);
		}
		&.size-sm {
			padding: 15px 20px;
		}
		&.size-lg {
			padding: 20px 25px;
			font-size: 20px;
		}
		&.shadow {
			box-shadow: 0 0 10px rgba(1, 1, 1, 0.3);
		}
	}
</style>