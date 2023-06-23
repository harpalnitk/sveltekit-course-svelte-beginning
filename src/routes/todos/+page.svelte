<script>
	import TodoList from '$lib/TodoList.svelte';
	// import Button from '$lib/Button.svelte';
	import { v4 as uuid } from 'uuid';
	import { tick, onMount } from 'svelte';
	import { fade, fly, slide, blur } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	//custom css transition
	import spin from '$lib/transitions/spin';
	import fadejs from '$lib/transitions/fade';

	let showList = true;

	let todoList;
	let todos = null;
	let error = null;
	let isLoading = false;
	let isAdding = false;
	// to prevent any action on an item while it is getting deleted
	//i.e. press delete button again or check it
	let disabledItems = [];

	//let promise = loadTodos();

	// function loadTodos() {
	// 	return fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then((response) => {
	// 		if (response.ok) {
	// 			return response.json();
	// 		} else {
	// 			throw new Error('An error has occurred.');
	// 		}
	// 	});
	// }

	onMount(() => {
		loadTodos();
	});

	async function loadTodos() {
		isLoading = true;
		try {
			await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then(async (response) => {
				if (response.ok) {
					todos = await response.json();
				} else {
					throw new Error('An error has occurred');
				}
			});
		} catch (err) {
			error = 'An error has occurred ' + err;
		}
		isLoading = false;
	}
	// let todos = [
	// 	{
	// 		id: uuid(),
	// 		title: 'Todo 1',
	// 		completed: true
	// 	},
	// 	{
	// 		id: uuid(),
	// 		title: 'Todo 2',
	// 		completed: false
	// 	},
	// 	{
	// 		id: uuid(),
	// 		title: 'Todo 3',
	// 		completed: true
	// 	},
	// 	{
	// 		id: uuid(),
	// 		title:
	// 			'A long long long long long long long long long long long long long long long long long long todo',
	// 		completed: false
	// 	}
	// ];
	//$: console.log(todos);
	async function handleAddTodo(event) {
		event.preventDefault();
		isAdding = true;
		await fetch('https://jsonplaceholder.typicode.com/todos', {
			method: 'POST',
			body: JSON.stringify({
				title: event.detail.title,
				completed: false
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		}).then(async (response) => {
			if (response.ok) {
				const todo = await response.json();
				//fake api send same uid everytime;replacing uid
				//add new todo to the bottom of list
				//todos = [...todos, { ...todo, id: uuid() }];
				//add new todo to the top of list
				todos = [{ ...todo, id: uuid() },...todos ];
				todoList.clearInput();
			} else {
				alert('An error has occurred.');
			}
		});
		isAdding = false;
		await tick();
		todoList.focusInput();
	}
	async function handleRemoveTodo(event) {
		//todos = todos.filter((t) => t.id !== event.detail.id);

		const id = event.detail.id;
		if (disabledItems.includes(id)) return;
		disabledItems = [...disabledItems, id];
		await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'DELETE'
		}).then((response) => {
			if (response.ok) {
				todos = todos.filter((t) => t.id !== event.detail.id);
			} else {
				alert('An error has occurred.');
			}
		});
		disabledItems = disabledItems.filter((itemId) => itemId !== id);
	}
	async function handleToggleTodo(event) {
		// todos = todos.map((todo) => {
		// 	if (todo.id === event.detail.id) {
		// 		return { ...todo, completed: event.detail.value };
		// 	}
		// 	return { ...todo };
		// });

		const id = event.detail.id;
		const value = event.detail.value;
		if (disabledItems.includes(id)) return;
		disabledItems = [...disabledItems, id];
		await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				completed: value
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		}).then(async (response) => {
			if (response.ok) {
				const updatedTodo = await response.json();
				todos = todos.map((todo) => {
					if (todo.id === id) {
						return updatedTodo;
					}
					return { ...todo };
				});
			} else {
				alert('An error has occurred.');
			}
		});
		disabledItems = disabledItems.filter((itemId) => itemId !== id);
	}
</script>

<main class="container">
	<!-- <Counter /> -->

	<label for="showList">
		<input type="checkbox" bind:checked={showList} />
		Show/Hide Todo List
	</label>

	{#if showList}
		<!-- {#await promise}
			<p>Loading...</p>
		{:then todos} -->
		<!-- <div transition:fade={{delay:500, duration:300}} style:max-width="400px"> -->
		<!-- <div transition:fly={{y:400, duration:3000}} style:max-width="400px"> -->
		<!-- <div
					style:max-width="400px" 
					in:slide={{duration:700, easing:cubicInOut}}
					 out:blur={{amount:10,duration:300}} 
					on:introstart={()=>console.log('introstart')}
					on:introend={()=>console.log('introend')}
					on:outrostart={()=>console.log('outrostart')}
					on:outroend={()=>console.log('outroend')}
					 > -->

					 <!-- if element already has an opacity
					then while using spin animation it will change from 0 to 1
				and then change to already defined css opacity on element -->
		<!-- style="opacity:0.5; transform: rotate(90deg)" -->
				<div transition:spin={{spin:1}}  
		
		style:max-width="800px"
		>
			<TodoList
				{todos}
				{error}
				{isLoading}
				disableAdding={isAdding}
				{disabledItems}
				scrollOnAdd="top"
				bind:this={todoList}
				on:addtodo={handleAddTodo}
				on:removetodo={handleRemoveTodo}
				on:toggletodo={handleToggleTodo}
				let:todo
				let:handleToggleTodo
				let:number
			>
				<!-- consumer of todolist can customize the todo list individual 
			list item by passing html content in this slot  -->

				<!-- {@const {id,completed,title} = todo}
			<div>
				<input
				on:input={(event) => {
					event.currentTarget.checked = completed;
					handleToggleTodo(id, !completed);
				}}
				type="checkbox"
				checked={completed}
				disabled={disabledItems.includes(id)}
			/>
				{title}
			</div>
			 -->
				<svelte:fragment slot="title">{number}-{todo.title}</svelte:fragment>
			</TodoList>
		</div>
		<!-- for svelte transition to work a dom element 
		has to be destroyed or created  
	here no element is created or destroyed
so we use #key and pass variable which changes for it to animate
also span is inline element and fly will not work
we need to change span to inline block element-->
		<p>Number of todos: 
			{#key todos?.length}
			<span style:display='inline-block' in:fly={{y:-10}}>
			{todos?.length}
		</span>
		{/key}
	</p>
		<!-- {:catch error}
			<p>{error.message || 'An error has occurred'}</p>
		{/await} -->
	{/if}
</main>

<style lang="scss">
</style>
