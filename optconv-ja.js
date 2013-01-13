/* 8芯ケーブル光ファイバー線番（日本）変換器
 * かなり昔に作ったものをモダンなJavaScriptで再実装
 */
(function () {
		//色名, 背景色, 文字色
	var BLUE = ["青", "#00f", "#fff"],
		YELLOW = ["黄", "#ff0", "#000"],
		GREEN = ["緑", "#0f0", "#000"],
		RED = ["赤", "#f00", "#000"],
		PURPLE = ["紫", "#f0f", "#000"],
		PINK = ["桃", "#f9c", "#000"],
		WHITE = ["白", "#fff", "#000"],
		AQUA = ["水", "#0ff", "#000"],
		BROWN = ["茶", "#c00", "#fff"],
		//フォーム
		form,
		//入力フィールド
		inputField,
		//送信ボタン
		submitButton,
		//色を表示するElement
		box1, box2, box3, box4, box5, box6, box7, box8,
		//線番を表示するElement
		outputNumber,
		//スロット番号・テープ番号・線番を表示するElement
		slotTapeNumber;
		
	//onloadイベントでセットアップを実行
	window.onload = function() {
		setup();
	}
	function setup() {
		//Elementを取得
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
		//テーブルの初期化
		setDefault();
		//イベントの貼付け
		inputField.addEventListener("mousedown", function() {
			this.value = "";
		}, false);
		inputField.addEventListener("touchstart", function() {
			this.value = "";
			this.focus();
		}, false);
		submitButton.addEventListener("click", convert, false);
	}
	//値を変換してHTMLへ出力
	function convert() {
			//入力値
		var input,
			//スロット番号
			slot,
			//スロット内での線番
			inSlotNumber,
			//テープ番号
			tape,
			//テープ内での線番
			inTapeNumber;
		//入力された値を整数で取得（文字列などは0として取得）
		input = inputField.value | 0;
		//値が1未満だったら、値を1にする
		input = (input < 1) ? 1 : input;
		slot = inputToSlot(input);
		inSlotNumber = inputToInSlotNumber(input);
		tape = inSlotNumberToTape(inSlotNumber);
		inTapeNumber = inSlotNumberToInTapeNumber(inSlotNumber);
		//テープの色を設定
		setTapeColor(tape);
		outputNumber.innerHTML = "#" + input;
		slotTapeNumber.innerHTML = slot + "S " + tape + "T " + "#" + inTapeNumber;
		for (var i = 1; i <= 8; i ++) {
			eval("box"+i).style.borderColor = "#000";
		}
		eval("box"+inTapeNumber).style.borderColor = "#f00";
	}
	//線番をスロット番号に変換する
	function inputToSlot(number) {
		return Math.ceil(number / 80);
	}
	//線番からスロットの中での番号を出す
	function inputToInSlotNumber(number) {
		var temp = number % 80;
		if (temp != 0) {
			return temp;
		//余りが出ない＝入力値が80の倍数の場合は80を返す
		} else {
			return 80;
		}
	}
	//スロットの中での番号をテープ番号に変換する
	function inSlotNumberToTape(number) {
		return Math.ceil(number / 8);
	}
	//スロット内での番号をテープ内での番号に変換する
	function inSlotNumberToInTapeNumber(number) {
		var temp = number % 8;
		if (temp != 0) {
			return temp;
		} else {
			return 8;
		}
	}
	//テープの色の初期化
	function setDefault() {
		//青白白桃黄白白桃に設定
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
	//各ボックスに色を設定する
	//引数： 色の配列
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
	//上のメソッドを使って、テープ番号に従ってテープの色を設定する
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