import { hash, compare } from "bcrypt";
import { log } from "console";

export const decode =  async(data, salt) => {
    const hashedData = await hash(data, salt);
    
    return hashedData;
}


export const encode = async(data, hashedData) => {
    
    const isMatch = await compare(data, hashedData);
    
    return isMatch;
};