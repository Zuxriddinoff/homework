function engKattaElement(arr) {
    if (arr.length === 0) return undefined;
  
    let engKatta = arr[0]; 
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > engKatta) {
        engKatta = arr[i];
      }
    }
    return engKatta;
  }
  console.log(engKattaElement([10, 5, 8, 12, 3]));