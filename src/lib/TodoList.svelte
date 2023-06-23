<!-- if you want component to re-render only if a new input prop is passed
and not a mutated one  -->
<svelte:options immutable={true} />

<script>
	import FaRegTrashAlt from 'svelte-icons/fa/FaRegTrashAlt.svelte';
	import Button from './Button.svelte';
	//lifecycle methods will not run in SSR except for onDestroy
	import { createEventDispatcher, onMount, onDestroy, afterUpdate, beforeUpdate } from 'svelte';
	import { scale,crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	export let todos = null;
	export let error = null;
	export let isLoading = false;
	export let disableAdding = false;
	export let disabledItems = [];
	export let scrollOnAdd = nudefined;

	$: done = todos ? todos.filter(t=> t.completed) : []
	$: todo = todos ? todos.filter(t=> !t.completed) : []

	//for animating the two list when a todo is marked 
	//completed
	const [send,receive] = crossfade({
		duration:400,

		// fallback will run when element 
		//is added or removed to individual lists 
		fallback(node){
			return scale(node,{start:0.5, duration:300})
		}
	});

	export const readonly = 'read only';
	let inputText = '';
	let input, listDiv, autoScroll, listDivScrollHeight;
	const dispatch = createEventDispatcher();

	let prevTodos = todos;

	$: {
		//autoscroll is  a variable which ensures that we
		//scroll only when an element is added to the list
		autoScroll = todos && prevTodos && todos.length > prevTodos.length;
		prevTodos = todos;
	}

	// function runs only once when component mounts
	//to be used at top level, cannot be put inside other function
	onMount(() => {
		console.log('Mounted');
	});
	onDestroy(() => {
		console.log('Destroyed');
	});
	//runs before component even mounts
	beforeUpdate(() => {
		console.log('beforeUpdate');
		if (listDiv) console.log('list container height', listDiv.offsetHeight);
		console.log('list container height with bind', listDivScrollHeight);
	});
	afterUpdate(() => {
		console.log('afterUpdate');
		if (listDiv) console.log('list container height', listDiv.offsetHeight);
		//after adding new item scroll to end
		if(scrollOnAdd){
			let pos;
			if(scrollOnAdd === 'top') pos= 0;
			if(scrollOnAdd === 'bottom') pos= listDivScrollHeight;
			if (autoScroll) {
			listDiv.scrollTo(0, pos);
		       }
		autoScroll = false;
		}

	});

	export function clearInput() {
		inputText = '';
	}
	export function focusInput() {
		input.focus();
	}

	function handleAddTodo() {
		const isNotCancelled = dispatch(
			'addtodo',
			{
				title: inputText
			},
			{ cancelable: true }
		);
		//if preventdefault is not set to true on event
		//in parent component, then below code will not run
		if (isNotCancelled) {
			inputText = '';
		}
	}
	function handleRemoveTodo(id) {
		dispatch('removetodo', {
			id
		});
	}
	function handleToggleTodo(id, value) {
		dispatch('toggletodo', {
			id,
			value
		});
	}
</script>

<div class="todo-list-wrapper">
	{#if isLoading}
		<p class="state-text">Loading...</p>
	{:else if error}
		<p class="state-text">{error}</p>
	{:else if todos}
		<div class="todo-list" bind:this={listDiv}>
			<div bind:offsetHeight={listDivScrollHeight}>
				{#if todos.length === 0}
					<p class="state-text">No todos yet</p>
				{:else}
				<div style:display="flex">
					{#each [todo,done] as list, index}
					<div class="list-wrapper">
					<h2>{index === 0 ? 'Todo': "Done"}</h2>
					<ul>
						{#each list as todo, index (todo.id)}
							<!-- if we need to use variable number at multiple places   -->
							{@const number = index + 1}
							{@const {id,completed,title} = todo}
							<!-- {(console.log(title), '')} -->
							<!-- {@debug id, title} -->

						<!-- to use flip animation you must be in a list with key 
							 and animate:flip should be direct child of each loop
							flip stands for first last invert play-->
							<li animate:flip={{duration:300}}>
								<!-- passing data of slot from child to parent  -->
								<!-- we can even pass functions to parent through slots  -->
								<slot {todo} {handleToggleTodo} {number}>
								
								<!-- transition will run when element or it's 
								parent is added or removed
							local will ensure that animation will not run if parent 
						is added or removed -->
									<!-- <div 
								class:completed
								transition:scale|local={{start:0.5, duration:300}}> -->
								<div 
								class:completed
								in:receive|local={{key:id}}
								out:send|local={{key:id}}
								>
									<label>
										<input
											on:input={(event) => {
												event.currentTarget.checked = completed;
												handleToggleTodo(id, !completed);
											}}
											type="checkbox"
											checked={completed}
											disabled={disabledItems.includes(id)}
										/>
										<slot name='title'>{title}</slot>
										
									</label>
									<button
										disabled={disabledItems.includes(id)}
										class="remove-todo-button"
										on:click={() => handleRemoveTodo(id)}
										aria-label="Remove todo: {title}"
									>
										<span style:width="10px" style:display="inline-block">
											<FaRegTrashAlt />
										</span>
									</button>
								</div>
								</slot>
							</li>
						{/each}
					</ul>
				</div>
					{/each}
				</div>
				{/if}
			</div>
		</div>
	{/if}

	<form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
		<input
			disabled={disableAdding || !todos}
			bind:this={input}
			bind:value={inputText}
			placeholder="New Todo"
		/>
		<Button
			class="add-todo-button"
			type="submit"
			disabled={!inputText || disableAdding || !todos}
			bgColor="red"
			textColor="white">Add</Button
		>
	</form>
</div>

<style lang="scss">
	.todo-list-wrapper {
		background-color: #424242;
		border: 1px solid #4b4b4b;
		.state-text {
			margin: 0;
			padding: 15px;
			text-align: center;
		}
		.todo-list {
			max-height: 400px;
			overflow: auto;
			.list-wrapper{

		padding:10px;
		flex:1;
		h2{
			margin: 0 0 10px;
		}
			ul {
				margin: 0;
				padding: 0px;
				list-style: none;
				li > div {
					
					margin-bottom: 5px;
					display: flex;
					align-items: center;
					background-color: #303030;
					border-radius: 5px;
					padding: 10px;
					position: relative;
					label {
						cursor: pointer;
						font-size: 18px;
						display: flex;
						align-items: baseline;
						padding-right: 20px;
						input[type='checkbox'] {
							margin: 0 10px 0 0;
							cursor: pointer;
						}
					}
					&.completed > label {
						opacity: 0.5;
						text-decoration: line-through;
					}
					.remove-todo-button {
						border: none;
						background: none;
						padding: 5px;
						position: absolute;
						right: 10px;
						cursor: pointer;
						display: none;
						&:disabled {
							opacity: 0.4;
							cursor: not-allowed;
						}
						// to add class inside a child component
						:global(svg) {
							fill: #bd1414;
						}
					}
					&:hover {
						.remove-todo-button {
							display: block;
						}
					}
				}
			}
		}
		}
		.add-todo-form {
			padding: 15px;
			background-color: #303030;
			display: flex;
			flex-wrap: wrap;
			border-top: 1px solid #4b4b4b;
			/* :global(.add-todo-button) {
         background-color: aqua;
       } */
			input {
				flex: 1;
				background-color: #424242;
				border: 1px solid #4b4b4b;
				padding: 10px;
				color: #fff;
				border-radius: 5px;
				margin-right: 10px;
			}
		}
	}
</style>
