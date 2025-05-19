function union(input: boolean | string){
    if(typeof input === 'boolean'){
        return true || false;
    }else{
        return input.length;
    }
}

console.log(union('abdujalil'));
console.log(union(true));