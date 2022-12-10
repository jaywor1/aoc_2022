const fs = require("fs");
const aoc = require("aoc_testing");

const input = fs.readFileSync("input.txt").toString();

aoc.logSolution(input, solution1, solution2);
aoc.checkTime(input, solution1, solution2);

function solution1(input) {
    let chain = 1;
    let i = 1;
    for (i; i < input.length; i++) {
        for (let y = 1; y < chain + 1; y++) {
            if (input[i - y] == input[i])
                chain = 0;
        }
        chain++;
        if (chain == 4)
            break;
    }
    return i + 1;
}

function solution2(input) {
    let chain = 0;
    let i = 0;
    for (i; i < input.length; i++) {
        for (let y = 1, z = chain; y < chain + 1; y++, z--) {
            if (input[i - y] == input[i]) {
                chain -= z;
                break;
            }
        }
        chain++;
        if (chain == 14)
            break;
    }
    return i + 1;
}