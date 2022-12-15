const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

console.log(handleInput(input)[3][2]);

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
function checkFinished(paths){
    for(i in paths){
        if(paths[i].isFinished == false){
            return false;
        }
    }
    return true;
}
function checkHorizontal(path,numArr,n){
    if(path.currentNode[0]+n < numArr[0].length && !path.visitedNodes.includes([path.currentNode[0] + n,path.currentNode[1]]))
       return true;
    return false;
}
function checkVertical(path,numArr,n){
    if(path.currentNode[0]+n < numArr[0].length
        && numArr[path.currentNode[0]][path.currentNode[1]]
        && !path.visitedNodes.includes([path.currentNode[0] + n,path.currentNode[1]]))
       return true;
    return false;
}
function solution1(input) {
    let numArr = handleInput(input);
    let currentPath = {visitedNodes: [[0,0]],isFinished: false,currentNode: [0,0],inTarget: false};
    let paths = [currentPath];

    while(!checkFinished(paths)){
                
    }


}








