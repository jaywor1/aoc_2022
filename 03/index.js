const fs = require("fs");
const aoc = require("aoc_testing");

const input = fs.readFileSync("input.txt").toString();

aoc.logSolution(input, solution1, solution2);
aoc.checkTime(input, solution1, solution2);

function addScore(s) {
    if (s == s.toLowerCase()) {
        return s.charCodeAt(0) - 96;
    }
    else {
        return s.charCodeAt(0) - 38;
    }
}

function solution1(input) {
    const lines = aoc.crlfBullshit(input.split('\n'));
    let sol = 0;
    for (let z = 0; z < lines.length; z++) {
        for (let i = 0; i < lines[z].length / 2; i++) {
            let fullBreak = false;
            for (let y = lines[z].length / 2; y < lines[z].length; y++) {
                if (lines[z][i] == lines[z][y]) {
                    sol += addScore(lines[z][i]);
                    fullBreak = true;
                }
                if (fullBreak)
                    break;
            }
            if (fullBreak)
                break;
        }
    }
    return sol;
}
function solution2(input) {
    const lines = aoc.crlfBullshit(input.split('\n'));
    let sol = 0;

    for (let k = 0; k < lines.length; k += 3) {
        let fullBreak = false;
        for (let l = 0; l < lines[k].length; l++) {
            for (let m = 0; m < lines[k + 1].length; m++) {
                if (lines[k][l] == lines[k + 1][m]) {
                    for (let n = 0; n < lines[k + 2].length; n++) {
                        if (lines[k][l] == lines[k + 2][n]) {
                            sol += addScore(lines[k][l]);
                            fullBreak = true;
                        }
                        if (fullBreak)
                            break;
                    }
                    if (fullBreak)
                        break;
                }
                if (fullBreak)
                    break;
            }
            if (fullBreak)
                break;
        }
    }
    return sol;
}