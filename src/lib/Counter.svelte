<script>
	export let initialCount = 0;
	export let maxCount = undefined;
	
	// props display all named props which are used in componnet 
	// and restProps display all props passed to componnet but not used 
	
	console.log($$props, $$restProps);
	let count = initialCount;
	function increment() {
		if (count === maxCount) return;
		count += 1;
	}
</script>

<button on:click={increment}>Clicks {count}</button>

<style>
	button {
		padding: 15px 20px;
	}
</style>