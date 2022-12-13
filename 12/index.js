const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

console.log(handleInput(input));

function handleInput(input) {
    const arr = input.split('\n');
    return charArrToNums(arr);
}
function charArrToNums(arr) {
    let numArr = new Array(arr.length).fill(null).map(() => new Array(arr[0].length).fill(null))
    for (let i = 0; i < arr.length; i++) {
        for (let y = 0; y < arr[0].length; y++) {
            numArr[i][y] = arr[i][y].charCodeAt(0);
        }
    }
    return numArr;
}
function solution1(input) {
    numArr = handleInput(input);
}








