const fs = require("fs");
const aoc = require("aoc_testing");

const input = fs.readFileSync("input.txt").toString();

aoc.logSolution(input, solution1, solution2);
aoc.checkTime(input, solution1, solution2);

function solution1(input) {
    const lines = aoc.crlfBullshit(input.split('\n'));
    let sol = 0;
    for (let i = 0; i < lines.length - 1; i++) {
        let items = lines[i].split(',');
        let a = items[0].split('-');
        let b = items[1].split('-');
        if (Number(a[0]) <= Number(b[0]) && Number(a[1]) >= Number(b[1])) {
            sol++;
            continue;
        }
        else if (Number(a[0]) >= Number(b[0]) && Number(a[1]) <= Number(b[1])) {
            sol++;
            continue;
        }
    }
    return sol;
}

function solution2(input) {
    const lines = aoc.crlfBullshit(input.split('\n'));
    let sol = 0;
    for (let i = 0; i < lines.length - 1; i++) {
        let items = lines[i].split(',');
        let a = items[0].split('-');
        let b = items[1].split('-');
        if (Number(a[1]) == Number(b[1])) {
            sol++;
            continue;
        }
        else if (Number(a[1]) > Number(b[1])) {
            if (Number(b[1]) >= Number(a[0])) {
                sol++;
                continue;
            }
        } else if (Number(a[1]) < Number(b[1])) {
            if (Number(a[1]) >= Number(b[0])) {
                sol++;
                continue;
            }
        }

    }
    return sol;
}