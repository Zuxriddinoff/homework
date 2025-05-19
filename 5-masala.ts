type Student = {name: string, grade: number, isActive: boolean};

const students: Student[] = [
    { name: "Alice", grade: 85, isActive: true },
    { name: "Bob", grade: 92, isActive: false },
    { name: "Charlie", grade: 78, isActive: true },
    { name: "David", grade: 88, isActive: false }
];


function getActiveStudents(students: Student[]): Student[] {
    return students.filter(student => student.isActive);
}

console.log(getActiveStudents(students));