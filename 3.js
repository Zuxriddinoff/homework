function search(arr, element) {
    for(let i=0; i<arr.length; i++){
       if( arr[i]===element){
           return i
       }
    }
}
console.log(search([10, 20, 30, 40, 50], 50)); 