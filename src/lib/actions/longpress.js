//this function will run once when element is created
export default function longpress(node, options) {
	//console.log(node, options);

	//default value of duration set to 2000 (2 seconds)

    //destructuring can't be done here as options when assigned new options
    // duration won't change
	// const { duration = 2000 } = options;
	let timer;

	function handleMouseDown() {
        const { duration = 2000 } = options;
		timer = setTimeout(() => {
			node.dispatchEvent(new CustomEvent('longpress'));
		}, duration);
	}

	function handleMouseUp() {
        clearTimeout(timer);
    }

	node.addEventListener('mousedown', handleMouseDown);
	node.addEventListener('mouseup', handleMouseUp);

	return {
		//newOptions is automatically given to this action and
		//update function runs whenever options change
		//in dom element
		update(newOptions) {
			// console.log(newOptions);
            options = newOptions;
		},
		destroy() {
			//  console.log('destroyed');
            clearTimeout(timer);
            node.removeEventListener('mousedown',handleMouseDown)
            node.removeEventListener('mouseup',handleMouseUp)
		}
	};
}
