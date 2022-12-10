const fs = require("fs");
const aoc = require("aoc_testing");

const input = fs.readFileSync("input.txt").toString();

aoc.logSolution(input, solution1, solution2);
aoc.checkTime(input, solution1, solution2);

function getSol(input) {
    let lines = aoc.crlfBullshit(input.split('\n'));

    let directories = [];
    let sol = [];

    for (let i = 0; i < lines.length; i++) {
        let split = lines[i].split(' ');
        if (split[0] == '$') {
            if (split[1] == "cd") {
                if (split[2] == "..") {
                    directories.pop();
                }
                else {
                    directories.push(i);
                    sol.push({ id: i, bytes: 0, name: split[2] });
                }
            }
            else if (split[1] == "ls") {
                i++;
                for (i; i < lines.length; i++) {
                    if (lines[i][0] == '$') {
                        i--;
                        break;
                    }
                    temp = lines[i].split(' ');
                    if (temp[0] == "dir")
                        continue;
                    for (let y = 0; y < directories.length; y++) {
                        sol.find(x => x.id == directories[y]).bytes += Number(temp[0]);
                    }
                }
            }
        }
    }
    return sol;
}

function solution1(input) {

    let sol = getSol(input);
    let realSolution = 0;

    for (let i = 0; i < sol.length; i++) {
        if (sol[i].bytes < 100000)
            realSolution += sol[i].bytes;
    }

    return realSolution;
}

function solution2(input) {
    let sol = getSol(input);
    let lowest = { id: -1, bytes: 999999999999, name: "" };
    let updateSize = (30000000) - (70000000 - sol[0].bytes);
    for (let i = 0; i < sol.length; i++) {
        if (sol[i].bytes > updateSize && sol[i].bytes < lowest.bytes)
            lowest = sol[i];
    }
    return lowest.bytes;
}