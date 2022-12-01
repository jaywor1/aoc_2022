function solution1(input){
    const arr = input.split('\n');

    let currentElfCallories = 0;
    let sol = 0;

    for(let i = 0;i < arr.length;i++){
        if(arr[i] == ''){
            if(currentElfCallories > sol){
                sol = currentElfCallories;
            }
            currentElfCallories = 0;
        }
        else{
            currentElfCallories += Number(arr[i]);
        }
    }
    return sol;
}

function solution2(input){
    const arr = input.split('\n');

    let currentElfCallories = 0;
    let elfs = [];

    for(let i = 0;i < arr.length;i++){
        if(arr[i] == ''){
            elfs.push(currentElfCallories);
            currentElfCallories = 0;
        }
        else{
            currentElfCallories += Number(arr[i]);
        }
    }

    let sol = 0;


    for(let i = 0;i < 3;i++){
        let biggestElf = Math.max(...elfs);
        sol += biggestElf;
        elfs.splice(elfs.indexOf(biggestElf));
    }

    return sol;
}
