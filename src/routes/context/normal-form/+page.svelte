<script>
	import Button from "$lib/Button.svelte";


    let values = {username:'',email:'', password:''}
    let errors = {};
    let isSubmitting = false;

    function validate() {
    const errors = {};
    if (!values.username) {
      errors.username = 'The Username is Required.';
    }
    if (!values.email) {
      errors.email = 'The Email is Required.';
    }
    if (!values.password) {
      errors.password = 'The Password is Required.';
    }
    if (values.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
      errors.email = 'The Email is Invalid.';
    }
    return errors;
  }

    const handleSubmit = ()=> {
        errors = validate();
    if (Object.keys(errors).length === 0) {
      isSubmitting = true;
      setTimeout(() => {
        isSubmitting = false;
      }, 1000);
    }
}
 
</script>

<h1>Normal Form</h1>
<!-- {JSON.stringify(values)} -->
<form on:submit|preventDefault={handleSubmit}>
    <label for="username">Username</label><br/>
    <input 
    type="text" 
    name="username" 
    id="username"
    bind:value={values.username}>
    {#if errors.username}<p>{errors.username}</p>{/if}
    <br/>
    <label for="email">Email</label><br/>
    <input 
    type="email" 
    name="email" 
    id="email"
    bind:value={values.email}>
    {#if errors.email}<p>{errors.email}</p>{/if}
    <br/>
    <label for="password">Password</label><br/>
    <input 
    type="password" 
    name="password" 
    id="password"
    bind:value={values.password}>
    {#if errors.password}<p>{errors.password}</p>{/if}

    <Button type='submit' disabled={isSubmitting}>Submit</Button>
</form>