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

>npm create svelte@latest sveltekit-course-svelte-begining
> npm install

## how to put routes in different folder
1. go to svelte.config.js file

kit:{
    adapter: adapter(),
    files:{
        routes:'src/pages'
    }
}

### By default all pages are SSR (Server Side Rendered)
hydration: when page is rendered on client JS takes over
this is called hydration

### /product/123
product/[id]  folder structure

<script>
    import {page} from '$app/stores';
    console.log($page.params.id) // 123
    </script>


## Customize  path of lib folder

kit:{
    adapter: adapter(),
    files:{
        lib:'src/mypath/lib'
    }
}

### custom aliases

kit:{
    adapter: adapter(),
    alias:{
        $components:'src/lib/components'
    }
}

### to import like this

import {Button} from '$components';

create index.ts file in components folder and export all components

export {default as Button} from './Button.svelte';

## components which are used only in a specific route
we can put those components inside route folders

## for navigation goto()
import {goto, beforeNavigate, afterNavigate} from '$app/navigation';
goto('/about') returns a promise and can be awaited

beforeNavigate((navigation)=>{
    console.log(navigation); // from,to,type:'goto' and cancel functiom

    navigation.cancel();  //will cancel navigation
})

afterNvaigate is also similar and will run when we land on the
page from other URL

type:'enter'  when we refresh the page since we are not coming from
anywhere and from: will be null

type:'link' if we navigate using anchor tag and not goto function

### navigation information can also be retrieved from store
import {navigating} from '$app/stores';

same information as navigation in the before after navigation tags


## unknown params
file/[...path]/+page.svelte

if url is 

http://localhost:5173/file/a/b/c

then {JSON.stringify($page.params)}
will output   {"path":"a/b/c"}

http://localhost:5173/file/23425/a/b/c/edit

edit folder inside [...path folder] having +page.svelte file

will output
{"path":"23425/a/b/c"}

file/[id]/[...path]/edit/+page.svelte
then this URL http://localhost:5173/file/23425/a/b/c/edit

will give 
{id:'23425',path:'a/b/c'}

## Optional params  use double square brackets

folder [[lang]]/about

lang is optional now

both URLS /about and /en/about will worl

{JSON.stringify($page.params)}
will output
{} in first case
and 
{'lang':'en'} in second case

we cannot use optional parameters with rest parameters

## Layouts

by default layouts inside sub-routes will inherit
 main layouts

 break out from layout hierarchy

 +page@.svelte

 now page will inherit only the root layout

 +page@(frontend).svelte

 will inherit from root layout and frontend group layout
 
 +page@(file).svelte

  will inherit from file route layout

   +page@[id].svelte

  will inherit from [id] route layout

  # LOADING DATA

  // https://dummyjson.com/products

  ## Thunder Client requests
  http://[::1]:5173/products

  don't use localhost

  # Hooks
  two types
  1. client hooks
  2. Server hooks

  ## environment variables
  > echo %TEST%
  >echo %PATH%


  # server only files

  in lib/server folder any js,ts file created
  can only be imported in server files
  create file secrets.ts

  OR

  in routes/products

  create secret.server.ts file which can also only be imported in server 
  components

  # Pre Loading data
  data-sveltekit-preload-data="hover"

  on body tag in app.html file

  # pre rendering
  works both for pages and endpoints
  e.g. see
  /api/random-number
  /users


  entry in svelte.config.js file

  	prerender:{
		crawl:true,
		entries:['/users','/api/random-number','/users/7']
	}

it will pr-render all pages inside entriws if they have exported constant pre-render set to true
and also crawl any link pages inside these pages like /users/1
which are also marked prerenderable

we can also use 

entries:[*]

if crawl:false then individual users/1 pages will not be pre-rendered an d we will get an error during build time


