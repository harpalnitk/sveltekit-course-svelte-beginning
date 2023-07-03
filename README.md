## Lifecycle function

import {tick} from 'svelte';
//adding new todo in a list
await tick();


<script context='module'></script>
the code in this script will run once for all instances of the components; variables defined here
will be accessible to all instances of the component; variables defined here can be updated from any instance

wheres without module code in script tag will run separately for each instance of the
component

# SVELTEKIT