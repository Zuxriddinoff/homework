function diapazondagiElementlar(arr, min, max) {
    const yangiArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] >= min && arr[i] <= max) {
        yangiArr.push(arr[i]);
      }
    }
    return yangiArr;
  }
  console.log(diapazondagiElementlar([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, 7));