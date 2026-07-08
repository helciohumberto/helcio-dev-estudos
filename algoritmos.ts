function fizzBuzz(n: number): (string | number)[] {
  const resultado: (string | number)[] = [];

  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      resultado.push("FizzBuzz");
    } else if (i % 3 === 0) {
      resultado.push("Fizz");
    } else if (i % 5 === 0) {
      resultado.push("Buzz");
    } else {
      resultado.push(i);
    }
  }

  return resultado;
}
console.log(fizzBuzz(15));

function twoSum(nums: number[], alvo: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === alvo) {
        return [i, j];
      }
    }
  }
  return [];
}
console.log(twoSum([2, 7, 11, 15], 9)); // deve dar [0, 1]
console.log(twoSum([3, 2, 4], 6)); // deve dar [1, 2]

function contarLetras(str: string): Record<string, number> {
  const contagem: Record<string, number> = {};

  for (const letra of str) {
    if (contagem[letra]) {
      // a letra já existe — incrementa
      contagem[letra] = contagem[letra] + 1;
    } else {
      // a letra não existe ainda — começa em 1
      contagem[letra] = 1;
    }
  }

  return contagem;
}

console.log(contarLetras("banana"))
