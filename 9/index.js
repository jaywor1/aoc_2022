const fs = require("fs");
const aoc = require("aoc_testing");

const input = fs.readFileSync("input.txt").toString();

console.log(solution1(input));

function isTouching(head, tail) {
    for (let x = head.x - 1; x < head.x + 2; x++) {
        for (let y = head.y - 1; y < head.y + 2; y++) {
            if (tail.x == x && tail.y == y) {
                return true;
            }
        }
    }
    return false;

}

function uniqueMoves(moves) {
    let uniqueMov = [moves[0]];
    for (let i = 0; i < moves.length; i++) {
        let add = true;
        for (let y = 0; y < uniqueMov.length; y++) {
            if (uniqueMov[y].x == moves[i].x && uniqueMov[y].y == moves[i].y) {
                add = false;
                break;
            }
        }
        if (add)
            uniqueMov.push(moves[i]);
    }
    return uniqueMov.length;
}


function solution1(input) {
    const lines = aoc.crlfBullshit(input.split('\n'));
    let head = { x: 0, y: 0 };
    let tail = { x: 0, y: 0 };
    let moves = [{ x: 0, y: 0 }];

    for (i in lines) {
        let currentLine = lines[i].split(' ');
        for (let y = 0; y < currentLine[1]; y++) {
            switch (currentLine[0]) {
                case 'U':
                    head.y++;
                    break;
                case 'D':
                    head.y--;
                    break;
                case 'R':
                    head.x++;
                    break;
                case 'L':
                    head.x--;
                    break;
            }
            if (!isTouching(head, tail)) {
                if (head.x == tail.x) {
                    if (head.y > tail.y)
                        tail.y++;
                    else
                        tail.y--;

                }
                else if (head.y == tail.y) {
                    if (head.x > tail.x)
                        tail.x++;
                    else
                        tail.x--;

                }
                else {
                    if (head.y > tail.y)
                        tail.y++;
                    else
                        tail.y--;
                    if (head.x > tail.x)
                        tail.x++;
                    else
                        tail.x--;
                }
                moves.push({ x: tail.x, y: tail.y });
            }
        }

    }

    return uniqueMoves(moves);


}