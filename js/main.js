// add x-axis, y-axis

const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;

// Add frame
const FRAME1 = 
d3.select("#plot")
	.append("svg")
		.attr("height", FRAME_HEIGHT)
		.attr("width", FRAME_WIDTH)
		.attr("class", "frame");

// Add x-axis in the frame
FRAME1.append('line')
			.attr('x1', 0)
			.attr('y1', FRAME_HEIGHT)
			.attr('x2', FRAME_WIDTH)
			.attr('y2', FRAME_HEIGHT)
			.attr('class', 'x_axis');


// Add y-axis in the frame
FRAME1.append('line')
			.attr('x1', 0)
			.attr('y1', FRAME_HEIGHT)
			.attr('x2', 0)
			.attr('y2', 0)
			.attr('class', 'y_axis');

// function that adds points to the plot (both default and user)
function add_point() {

	console.log('drawing point');
	console.log(arguments.length)

	if (arguments.length != 0) {

		var x = arguments[0];
		var y = arguments[1];

	} 

	else {
		console.log('user')
		var x = parseInt(document.getElementById("input_x").value);
		var y = parseInt(document.getElementById("input_y").value);
	}

	let x_trans = 50 * x;
	let y_trans = 500 - 50*y;
	let id = '(' + x.toString() + ',' + y.toString() + ')'

	FRAME1.append('circle')
			.attr('cx', x_trans)
			.attr('cy', y_trans)
			.attr('r', 10)
			.attr('class', 'point')
			.attr('id', id)
			.attr('onclick', 'update_border' + id +'');

}


// add default points
add_point(...[1,2]);
add_point(...[2,4]);
add_point(...[6,2]);
add_point(...[9,9]);


// function that adds/deletes border as user click the point
// also update the last clicked point in the right column
function update_border(x, y) {

	const raw_text = 'Last Point Clicked: '
	let id = '(' + x + ',' + y + ')'
	let point = document.getElementById(id);
	let text = document.getElementById("last_point")


	// update border
	if (point.border == undefined || point.border == false) {

		console.log('adding')
		point.setAttribute('stroke-width', '4px')
		point.setAttribute('stroke', 'blue')
		point.border = true;
	}

	else {

		console.log('deleting')
		point.removeAttribute('stroke-width')
		point.removeAttribute('stroke')
		point.border = false;
	}

	// update last clicked point
	text.innerHTML = raw_text.concat(id);
}