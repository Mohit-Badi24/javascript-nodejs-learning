/*Task 1 — Create student data

Inside students.json, add three student objects with id, name, and marks.

Task 2 — Read the JSON file

In day3.js:
- Import fs and path.
- Construct the file path using path.join() and __dirname.
- Read the JSON file.
- Convert it using JSON.parse().
- Print the student records.
Task 3 — Add a student

Create a new student object and add it to the array using .push().

Task 4 — Save the updated array

Convert the array using JSON.stringify() and save it back into students.json.

Task 5 — Handle errors

Use try/catch to handle missing files and invalid JSON.*/


const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'students.json');

function loadStudents() {
    const data = fs.readFileSync(filePath, "utf8");
    const result = JSON.parse(data);
    return result.students;
}

function saveStudents(students) {
    const data = JSON.stringify({ students }, null, 2);
    fs.writeFileSync(filePath, data);
}

function addStudent(newStudent) {
    const students = loadStudents();
    const existingStudent = students.find(student => student.id === newStudent.id);
    if (existingStudent) {
        console.log(`Student with id ${newStudent.id} already exists.`);
        return;
    }
    students.push(newStudent);
    saveStudents(students);
}

function updateStudent(id, updatedData) {
    const students = loadStudents();
    const studentIndex = students.findIndex(student => student.id === id);
    if (studentIndex === -1) {
        console.log(`Student with id ${id} not found.`);
        return;
    }
    students[studentIndex] = { ...students[studentIndex], ...updatedData };
    saveStudents(students);
}

function deleteStudent(id) {
    const students = loadStudents();
    const updatedStudents = students.filter(student => student.id !== id);
    saveStudents(updatedStudents);
}

addStudent({ id: 4, name: "John", marks: 85 });

updateStudent(2, 95);

deleteStudent(3);

console.log(loadStudents());
