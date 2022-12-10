const fs = require("fs");
const aoc = require("aoc_testing");

const input = fs.readFileSync("input.txt").toString();

aoc.logSolution(input, solution1, solution2);
aoc.checkTime(input, solution1, solution2);

function solution1(input) {
    const lines = input.split('\n');

    let checks = [20, 60, 100, 140, 180, 220];
    let sol = 0;
    let cycle = 0;
    let register = 1;
    for (let i = 0; i < lines.length; i++) {
        let instruction = lines[i].split(' ');
        if (instruction.length == 2) {
            for (let y = 0; y < 2; y++) {
                cycle++;
                for (let z = 0; z < checks.length; z++) {
                    if (checks[z] == cycle) {
                        sol += cycle * register;
                        checks.shift();
                    }
                }
            }
            register += Number(instruction[1]);
        }
        else {
            cycle++;
            for (let z = 0; z < checks.length; z++) {
                if (checks[z] == cycle) {
                    sol += cycle * register;
                    checks.shift();
                }
            }
        }
    }

    return sol;
}

function solution2(input) {
    const lines = input.split('\n');

    let sol = ["", "", "", "", "", ""];
    let yAxis = 0;
    let cycle = 0;
    let register = 1;
    for (let i = 0; i < lines.length; i++) {
        let instruction = lines[i].split(' ');
        if (instruction.length == 2) {
            for (let y = 0; y < 2; y++) {
                cycle++;
                if (register - 1 < cycle && cycle < register + 3) {
                    sol[yAxis] += '#';
                }
                else {
                    sol[yAxis] += '.';
                }
                if (cycle % 40 == 0) {
                    yAxis++;
                    register += 40;
                }
            }
            register += Number(instruction[1]);
        }
        else {
            cycle++;
            if (register - 1 < cycle && cycle < register + 3) {
                sol[yAxis] += '#';
            }
            else {
                sol[yAxis] += '.';
            }
            if (cycle % 40 == 0) {
                yAxis++;
                register += 40;
            }
        }



    }

    return sol;

}