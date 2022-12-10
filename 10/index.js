const fs = require("fs");
const aoc = require("aoc_testing");

const input = fs.readFileSync("input.txt").toString();

console.log(solution1(input));

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