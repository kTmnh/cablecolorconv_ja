/* Fiber number to color code converter for Japanese ribbon slotted optical fiber cable.
 * 
 * Copyright (c) 2013 Katsumasa Tamanaha
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function () {
		//colorname (in ja), background-color, text-color
	var BLUE = ["青", "#00f", "#fff"],
		YELLOW = ["黄", "#ff0", "#000"],
		GREEN = ["緑", "#0f0", "#000"],
		RED = ["赤", "#f00", "#000"],
		PURPLE = ["紫", "#f0f", "#000"],
		PINK = ["桃", "#f9c", "#000"],
		WHITE = ["白", "#fff", "#000"],
		AQUA = ["水", "#0ff", "#000"],
		BROWN = ["茶", "#c00", "#fff"],
		//DOM Elements
		inputField,
		submitButton,
		//Tape table elements
		box1, box2, box3, box4, box5, box6, box7, box8,
		outputNumber,
		//Elements for displaying slot number, tape number, and number in tape.
		slotTapeNumber;
	//Execute setup function on load event.
	window.onload = function() {
		setup();
	}
	//Initial setup
	function setup() {
		//Get DOM Elements
		inputField = document.getElementById("input");
		submitButton = document.getElementById("submit_button");
		box1 = document.getElementById("box1");
		box2 = document.getElementById("box2");
		box3 = document.getElementById("box3");
		box4 = document.getElementById("box4");
		box5 = document.getElementById("box5");
		box6 = document.getElementById("box6");
		box7 = document.getElementById("box7");
		box8 = document.getElementById("box8");
		outputNumber = document.getElementById("output_number");
		slotTapeNumber = document.getElementById("slot_tape_number");
		//Set default colors for tape table.
		setDefault();
		//Attach event handlers for elements.
		inputField.onmousedown = function() {
			this.value = "";
		};
		inputField.ontouchstart = function() {
			this.value = "";
			this.focus();
		};
		submitButton.onclick = convert;
	}
	//Convert and output color table from input.
	function convert() {
		var input,
			slot,
			inSlotNumber,
			tape,
			inTapeNumber;
		//Get input value in an integer (| 0).
		input = inputField.value | 0;
		//Set input value to 1 if less than 1.
		input = (input < 1) ? 1 : input;
		//Get slot number from input value.
		slot = inputToSlot(input);
		//Get in slot number from input.
		inSlotNumber = inputToInSlotNumber(input);
		//Get tape number from in slot number.
		tape = inSlotNumberToTape(inSlotNumber);
		//Get in tape number from in slot number.
		inTapeNumber = inSlotNumberToInTapeNumber(inSlotNumber);
		//Set colors 
		setTapeColor(tape);
		outputNumber.innerHTML = "#" + input;
		slotTapeNumber.innerHTML = slot + "S " + tape + "T " + "#" + inTapeNumber;
		for (var i = 1; i <= 8; i ++) {
			eval("box"+i).style.borderColor = "#000";
		}
		eval("box"+inTapeNumber).style.borderColor = "#f00";
	}
	//Convert input number into slot number
	function inputToSlot(number) {
		//Each slot has 10 tapes
		return Math.ceil(number / 80);
	}
	//Convert input number into a number in slot
	function inputToInSlotNumber(number) {
		var temp = number % 80;
		if (temp != 0) {
			return temp;
		} else {
			return 80;
		}
	}
	//Convert in slot number into tape number
	function inSlotNumberToTape(number) {
		return Math.ceil(number / 8);
	}
	//Convert in slot number into in tape number
	function inSlotNumberToInTapeNumber(number) {
		var temp = number % 8;
		if (temp != 0) {
			return temp;
		} else {
			return 8;
		}
	}
	//Set default color set.
	function setDefault() {
		//Numbers of box 2,3,6,7 are always white
		box1.innerHTML = BLUE[0];
		box2.innerHTML = box3.innerHTML = WHITE[0];
		box4.innerHTML = PINK[0];
		box5.innerHTML = YELLOW[0];
		box6.innerHTML = box7.innerHTML = WHITE[0];
		box8.innerHTML = PINK[0];
		box1.style.backgroundColor = BLUE[1];
		box2.style.backgroundColor = box3.style.backgroundColor = WHITE[1];
		box4.style.backgroundColor = PINK[1];
		box5.style.backgroundColor = YELLOW[1];
		box6.style.backgroundColor = box7.style.backgroundColor = WHITE[1];
		box8.style.backgroundColor = PINK[1];
		box1.style.color = BLUE[2];
		box2.style.color = box3.style.color = WHITE[2];
		box4.style.color = PINK[2];
		box5.style.color = YELLOW[2];
		box6.style.color = box7.style.color = WHITE[2];
		box8.style.color = PINK[2];
	}
	//Set each box's color
	//Arg: color variables for box 1,4,5,8
	function setBoxColor(color1, color4, color5, color8) {
		box1.innerHTML = color1[0];
		box4.innerHTML = color4[0];
		box5.innerHTML = color5[0];
		box8.innerHTML = color8[0];
		box1.style.backgroundColor = color1[1];
		box4.style.backgroundColor = color4[1];
		box5.style.backgroundColor = color5[1];
		box8.style.backgroundColor = color8[1];
		box1.style.color = color1[2];
		box4.style.color = color4[2];
		box5.style.color = color5[2];
		box8.style.color = color8[2];
	}
	//Set tape color from tape number
	function setTapeColor(tape) {
		switch (tape) {
			case 1:
				setBoxColor(BLUE, PINK, YELLOW, PINK);
				break;
			case 2:
				setBoxColor(GREEN, PINK, BROWN, PINK);
				break;
			case 3:
				setBoxColor(PURPLE, PINK, BLUE, WHITE);
				break;
			case 4:
				setBoxColor(YELLOW, WHITE, GREEN, WHITE);
				break;
			case 5:
				setBoxColor(RED, WHITE, PURPLE, WHITE);
				break;
			case 6:
				setBoxColor(BLUE, AQUA, YELLOW, AQUA);
				break;
			case 7:
				setBoxColor(GREEN, AQUA, RED, AQUA);
				break;
			case 8:
				setBoxColor(PURPLE, AQUA, BLUE, BROWN);
				break;
			case 9:
				setBoxColor(YELLOW, BROWN, GREEN, BROWN);
				break;
			case 10:
				setBoxColor(RED, BROWN, PURPLE, BROWN);
				break;
		}
	}
})();