const test = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1
`;

handleInput(test);

console.log(solution1(test));
console.log(solution2(test));


function handleInput(input) {
    const lines = input.split('\n');

    let monkeys = [];
    let split;
    let id;
    let numbers;
    let operation;
    let items = [];
    for (let i = 0; i < lines.length; i++) {
        let splited = lines[i].split(' ');
        switch (lines[i][0]) {
            case 'M':
                // ! BAD PRACITCE
                id = Number(lines[i].split(' ')[1].substr(0, 1));
                break;
            case 'S':
                split = lines[i].split(': ');
                numbers = split[1].split(', ');
                for (let y = 0; y < numbers.length; y++) {
                    items.push(Number(numbers[y]))
                }
                break;
            case 'O':
                operation = lines[i].split(': ')[1].split('= ')[1];
                break;
            case 'T':
                let test = Number(lines[i].split(': ')[1].split(' ')[2]);
                let yesCond = Number(lines[i + 1].split(' ')[7]);
                let noCond = Number(lines[i + 2].split(' ')[7]);
                monkeys.push({ id: id, items: items, operation: operation, test: test, yesCond: yesCond, noCond: noCond, inspected: 0 });
                items = [];
                i = i + 3;
                break;
        }
    }
    return monkeys;
}

function inspect(monke, monkeys, worryReduction = 3) {
    monke.inspected++;
    let currentItem = Number(monke.items[0]);
    let equation = monke.operation.replace("old", currentItem);
    while (equation.includes("old")) {
        equation = equation.replace("old", currentItem);
    }

    equation = equation.split(' ');
    switch (equation[1]) {
        case '*':
            currentItem = Number(equation[0]) * Number(equation[2]);
            break;
        case '+':
            currentItem = Number(equation[0]) + Number(equation[2]);
            break;
    }
    currentItem = Math.floor(currentItem / 3);
    if (currentItem % monke.test == 0) {
        monkeys.find(x => x.id == monke.yesCond).items.push(currentItem);
    }
    else {
        monkeys.find(x => x.id == monke.noCond).items.push(currentItem);
    }
    monke.items.shift();

    return monkeys;

}


function findActiveMonke(monkeys) {
    let activeMonkeA = 0, activeMonkeB = 0;
    for (let i = 0; i < monkeys.length; i++) {
        if (activeMonkeA < monkeys[i].inspected) {
            activeMonkeB = activeMonkeA;
            activeMonkeA = monkeys[i].inspected;
        }
        else if (activeMonkeB < monkeys[i].inspected) {
            activeMonkeB = monkeys[i].inspected;
        }
    }
    return activeMonkeA * activeMonkeB;
}

function solution1(input) {
    let monkeys = handleInput(input);
    for (let round = 0; round < 20; round++) {
        for (let i = 0; i < monkeys.length; i++) {
            let currentLength = monkeys[i].items.length;
            for (let y = 0; y < currentLength; y++) {
                monkeys = inspect(monkeys[i], monkeys, 1);
            }
        }
    }
    return findActiveMonke(monkeys);
}
function solution2(input) {
    let monkeys = handleInput(input);
    for (let round = 0; round < 1; round++) {
        for (let i = 0; i < monkeys.length; i++) {
            let currentLength = monkeys[i].items.length;
            for (let y = 0; y < currentLength; y++) {
                monkeys = inspect(monkeys[i], monkeys);
            }
        }
    }
    return monkeys;
}