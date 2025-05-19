function names(ism: string | null | undefined){
    if (typeof ism === 'string') {
        console.log(ism);
    } else {
        console.log("Mehmon");
    }
}

names("Ali");
names(null);