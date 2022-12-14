const test = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

const plsWork = `Monkey 0:
Starting items: 59, 65, 86, 56, 74, 57, 56
Operation: new = old * 17
Test: divisible by 3
  If true: throw to monkey 3
  If false: throw to monkey 6

Monkey 1:
Starting items: 63, 83, 50, 63, 56
Operation: new = old + 2
Test: divisible by 13
  If true: throw to monkey 3
  If false: throw to monkey 0

Monkey 2:
Starting items: 93, 79, 74, 55
Operation: new = old + 1
Test: divisible by 2
  If true: throw to monkey 0
  If false: throw to monkey 1

Monkey 3:
Starting items: 86, 61, 67, 88, 94, 69, 56, 91
Operation: new = old + 7
Test: divisible by 11
  If true: throw to monkey 6
  If false: throw to monkey 7

Monkey 4:
Starting items: 76, 50, 51
Operation: new = old * old
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 5

Monkey 5:
Starting items: 77, 76
Operation: new = old + 8
Test: divisible by 17
  If true: throw to monkey 2
  If false: throw to monkey 1

Monkey 6:
Starting items: 74
Operation: new = old * 2
Test: divisible by 5
  If true: throw to monkey 4
  If false: throw to monkey 7

Monkey 7:
Starting items: 86, 85, 52, 86, 91, 95
Operation: new = old + 6
Test: divisible by 7
  If true: throw to monkey 4
  If false: throw to monkey 5
`;

console.log(solution1(plsWork));

function findSaviour(monkeys){
  let saviour = 1;
  for (let i = 0; i < monkeys.length; i++) {
      saviour = saviour * monkeys[i].test;
  }
  return saviour;
}

function inspect(monkeys,saviour,worry = 3){
  for (let i = 0; i < monkeys.length; i++) {
    let monkeLen = monkeys[i].items.length;
    monkeys[i].inspected += monkeLen;
    for (let y = 0; y < monkeLen; y++) {
        let eq = monkeys[i].operation;
        eq = eq.replace("old", monkeys[i].items[0]);
        while (eq.includes("old")) {
            eq = eq.replace("old", monkeys[i].items[0]);
        }
        eq = eq.split(' ');

        switch (eq[1]) {
            case '+':
                monkeys[i].items[0] = Number(eq[0]) + Number(eq[2]);
                break;
            case '*':
                monkeys[i].items[0] = Number(eq[0]) * Number(eq[2]);
                break;
        }

        monkeys[i].items[0] = Math.floor(monkeys[i].items[0] / worry);

        if (monkeys[i].items[0] > saviour) {
            monkeys[i].items[0] = monkeys[i].items[0] % saviour;
        }
        //if (monkeys[i].items[0] % saviour == 0)
        //    monkeys[i].items[0] = saviour;

        if (monkeys[i].items[0] % monkeys[i].test == 0) {
            monkeys[monkeys[i].yesCond].items.push(monkeys[i].items[0]);
        }
        else {
            monkeys[monkeys[i].noCond].items.push(monkeys[i].items[0]);
        }
        monkeys[i].items.shift(0);
    }
  }
  return monkeys;
}


function solution1(input){
  let monkeys = handleInput(input);
  let saviour = findSaviour(monkeys);

  for (let round = 0; round < 10000; round++) {
      monkeys = inspect(monkeys,saviour,1);
  }

  return findActiveMonke(monkeys);
}


function findActiveMonke(monkeys) {
  let activeMonkeA = 0, activeMonkeB = 0;
  for (let i = 0; i < monkeys.length; i++) {
      if (activeMonkeA < monkeys[i].inspected) {
          activeMonkeB = activeMonkeA;
          activeMonkeA = monkeys[i].inspected;
      }
      else if (activeMonkeB < monkeys[i].inspected) {
          activeMonkeB = monkeys[i].inspected;
      }
  }
  return activeMonkeA * activeMonkeB;
}

// 21084491736 is too high
// 13937702909

function handleInput(input) {
    const lines = input.split('\n');

    let monkeys = [];
    let split;
    let id;
    let numbers;
    let operation;
    let items = [];
    for (let i = 0; i < lines.length; i++) {
        let splited = lines[i].split(' ');
        switch (lines[i][0]) {
            case 'M':
                // ! BAD PRACITCE
                id = Number(lines[i].split(' ')[1].substr(0, 1));
                break;
            case 'S':
                split = lines[i].split(': ');
                numbers = split[1].split(', ');
                for (let y = 0; y < numbers.length; y++) {
                    items.push(Number(numbers[y]))
                }
                break;
            case 'O':
                operation = lines[i].split(': ')[1].split('= ')[1];
                break;
            case 'T':
                let test = Number(lines[i].split(': ')[1].split(' ')[2]);
                let yesCond = Number(lines[i + 1].split(' ')[7]);
                let noCond = Number(lines[i + 2].split(' ')[7]);
                monkeys.push({ id: id, items: items, operation: operation, test: test, yesCond: yesCond, noCond: noCond, inspected: 0 });
                items = [];
                i = i + 3;
                break;
        }
    }
    return monkeys;
}