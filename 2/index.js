function solution1(input){
    let score = 0;
    const lines = input.split('\n');
    for(let i = 0; i < lines.length-1;i++){
        let current = lines[i].split(' ');
        score += current[1].charCodeAt(0) -87;
        if(current[0].charCodeAt(0)-64 == current[1].charCodeAt(0) -87){
            score += 3;
        }
        switch(current[0]){
            case 'A':
                if(current[1] == 'Y')
                    score += 6;
                break;
            case 'B':
                if(current[1] == 'Z')
                    score += 6;
                break;
            case 'C':
                if(current[1] == 'X')
                    score += 6;
                break;
        }
    }
    return score;
}

function solution2(input){
    let score = 0;
    const lines = input.split('\n');
    for(let i = 0; i < lines.length-1;i+=2){
        let current = lines[i].split(' ');
        score += current[1].charCodeAt(0) -87;
        if(current[0].charCodeAt(0)-64 == current[1].charCodeAt(0) -87){
            score += 3;
        }
        switch(current[0]){
            case 'A':
                if(current[1] == 'Y')
                    score += 6;
                break;
            case 'B':
                if(current[1] == 'Z')
                    score += 6;
                break;
            case 'C':
                if(current[1] == 'X')
                    score += 6;
                break;
        }
    }
    for(let i = 1; i < lines.length-1;i+=2){
        let current = lines[i].split(' ');
        score += current[1].charCodeAt(0) -87;
        switch(current[1]){
            case 'Y':
                score += 3;
                break;
            case 'Z':
                score += 6;
                break;
        }
    }
    return score;
}
