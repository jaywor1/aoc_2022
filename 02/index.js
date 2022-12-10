const fs = require("fs");
const aoc = require("aoc_testing");

const input = fs.readFileSync("input.txt").toString();

aoc.logSolution(input, solution1, solution2);
aoc.checkTime(input, solution1, solution2);

function solution1(input) {
    let score = 0;
    const lines = aoc.crlfBullshit(input.split('\n'));
    for (let i = 0; i < lines.length; i++) {
        let current = lines[i].split(' ');
        score += current[1].charCodeAt(0) - 87;
        if (current[0].charCodeAt(0) - 64 == current[1].charCodeAt(0) - 87) {
            score += 3;
        }
        switch (current[0]) {
            case 'A':
                if (current[1] == 'Y')
                    score += 6;
                break;
            case 'B':
                if (current[1] == 'Z')
                    score += 6;
                break;
            case 'C':
                if (current[1] == 'X')
                    score += 6;
                break;
        }
    }
    return score;
}

function solution2(input) {
    let score = 0;
    const lines = aoc.crlfBullshit(input.split('\n'));
    for (let i = 0; i < lines.length; i++) {
        let current = lines[i].split(' ');
        switch (current[1]) {
            case 'X':
                if ((current[0].charCodeAt(0) - 62) > 3)
                    score += (current[0].charCodeAt(0) - 62) - 3;
                else
                    score += (current[0].charCodeAt(0) - 62);
                break;
            case 'Y':
                if ((current[0].charCodeAt(0) - 64) > 3) {
                    score += (current[0].charCodeAt(0) - 64) - 3;
                }
                else {
                    score += (current[0].charCodeAt(0) - 64);
                }
                score += 3;
                break;
            case 'Z':
                if ((current[0].charCodeAt(0) - 63) > 3) {
                    score += (current[0].charCodeAt(0) - 63) - 3;
                }
                else {
                    score += (current[0].charCodeAt(0) - 63);
                }
                score += 6;
                break;
        }
    }

    return score;
}