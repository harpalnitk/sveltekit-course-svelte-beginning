<script>
	import Konva from 'konva';
	import { getContext, setContext, onDestroy, createEventDispatcher } from 'svelte';
	import { stageKey, layerKey } from './context-keys';

	//export let draggable = undefined;

	const dispatch = createEventDispatcher();

	const { getStage } = getContext(stageKey);
	const stage = getStage();
	// const layer = new Konva.Layer({
	//   draggable
	// });

	const layer = new Konva.Layer($$props);

	//listening to events in konva
	// layer.on('dragmove', (e) => {
	// 	//  console.log('layer dragged ',e);
	// 	dispatch('dragmove', e);
	// });

  // layer.on('click', (e) => {
	// 	//  console.log('layer clicked ',e);
	// 	dispatch('click', e);
	// });

  //OR for multiple events we can do like below
  layer.on('dragmove click', (e) => {
		//  console.log('layer clicked ',e);
		dispatch(e.type, e);
	});


	//for updation
	$: layer.setAttrs($$props);

	onDestroy(() => {
		layer.destroy();
	});

	setContext(layerKey, layer);
	stage.add(layer);
</script>

<slot />
