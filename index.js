// 1. Counting Sheep

function sheep(num) {
    if (num <= 0) {
        console.log('All sheep jumped over the fence.');
        return;
    }
    console.log(`${num}: Another sheep jumps over the fence.`);
    sheep(num - 1);
}

sheep(7);


// 2. Power Calculator

function powerCalulator(base, exp, product) {
    if (exp === 1) {
        return product;
    }
    if (exp === 0) {
        return 1;
    }
    if (exp < 0) {
        return 'Exponent should be >= 0';
    }
    return powerCalulator(base, exp - 1, (product ? product : base) * base);
}

console.log(powerCalulator(2, 7)); // 128
console.log(powerCalulator(2, 0)); // 1
console.log(powerCalulator(2, -7)); // Exponent should be >= 0


// 3. Reverse String

function reverse(str) {
    if (!str.length) {
        return '';
    }
    return str.charAt(str.length - 1) + reverse(str.slice(0, str.length - 1));
}

console.log(reverse('Racecar'));
console.log(reverse('Reverse this!'));


// 4. nth Triangular Number

function triangular(n) {
    if (n < 0) return 'N must be >= 0 as it is impossible to have negative length.';
    if (n === 0 || n === 1) return n;

    return n + triangular(n - 1);
}

console.log(triangular(3)); //6
console.log(triangular(7)); //28
console.log(triangular(0)); //0
console.log(triangular(-2)); // N must be >= 0 as it is impossible to have negative length.


// 5. String Splitter

function splitter(str, start = 0) {
    if (start > str.length) {
        return 'Starting value cannot exceed number of items in the array.';
    }
    if (start === str.length) {
        return [str];
    }
    if (str.charAt(start) !== '/') {
        return splitter(str, ++start);
    }
    if (str.charAt(start) === '/') {
        return [str.slice(0, start), ...splitter(str.slice(start + 1))];
    }
}

console.log(splitter('02/20/2020'));//Array(3) ["02", "20", "2020"]
console.log(splitter('02/20/2020', 12));//Starting value cannot exceed number of items in the array.
console.log(splitter('This/is/working'));//Array(3) ["This", "is", "working"]


// 6. Fibonacci

function fibonacci(n, prev, next = 0) {
    if (n === 0) {
        return;
    }
    if (next === 0) {
        console.log(1);
        return fibonacci(n - 1, 0, 1);
    }
    console.log(prev + next);
    return fibonacci(n - 1, next, prev + next);
}

fibonacci(8);

// 7. Factorial

function factorial(n, product = 0) {
    if (n === 0) return product;
    if (product === 0) {
        return factorial(n - 1, n);
    }
    return factorial(n - 1, n * product);
}

console.log(factorial(5)); //120
console.log(factorial(8)); //40320


// 8/9. Find a way out of the maze / Find All the ways out of the maze

function aWayOut(multiArray, x = 0, y = 0) {
    //If at exit return else block the current space
    if (multiArray[y][x] === 'e') {
        return 'exit';
    } else multiArray[y][x] = '*';

    //Determine if any moves are legal.
    let d, u, r, l;
    if (x + 1 < multiArray[y].length) {
        r = (multiArray[y][x + 1] !== '*');
    } else r = false;

    if (x - 1 >= 0) {
        l = (multiArray[y][x - 1] !== '*');
    } else l = false;

    if (y + 1 < multiArray.length) {
        d = (multiArray[y + 1][x] !== '*');
    } else d = false;

    if (y - 1 >= 0) {
        u = (multiArray[y - 1][x] !== '*');
    } else u = false;

    let options = [d, r, u, l];
    let movement = [[x, y + 1], [x + 1, y], [x, y - 1], [x - 1, y]];
    let directions = ['D', 'R', 'U', 'L'];

    //One branch may have mutliple exit paths.
    let paths = [];
    for (let i = 0; i < options.length; i++) {
        //If movement option is valid
        if (options[i]) {
            //creates a deep copy of the multi array given to disallow branching paths from interfereing with other paths.
            let newMultiArray = multiArray.map(row => [...row]);
            let possiblePath = aWayOut(newMultiArray, movement[i][0], movement[i][1]);

            if (possiblePath) {
                //If child has more than one path.
                if (Array.isArray(possiblePath)) {
                    possiblePath.forEach(path => {
                        paths.push(directions[i] + path);
                    });
                } else paths.push(directions[i] + possiblePath);
            }
        }
    }
    if (paths.length) {
        return paths;
    }

    return null;
}

let mySmallMaze = [
    [' ', ' ', ' '],
    [' ', '*', ' '],
    [' ', ' ', 'e']
];

let maze = [
    [' ', ' ', ' ', '*', ' ', ' ', ' '],
    ['*', '*', ' ', '*', ' ', '*', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', '*', '*', '*', '*', '*', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', 'e']
];

console.log(aWayOut(mySmallMaze));
console.log(aWayOut(maze));


// 10. Anagrams

function anagrams(str, prefix) {
    if (str.length > 2) {
        let list = [];
        for (let i = 0; i < str.length; i++) {
            let remainingLetters = str.split('');
            remainingLetters.splice(i, 1);
            remainingLetters = remainingLetters.join('');
            let combinationList = anagrams(remainingLetters, str.charAt(i));
            combinationList.forEach(combination => {
                list.push(str.charAt(i) + combination);
            });
        }
        return list;
    } else {
        let options = [str, str.charAt(1) + str.charAt(0)];
        return options;
    }
}

console.log(anagrams('the')); // the, teh, hte, het, eth, eht, 
console.log(anagrams('east'));


// 11. Organization Chart

function organize(obj, spaces = 0 ) {
    let blankspaces = '';
    for(let i = 0; i< spaces; i ++) {
        blankspaces += '\xa0';
    }
    if(Array.isArray(obj)) {
        obj.forEach(person => {
            console.log(blankspaces + person);
        })
    }else{
        Object.keys(obj).forEach(key => {
            console.log(blankspaces + key);
            organize(obj[key], spaces + 4);
        });
    }
    
}

let obj = {
    Zuckerberg: {
        Schroepfer: {
            Bosworth: [
                'Steve', 
                'Kyle', 
                'Andra'],
            Zhao: [
                'Richie', 
                'Sofia', 
                'Jen']
        },
        Schrage: {
            VanDyck: [
                'Sabrina', 
                'Michelle', 
                'Josh'],
            Swain: [
                'Blanch',
                'Tom', 
                'Joe']
        },
        Sandberg: {
            Goler: [
                'Eddie',
                'Julie',
                'Annie'],
            Hernandez: [
                'Rowi',
                'Inga',
                'Morgan'],
            Moissinac: [
                'Amy',
                'Chuck',
                'Vinni'],
            Kelley: [
                'Eric',
                'Ana',
                'Wes'],
        }
    }
};

organize(obj);


// 12. Binary Representation

function binary(num) {
    if (num <= 0) return '';
    return `${binary(Math.floor(num / 2))}` + `${num % 2}`;
}

console.log(binary(25));
console.log(binary(12554));