<script>
    import { v4 as uuid } from 'uuid';
    import {getContext,onMount,hasContext,getAllContexts} from 'svelte';
    import formKey from './form-key';



    export let name;
    export let type = 'text';
    export let label = undefined;
    export let validate = undefined;

    let isDirty = false;
    const id = uuid();
    
    // const form = getContext('form');
    //const {values}= getContext(formKey);
    const formStore = getContext(formKey);

    //To check for errors initially
    onMount(()=>{
        if(validate && validate($formStore.values[name])){
            $formStore.errors[name] = validate($formStore.values[name],label);
        } 
    })

  </script>
  
  <div class="field">
    {#if label}
      <label for={id}>{label}</label>
    {/if}
     <!-- context are not reactive which means if we change input 
     field context will not update automatically  -->
    <input {id} {name} {type} placeholder={label} value={$formStore.values[name] || ''}
    on:input = {(e)=> {
        isDirty = true
        //validation
        const value = e.currentTarget.value
        if(validate && validate(value)){
            $formStore.errors[name] = validate(value,label);
        } else {
            delete $formStore.errors[name];
        }
        
        // values[name] = e.currentTraget.value  ; this cannot be done
        //so we will combine context with stores
        //console.log(e.currentTarget.value)

        //USING STORE
        $formStore.values[name] = value;
        //we are not using bind like 
        //bind:value={$formStore.values[name]}
        //because if {type} is dynamic then bind doesn't work
    }}/>

    {#if $formStore.errors[name] && (isDirty || $formStore.showErrors)}
         <slot name='error' errorMsg={$formStore.errors[name]}><p class="error">{$formStore.errors[name]}</p></slot>
    {/if}
  </div>
  
  <style>
    div.field {
      margin-bottom: 10px;
    }
    label {
      display: block;
      font-size: 14px;
      margin-bottom: 5px;
    }
    input {
      height: 30px;
      width: 250px;
      max-width: 100%;
    }
    p.error{
        color: red;
        font-size: 14px;
        margin: 5px 0 0;
    }
  </style>