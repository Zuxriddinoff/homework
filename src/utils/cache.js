import NodeCache from "node-cache";

const cache = new NodeCache({stdTTL: 300});


export const getCache = (key) => {
    return cache.get(key);
}


export const setCache = (key, value) => {
    const otp = cache.set(key, value);
    console.log(otp);
    
}