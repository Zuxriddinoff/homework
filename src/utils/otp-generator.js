import { generate } from "otp-generator";

export const otpGenerator = () => {
    return generate(4, {
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    });
}