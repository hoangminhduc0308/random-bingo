const { create } = require("domain");

function pad(length, num) {
	let d = num.toString().length;
	return "0" * (length - d) + num.toString();
}

function shuffle(a) {
	for (var i = a.length - 1; i >= 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = a[j];
		a[j] = a[i];
		a[i] = temp;
	}
}

var edge_length = 0;
// var ipzone = document.getElementById("input-zone");
// var cpzone = document.getElementById("computer-zone");
var board_size = 0;
var max_range = 0;
var cell_border_style = "border: 3px solid transparent";
var error_border_style = "border: 1px solid red";
var num_list = [];
var player_board = [];
var computer_board = [];
var player_checked = [];
var computer_checked = [];

/**
 *
 * @param location define on either zone (player input, computer input)
 * @param add_apply_button
 * @param computer_gen (if the board is randomly generated)
 */
function create_board(location, add_apply_button, computer_gen) {
	edge_length = Number(document.getElementById("boardsize").value);
	if (edge_length != 0) {
		computer_board = [];
		board_size = edge_length * edge_length;
		max_range = board_size * 2;
		var digits = max_range.toString().length;

		num_list = [];
		for (let i = 1; i <= max_range; i++) {
			num_list.push(i);
		}
		shuffle(num_list);
		var zone = document.getElementById(location);
		zone.innerHTML = "";
		for (var i = 0; i < edge_length; i++) {
			var line = document.createElement("div");
			line.style = "margin: auto";
			var lst = []; //use for computer gen only.
			for (var j = 0; j < edge_length; j++) {
				var cell = document.createElement("textarea");
				cell.cols = digits;
				cell.rows = 1;
				cell.maxLength = digits;
				cell.style.cssText = cell_border_style;
				cell.className = `${i * edge_length + j}`;

				line.appendChild(cell);
				if (computer_gen) {
					cell.textContent = num_list[i * edge_length + j].toString();
					lst.push(num_list[i * edge_length + j]);
				}
			}
			if (computer_gen) {
				computer_board.push(lst);
			}
			zone.appendChild(line);
		}

		if (add_apply_button) {
			let apply_button = document.createElement("button");
			apply_button.textContent = "Game start!";
			zone.appendChild(apply_button);
		}
	}
}

function create_board_manual() {
	create_board("input-zone", true, false);
	create_board("computer-zone", false, true);
}

function create_board_auto() {
	create_board("input-zone", true, true);
	create_board("computer-zone", false, true);
}

/**
 *
 * @param location checks either spot for validity
 * @returns
 */
function check_valid_board(location) {
	var zone = document.getElementById(location);
	var s = new Set();
	var valid = true;
	for (var i = 0, a = zone.children; i < a.length; i++) {
		var i = a[i];
		for (var b = 0, c = i.children; b < c.length; b++) {
			var j = c[b];
			var v = j.textContent;
			if (
				v == "" ||
				!s.has(v) ||
				Number(v) < 1 ||
				Number(v) > max_range
			) {
				j.style.cssText = error_border_style;
				valid = false;
			} else {
				s.add(v);
			}
		}
	}
	return valid;
}

/**
 *
 * @param checked the array that check if a square is checked.
 * @returns
 */
function count_lines(checked) {
	var len = checked[0].length;
	var total = 0;
	var t = 1;
	//horizontal
	for (var i = 0; i < len; i++) {
		t = 1;
		for (var j = 0; j < len; j++) {
			if (checked[i][j] == false) {
				t = 0;
			}
		}
		total += t;
	}
	//vertical
	for (var i = 0; i < len; i++) {
		t = 1;
		for (var j = 0; j < len; j++) {
			if (checked[j][i] == false) {
				t = 0;
			}
		}
		total += t;
	}
	//main diagonal
	for (var i = 0; i < len; i++) {
		if (checked[i][i] == false) t = 0;
	}
	total += t;
	//other diagonal
	for (var i = 0; i < len; i++) {
		if (checked[i][len - 1 - i] == false) t = 0;
	}
	total += t;
	return total;
}

function scan(value) {
	for (let i = 0; i < board_size; i++) {
		let cells = document.getElementsByClassName(i.toString());
		if (cells[0].value == value.toString()) {
			cells[0].style = "background-color: #9aeb6c";
		}
		if (cells[1].value == value.toString()) {
			cells[1].style = "background-color: #9aeb6c";
		}
	}
}

// function game_start(){
//     num_list = [];
//     for (let i = 1; i <= max_range; i++){
//         num_list.push(i);
//     }
//     shuffle(num_list);
//     for (let i = 0; i < max_range && count_lines(player_board) < edge_length && count_lines(computer_board) < edge_length; i++){
//         let current_val = num_list[i];
//         let gamezone = document.getElementById("game");
//         //scan player
//         let ipzone = document.getElementById("input-zone");
//         let cpzone = document.getElementById("computer-zone");

//     }
// }
