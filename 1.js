function revevreArray(arr){
    let arr2 = []
    for(let i=arr.length-1; i>=0; i--){
        arr2.push(arr[i])
    }
    return arr2
}

console.log(revevreArray([1,2,3,4,5]));
