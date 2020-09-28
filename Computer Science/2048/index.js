// Final version of game 2048!!!!

function shift(a, dir) { 
	let b = [];
	let count = 0;
	for(let i = 0; i < a.length; i++) {
		if (a[i] == 0) {
			count++;
		}
	}
	if (dir == "left") {
		for(let i = 0; i < a.length; i++) {
			if (a[i] != 0) {
				b.push(a[i]);
			}
		}
		for(let i = 1; i <= count; i++){
			b.push(0); 
		}
		return b;	
	} else if (dir == "right") {
		for(let i = 1; i <= count; i++){
			b.push(0); 
		}
		for(let i = 0; i < a.length; i++) {
			if (a[i] != 0) {
				b.push(a[i]);
			}
		}	
		return b;	
	} 
}

function shiftAndCombine(a, dir) {
	let b = [];
	let aNew = shift(a, dir);
	if (dir == "right") {
		aNew.reverse();
	}
	for(let i = 0; i < aNew.length; ) {
		if (aNew[i] == aNew[i+1]) {
			b.push(aNew[i] + aNew[i+1]);
			i += 2;
		} else {
			b.push(aNew[i]);
			i += 1;
		}
	}
	let empty = a.length - b.length;
	for(let i = 0; i < empty; i++) {
		b.push(0);
	}
	if (dir == "right") {
		b.reverse();
	}
	return b;
}

 // print 2D array
 function print(b) {
    for(let i = 0; i < b.length; i++) {
        for(let j = 0; j < b[i].length; j++) {
        	if (b[i][j] > 0) {
	            process.stdout.write(b[i][j] + "\t");
        	} else {
	            process.stdout.write(".\t");
        	}
        }
        console.log(); // 2 0 2 2 --> left - right: 4 2 0 0 - 0 0 2 4 
    }
}

function generate(b) {
	for(let i = 0; i < b.length; i++) {
		for(let j = 0; j < b[i].length; j++) {
			if (b[i][j] === 0) {
				if (Math.random() < 0.1) { // 10% probability 
					if (Math.random() < 0.75) { // 75% probability generate 2, 25%robability generate 4
						b[i][j] = 2;
					} else {
						b[i][j] = 4;
					}
				}
			}
		}
	}
	return b;
}
// from the beginning till here is a one-dimensional array

// from here onwards is a two-dimensional array
function shift2DArray(a, dir) {
	let newDir = 0;
	let b = [];

	if ((dir == "left") || (dir == "right")) {
		for(let i = 0; i < a.length; i++) {
			b.push(shiftAndCombine(a[i], dir));
		}
	} else if ((dir == "up") || (dir == "down")) {
		if (dir == "up") {
			newDir = "left";
		} else if (dir == "down") {
			newDir = "right";
		}
		a = transpose(a);
		for(let i = 0; i < a.length; i++) {
			b.push(shiftAndCombine(a[i], newDir));
		}
		b = transpose(b);
	}
	b = generate(b);
	return b;
}


function transpose(a) {
	let b = [];
	for(let i = 0; i < a.length; i++) {
		b.push([]);
		for(let j = 0; j < a.length; j++) {
			if (i == j){
				b[i].push(a[i][j]);
			} else if(i != j) {
				b[i].push(a[j][i]);
			}
		}
	}
	return b;
}

let A = [
	[2, 2, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
]
print(A);

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
	if (key.ctrl && key.name === 'c') { // === Compare same value and same type
    	process.exit();
  	} else {
  		if (key.name === "left") {
  			//console.log("LEFT");
  			console.clear();
  			A = shift2DArray(A, "left");
  			print(A);
  		} 
  		
  		else if (key.name === "right") {
  			//console.log("RIGHT"); 
  			console.clear(); 
  			A = shift2DArray(A, "right");
  			print(A);
  		}
  		else if (key.name === "up") {
  			//console.log("UP"); 
  			console.clear(); 
  			A = shift2DArray(A, "up");
  			print(A);
  		}
  		else if (key.name === "down") {
  			//console.log("DOWN"); 
  			console.clear(); 
  			A = shift2DArray(A, "down");
  			print(A);
  		}
  	}
});
console.log('Press any key...');





