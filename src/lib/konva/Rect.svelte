<script>
    import Konva from 'konva';
    import { getContext,onDestroy,createEventDispatcher } from 'svelte';
    import { layerKey } from './context-keys';

    const dispatch = createEventDispatcher();
    // export let x = undefined;
    // export let y = undefined;
    // export let width = undefined;
    // export let height = undefined;
    // export let fill = undefined;
    // export let stroke = undefined;
    // export let strokeWidth = undefined;
    const layer = getContext(layerKey);
    // const rect = new Konva.Rect({
    //   x,
    //   y,
    //   width,
    //   height,
    //   fill,
    //   stroke,
    //   strokeWidth
    // });

//Passing all props
//it is not recommended to use $$props as it 
//can cause optimization issues

//if we export const it will be a readonly prop
export const rect = new Konva.Rect($$props);

  //OR for multiple events we can do like below
  rect.on('dragmove click mousedown', (e) => {
		//  console.log('rect clicked ',e);
		dispatch(e.type, e);
	});


    // For upodating rect attributes

    $: rect.setAttrs($$props);

    onDestroy(()=>{
      rect.destroy();
    })


    layer.add(rect);
  </script>