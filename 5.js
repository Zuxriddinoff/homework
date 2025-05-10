function changeElements(arr, index1, index2) {
 
    const yangiArr = arr.slice();
  
    if (
      index1 >= 0 && index1 < yangiArr.length &&
      index2 >= 0 && index2 < yangiArr.length
    ) {
      let temp = yangiArr[index1];
      yangiArr[index1] = yangiArr[index2];
      yangiArr[index2] = temp;
    }
  
    return yangiArr;
  }
  
  console.log(changeElements([1, 2, 3, 4, 5], 1, 3));