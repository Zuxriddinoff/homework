function juftVaToq(arr) {
    let juft = []
    let toq = []
    for (let i = 0; i < arr.length; i++) {
      const son = arr[i];
      switch (son % 2) {
        case 0:
          juft.push(son);
          break;
        case 1:
          toq.push(son);
          break;
      }
    }
    return {juft, toq}
  }
  
  console.log(juftVaToq([1, 2, 3, 4, 5, 6]));