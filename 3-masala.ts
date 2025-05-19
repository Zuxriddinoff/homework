function login(username: string, loginTime: Date, isLoggedIn: boolean){
    console.log(`${username}, ${loginTime}, ${isLoggedIn}`);
    if(isLoggedIn === true){
        console.log('Tizimga kirgan');
    } else{
        console.log('Tizimga kirmagan');
    }
    
}

login('Azizbek', new Date(), false);
login('Toshmat', new Date(), true);