type Phone = {brand: string; model: string; price: number};

const phones: Phone[] = [
    { brand: "Apple", model: "iPhone 15", price: 1200 },
    { brand: "Samsung", model: "Galaxy S24", price: 1100 },
    { brand: "Xiaomi", model: "Mi 13", price: 900 },
    { brand: "OnePlus", model: "12 Pro", price: 950 }
];

function ExpensivePhone(phones: Phone[]): Phone | undefined {
    return phones.reduce((max, phone) => (phone.price > (max?.price ?? 0) ? phone : max), phones[0]);
}

const expensivePhone = ExpensivePhone(phones);
console.log(expensivePhone);