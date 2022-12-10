const fs = require("fs");
const aoc = require("aoc_testing");

const input = fs.readFileSync("input.txt").toString();

aoc.logSolution(input, solution1, solution2);
aoc.checkTime(input, solution1, solution2);

function devideInput(splitedInput) {
    let index = 0;
    for (i in splitedInput) {
        if (splitedInput[i] == '') {
            index = i;
            break;
        }
    }

    return [splitedInput.splice(0, index), splitedInput.splice(1)];
}

function solution1(input) {
    const divided = devideInput(aoc.crlfBullshit(input.split('\n')));
    const lines = divided[0];
    const n = lines[lines.length - 1][lines[lines.length - 1].length - 2];

    let creates = [];

    for (let i = 0, z = 1; i < n; i++, z += 4) {
        let chars = [];
        for (let y = 0; y < lines.length - 1; y++) {
            if (lines[y][z] != ' ') {
                chars.push(lines[y][z]);
            }
        }
        creates.push(chars);
    }

    const moves = divided[1];

    for (let i = 0; i < moves.length; i++) {
        let currentMove = moves[i].split(' ');
        let from = Number(currentMove[3]) - 1;
        let to = Number(currentMove[5]) - 1;
        for (let y = 0; y < Number(currentMove[1]); y++) {

            creates[to].unshift(creates[from][0])
            creates[from].shift();
        }
    }

    let sol = "";
    for (let i = 0; i < creates.length; i++) {
        sol += creates[i][0];
    }

    return sol;
}


function solution2(arr, instructions) {
    const divided = devideInput(aoc.crlfBullshit(input.split('\n')));
    const lines = divided[0];
    const n = lines[lines.length - 1][lines[lines.length - 1].length - 2];

    let creates = [];

    for (let i = 0, z = 1; i < n; i++, z += 4) {
        let chars = [];
        for (let y = 0; y < lines.length - 1; y++) {
            if (lines[y][z] != ' ') {
                chars.push(lines[y][z]);
            }
        }
        creates.push(chars);
    }

    const moves = divided[1];

    for (let i = 0; i < moves.length; i++) {
        let currentMove = moves[i].split(' ');
        let times = Number(currentMove[1]);
        let from = Number(currentMove[3]) - 1;
        let to = Number(currentMove[5]) - 1;
        let fromList = [];

        for (let i = 0; i < times; i++) {
            fromList.push(creates[from][i]);
        }
        for (let i = fromList.length - 1; i >= 0; i--) {
            creates[to].unshift(fromList[i]);
        }
        for (let i = 0; i < times; i++) {
            creates[from].shift();
        }
    }

    let sol = "";
    for (let i = 0; i < creates.length; i++) {
        sol += creates[i][0];
    }

    return sol;
}