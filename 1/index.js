const fs = require("fs");
const aoc = require("aoc_testing");
const input = fs.readFileSync("input.txt").toString();

aoc.logSolution(input, solution1, solution2);
aoc.checkTime(input, 1000, solution1, solution2);

function solution1(input) {
    const arr = aoc.crlfBullshit(input.split('\n'));
    let currentElfCallories = 0;
    let sol = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '') {
            if (currentElfCallories > sol) {
                sol = currentElfCallories;
            }
            currentElfCallories = 0;
        }
        else {
            currentElfCallories += Number(arr[i]);
        }
    }
    return sol;
}

function solution2(input) {
    const arr = aoc.crlfBullshit(input.split('\n'));

    let currentElfCallories = 0;
    let elfs = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '') {
            elfs.push(currentElfCallories);
            currentElfCallories = 0;
        }
        else {
            currentElfCallories += Number(arr[i]);
        }
    }

    let sol = 0;


    for (let i = 0; i < 3; i++) {
        let biggestElf = Math.max(...elfs);
        sol += biggestElf;
        elfs.splice(elfs.indexOf(biggestElf));
    }

    return sol;
}