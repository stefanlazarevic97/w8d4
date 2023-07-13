// solution with "arguments" keyword:

function sum() {
    let total = 0;

    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }

    return total;
}

// console.log(sum(1, 2, 3, 4));
// console.log(sum(1, 2, 3, 4, 5));

// solution with "..." rest operator:

function restSum (...args) {
	let total = 0;
    
    args.forEach((arg)=> {
        total += arg;
    });

	// for(let i = 0; i < args.length; i++) {
	// 	total += args[i];
	// }

	console.log(total);
}

// restSum(1, 2, 3, 4);
// restSum(1, 2, 3, 4, 5);

Function.prototype.myBindArguments = function(context) {
    const func = this;
    const bindArgs = Array.from(arguments).slice(1);
    
    return function() {
        const callArgs = Array.from(arguments);
        func.apply(context, bindArgs.concat(callArgs));
    }
}

Function.prototype.myBindRest = function(context, ...bindArgs) {
    const func = this;

    return function(...callArgs) {
        func.call(context, ...bindArgs, ...callArgs);
    }
}

// class Cat {
//     constructor(name) {
//         this.name = name;
//     }

//     says(sound, person) {
//         console.log(`${this.name} says ${sound} to ${person}!`);
//         return true;
//     }
// }

// class Dog {
//     constructor(name) {
//         this.name = name;
//     }
// }

// const markov = new Cat("Markov");
// const pavlov = new Dog("Pavlov");

// markov.says("meow", "Ned");
// markov.says.myBindRest(pavlov, "meow", "Kush")();
// markov.says.myBindRest(pavlov)("meow", "a tree");
// markov.says.myBindRest(pavlov, "meow")("Markov");
// const notMarkovSays = markov.says.myBindRest(pavlov);
// notMarkovSays("meow", "me");

// curriedSum

function curriedSum(numArgs) {
    let numbers = [];

    function _curriedSum(num) {
        numbers.push(num);

        if (numbers.length === numArgs) {
            return sum(...numbers);
        } else {
            return _curriedSum;
        }
    }

    return _curriedSum;
}

// const csum = curriedSum(4);
// console.log(csum(5)(30)(20)(1)); // => 56

Function.prototype.curry = function(numArgs) {
	let args = [];
	const func = this;

	function _curriedFunction(arg) {
		args.push(arg);

		if (args.length === numArgs) {
			return func.apply(null, args);
		} else {
            return _curriedFunction;
        }
	}

    return _curriedFunction;
}

function sumThree(num1, num2, num3) {
	return num1 + num2 + num3;
}

console.log(sumThree.curry(3)(4)(20)(6)); // => 30