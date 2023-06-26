<script>
    import {setContext, createEventDispatcher} from 'svelte';
    import formKey from './form-key';
    import {writable} from 'svelte/store';
//create context and pass it down to children

//make this initialValues available to all field components
//export let initialValues= {};

// setContext('form',{values:initialValues, errors:{}})
//using unique formKey instead of hardcoded string form
//to avoid conflicts with other form contexts
//setContext(formKey,{values:initialValues, errors:{}})

//using stores to set initial values
export let initialValues= {};
//showErrors field to track showing of error when form is submitted
//without being dirty
const formStore = writable({values:initialValues, errors:{}, showErrors: false});
setContext(formKey,formStore);

const dispatch = createEventDispatcher();

$: hasErrors= Object.keys($formStore.errors).length > 0;

</script>

<pre>
    {JSON.stringify($formStore,null,2)}
</pre>

<form on:submit|preventDefault={()=>{
    if(!hasErrors){
        dispatch('submit',$formStore.values)
    }else{
        $formStore.showErrors = true;
    }
}}>
  <!-- using slot props pass errors  -->
  <slot 
  hasErrors={hasErrors}
  values={$formStore.values}
  errors={$formStore.errors}/>
</form>