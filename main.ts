// 1. Interface va Class

interface Vehicle {
    brand: string,
    model: string,
    year: number,
    start(): void
}

class Car implements Vehicle {
    brand: string;
    model: string;
    year: number;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    start(): void {
        console.log(`${this.brand} ${this.model} (${this.year}) is starting...`);
    }
}

const car1 = new Car("Mercedez Benz", "cls 6.3", 2020);
const car2 = new Car("BMW", "X8", 2022);
const car3 = new Car("Chevrolet", "Malibu", 2018);

car1.start();
car2.start();
car3.start();



// 2. Enum

// enum UserRole {
//     ADMIN,
//     EDITOR,
//     VIEWER
// }

// function canEdit(role: UserRole): boolean {
//     return role === UserRole.ADMIN || role === UserRole.EDITOR;
// }

// function canDelete(role: UserRole): boolean {
//     return role === UserRole.ADMIN;
// }

// function checkPermissions(role: UserRole): void {
//     console.log(`Role: ${UserRole[role]}`);
//     console.log(`Can Edit: ${canEdit(role)}`);
//     console.log(`Can Delete: ${canDelete(role)}`);
//     console.log('-------------------');
// }

// checkPermissions(UserRole.ADMIN);
// checkPermissions(UserRole.EDITOR);
// checkPermissions(UserRole.VIEWER);



// 3. Generic

// function identity<T>(value: T): T {
//     return value;
// }

// console.log(identity<number>(0));
// console.log(identity<string>("str"));
// console.log(identity<object>({}));

// class Stack<T> {
//     values: T[] = [];

//     push(value: T): void {
//         this.values.push(value);
//     }

//     pop(): T | undefined {
//         return this.values.pop();
//     }
// }



// 4. OOP(Class, readonly, public, private, protected, static, getter, setter)

// class BankAccount {
//     readonly accountNumber: string;
//     public ownerName: string;
//     private balance: number;
//     static bankName: string = 'NBU';

//     constructor(accountNumber: string, ownerName: string, balance: number) {
//         this.accountNumber = accountNumber;
//         this.ownerName = ownerName;
//         this.balance = balance;
//     }

//     getBalance() {
//         console.log(this.balance);
//     }

//     deposit(amount: number) {
//         this.balance += amount;
//     }

//     withdraw(amount: number) {
//         this.balance -= amount;
//     }

//     getName() {
//         console.log(this.ownerName);
//     }

//     setName(name: string) {
//         this.ownerName = name;
//     }
// };



// 5. Abstract class & method

// abstract class Shape {
//     abstract getArea(): number;
// }

// class Circle extends Shape {
//     radius: number;

//     constructor(radius: number) {
//         super()
//         this.radius = radius;
//     }

//     getArea(): number {
//         return 22 / 7 * (this.radius ** 2)
//     }
// }

// class Rectangle extends Shape {
//     width: number;
//     height: number;

//     constructor(width: number, height: number) {
//         super();
//         this.width = width;
//         this.height = height;
//     }

//     getArea(): number {
//         return this.width * this.height;
//     }
// }



// 6. Utility Types

// interface Product {
//     id: number;
//     name: string;
//     price: number;
//     description?: string;
// }

// function updateProduct(product: Product, updates: Partial<Pick<Product, "name" | "price">>): Product {
//     return { ...product, ...updates };
// }

// const product2: Pick<Product, "id" | "name"> = { id: 2, name: "second" }
// const product3: Readonly<Product> = {
//     id: 3,
//     name: "third",
//     price: 3
// }

// // product3.description = ""