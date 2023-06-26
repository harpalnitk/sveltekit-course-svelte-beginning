<script>
    import Button from '$lib/Button.svelte';
    import { Field, Form } from '$lib/Form';
    import {validateEmail,validateRequiredField} from '$lib/utils/validation';
  </script>

<h1>Context Form</h1>


<Form on:submit={(e) => {
    console.log(e.detail)
}} initialValues={{username:'Test',email:'test@test.com'}}
let:hasErrors
let:values
let:errors>
    <Field 
    label="Username" 
    name="username" 
    type="text" 
    validate={validateRequiredField} />
    <Field 
    label="Email" 
    name="email" 
    type="email" 
    validate={(value,label)=>{
        return validateRequiredField(value,label) ||
        validateEmail(value,label)
    }}>
<!-- using slot to make error message customizeable      -->
<p style:color='green' slot='error' let:errorMsg>
    {errorMsg}
</p>

</Field>
    <Field 
    label="password"
     name="password" 
     type="password" 
     validate={validateRequiredField} />
    <Button type="submit" disabled={hasErrors}>Submit</Button>
  </Form>