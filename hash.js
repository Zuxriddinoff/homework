function hashPassword(password) {
    let hash = "";
  
    for (let i = 0; i < password.length; i++) {
      const charCode = password.charCodeAt(i);
      const mixed = (charCode * (i + 1) + 13) % 256; // i + 1 bo'lishi kerak, 0 bo'lsa 0ga ko'payib ketadi
      hash += mixed.toString(16).padStart(2, "0"); // Hex format, 2 raqamdan kam bo'lmasin
    }
  
    return hash;
  }
  

  function comparePassword(inputPassword, hashedPassword) {
    const inputHashed = hashPassword(inputPassword);
    return inputHashed === hashedPassword;
  }

const plain = "hello124";
const hashed = hashPassword(plain);

console.log("Original:", plain);
console.log("Hashed:  ", hashed);

// Tekshirib ko'ramiz
console.log("To'g'ri keldimi:", comparePassword("hello123", hashed)); // true
console.log("Xato parol bilan:", comparePassword("hello124", hashed)); // false
