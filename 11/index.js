const fs = require("fs");
const aoc = require("aoc_testing");

const input = fs.readFileSync("input.txt").toString();

aoc.checkTime(input, solution1, solution2);

console.log(performance.now);

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
        switch (lines[i][2]) {
            case 'n':
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
                let yesCond = Number(lines[i + 1].split(' ')[9]);
                let noCond = Number(lines[i + 2].split(' ')[9]);
                monkeys.push({ id: id, items: items, operation: operation, test: test, yesCond: yesCond, noCond: noCond, inspected: 0 });
                items = [];
                i = i + 3;
                break;
        }
    }
    return monkeys;
}
function inspect(monke, monkeys, saviour = Number.MAX_VALUE, worryReduction = 3) {
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
    currentItem = Math.floor(currentItem / worryReduction);
    if (currentItem > saviour) {
        currentItem = currentItem % saviour;
    }
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
function findSaviour(monkeys) {
    let saviour = 1;
    for (let i = 0; i < monkeys.length; i++) {
        saviour = saviour * monkeys[i].test;
    }
    return saviour;
}
function solution1(input) {
    let monkeys = handleInput(input);
    for (let round = 0; round < 20; round++) {
        for (let i = 0; i < monkeys.length; i++) {
            let currentLength = monkeys[i].items.length;
            for (let y = 0; y < currentLength; y++) {
                monkeys = inspect(monkeys[i], monkeys, Number.MAX_VALUE, 3);
            }
        }
    }
    return findActiveMonke(monkeys);
}
function solution2(input) {
    let monkeys = handleInput(input);
    let saviour = findSaviour(monkeys);
    for (let round = 0; round < 10000; round++) {
        for (let i = 0; i < monkeys.length; i++) {
            let currentLength = monkeys[i].items.length;
            for (let y = 0; y < currentLength; y++) {
                monkeys = inspect(monkeys[i], monkeys, saviour, 1);
            }
        }
    }
    return findActiveMonke(monkeys);
}