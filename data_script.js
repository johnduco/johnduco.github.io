// Globals
// This was taken out of the function for a check being done
var num_trial = 0;
var NB_VALUES = 3;
var rep_check;
var row_count = 1;
var curr_repetition = 0;
var ran_array = [];

function reset_counts() {
	num_trial = 0;
	NB_VALUES = 3;
	row_count = 1;
	ran_array.length = 0;
}

function random_num(input_num) {
 	if(ran_array.length == 0) {
		ran_array.push(input_num);
		console.log(ran_array);
		return input_num;
	} else {
		if(ran_array.includes(input_num)) {
			return random_num(Math.floor(Math.random() * 100));
		} else {
			ran_array.push(input_num);
			console.log(ran_array);
			return input_num;
		}
	}
}

function padding(number_pad) {
	var new_number = number_pad.toString();
	if(new_number.length == 1) {
		return new_number.padStart(2, '0');
	}
	return number_pad;
}
function textTest() {
	start_button.style.display = 'none';
	rep_check = 0;
	beginTrials();
}

function barTest() {
	start_button.style.display = 'none';
	rep_check = 1;
	beginTrials();
}


function beginTrials() {
	var width = 400;
	var height = 400;
	var divisor;
	var time_start = new Date();
	var sort_values = [];
	var num;
	var med;
	var curr_condition;
	
	//toggle bubble chart or text representation
	var REPRESENTATION;
	if(rep_check == 0) {
		REPRESENTATION = "text";
	} else if(rep_check == 1) {
		REPRESENTATION = "bar";
	}
	
	const MIN_VALUE = 0;
	const MAX_VALUE = 99;
	
	var svg = d3.select("#test_container")
		.append("svg")
		.attr("width", 400)
		.attr("height", 400)
		.style("margin-left", "auto")
		.style("margin-right", "auto")
		.style("display", "block")
		.style("border", "1px solid black");
		
	var values = d3.range(NB_VALUES).map(d => random_num(Math.floor(Math.random() * 100))) // the randomly generated set of values between 0 and 99
	num = values.length;
	// Creating a copy of the values to find median
	for(i = 0; i < num; i++) {
		sort_values[i] = values[i];
	}
	sort_values = sort_values.sort(function(x, y) { return x - y;});
	// Since all the amounts of numbers shown are odd
	var index = Math.floor(num/2);
	med = sort_values[index];
	console.log(values);
	console.log(sort_values);
	console.log(med);
	
	var pad = 5 //padding for grid layout (text and bubble)
	var numCol, numRow; // number of columns, number of rows
	var bubble_min_radius, bubble_max_radius;
	var _w, _h;
	
	var font_size;
	
	if(NB_VALUES == 3){
		numCol = 3;
		numRow = 3;
		_w = width/numCol
		_h = height/numRow
		divisor = 0.63;
		curr_condition = 'n3';

		bubble_min_radius = 1;// arbitrary, could be 0, or something else
		bubble_max_radius = (_w/2 - pad*2);
		font_size = 60// arbitrary choice
	} else if(NB_VALUES == 5)  {
		numCol = 5;
		numRow = 5;
		_w = width/numCol
		_h = height/numRow
		divisor = 0.38;
		curr_condition = 'n5';

		bubble_min_radius = 1;// arbitrary, could be 0, or something else
		bubble_max_radius = (_w/2 - pad*2);
		font_size = 50// arbitrary choice
	}else if(NB_VALUES == 9){
		numCol = 3;
		numRow = 3;
		_w = width/numCol
		_h = height/numRow
		divisor = 1.63;
		curr_condition = 'n9';

		bubble_min_radius = 1;// arbitrary, could be 0, or something else
		bubble_max_radius = (_w/2 - pad*2);
		font_size = 60// arbitrary choice
	} else if(NB_VALUES == 25) {
		numCol = 5;
		numRow = 5;
		_w = width/numCol
		_h = height/numRow
		divisor = 1.38;
		curr_condition = 'n25';

		bubble_min_radius = 1;// arbitrary, could be 0, or something else
		bubble_max_radius = (_w/2 - pad*2);
		font_size = 50// arbitrary choice
	}
		
	var sign = svg.selectAll('g') // create one group element to display each value, puts it at its position
		.data(values)
		.enter()
		.append('g')
		.attr('transform', function(d, i){
			switch(REPRESENTATION){
				case 'text':
					return 'translate(' + ((i%numCol)*_w + (pad/2)*-1) + ','+ ((Math.floor(i/numRow))*_h + (pad/2)*-1) +')'
				break;
				case 'bar':
					return 'translate(' + (i*width/NB_VALUES) + ','+ (height) +')'
				break;
				default: console.error('unknown representation',REPRESENTATION);
			}
		}).on('click', function(d, i){
			var time_click = new Date() - time_start;
			var fin_table = document.getElementById('fin_results');
			var new_row = fin_table.insertRow(row_count);
				var cell1 = new_row.insertCell(0);
				cell1.innerHTML = REPRESENTATION;
				var cell2 = new_row.insertCell(1);
				cell2.innerHTML = curr_condition;
				var cell3 = new_row.insertCell(2);
				cell3.innerHTML = curr_condition + "-" + curr_repetition;
				curr_repetition = curr_repetition + 1;
				var cell4 = new_row.insertCell(3);
				cell4.innerHTML = values;
				var cell5 = new_row.insertCell(4);
				cell5.innerHTML = med;
				var cell6 = new_row.insertCell(5);
				cell6.innerHTML = i;
				var cell7 = new_row.insertCell(6);
				cell7.innerHTML = time_click;
			row_count = row_count + 1;
			console.log("clicked: ", i)
			ran_array.length = 0;
			d3.select("svg").remove();
			num_trial = num_trial + 1;
			if(num_trial == 5) {
				curr_repetition = 0;
				num_trial = 0;
				if(NB_VALUES == 3) {
					NB_VALUES = 5;
				} else if (NB_VALUES == 5) {
					NB_VALUES = 9;
				} else if (NB_VALUES == 9) {
					NB_VALUES = 25;
				} else if (NB_VALUES == 25) {
					if(rep_check == 0) {
						d3.select("#task").text("Please copy your results onto your text file and move on to the Bar Graph Trials by clicking the button at the bottom of the page.")
						next_button.style.display = 'block';
					} else if(rep_check == 1) {
						d3.select("#task").text("Please copy your results onto your text file. Then, send it to John Frederick Duco on Slack.\nOnce you are done, please fill in our survey by cliking the button at the bottom of the page.")
						q.style.display = 'block';
					}
					res_table.style.display = 'table';
					reset_counts();
					return;
				}
			}
			beginTrials();
		}).style('cursor','pointer')//make it a pointer on mouseover
	
	if(REPRESENTATION == "text") {
	//create an 'invisible' circle of size half the max size of a bubble, simply to make it possible to click the smaller circles easily.
		sign.append('circle')
			.attr('cx', _w/2)
			.attr('cy', _w/2)
			.attr('r', bubble_max_radius/2)
			.style('fill', 'white')
  
		sign.append('text')
			.attr('x', _w/2)
			.attr('y', _w/divisor)
			.attr('text-anchor','middle')
			.attr('font-size', font_size+"px")
			.text(d => padding(d))
	} else if(REPRESENTATION == 'bar') {
  
		var bar_scale = d3.scaleLinear()
			.domain([MIN_VALUE, MAX_VALUE])
			.range([0, height]);
  
		sign.append('rect')
			.attr('x', 0)
			.attr('y', d => -bar_scale(d))
			.attr('width', width/NB_VALUES)
			.attr('height', d => bar_scale(d))
			.style('fill','black')
			.style('stroke','white')
	}
	return svg.node()
}