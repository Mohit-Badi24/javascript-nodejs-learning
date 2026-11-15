
// ==================================================
// DAY 1 ASSIGNMENT: STUDENT DATA MANAGEMENT SYSTEM
// ==================================================


// TASK 1: CREATE STUDENT DATA
// Create an array containing 20 student objects.
// Each student object must contain:
// - name
// - age
// - marks

let students = [
    { name: "Rahul", age: 21, marks: 85 },
    { name: "Mohit", age: 22, marks: 92 },
    { name: "Priya", age: 20, marks: 67 },
    { name: "Amit", age: 23, marks: 74 },
    { name: "Sneha", age: 21, marks: 89 },
    { name: "Karan", age: 22, marks: 56 },
    { name: "Neha", age: 20, marks: 95 },
    { name: "Arjun", age: 21, marks: 72 },
    { name: "Pooja", age: 22, marks: 81 },
    { name: "Vikas", age: 23, marks: 63 },
    { name: "Anjali", age: 20, marks: 91 },
    { name: "Rohit", age: 21, marks: 78 },
    { name: "Kavya", age: 22, marks: 69 },
    { name: "Suresh", age: 23, marks: 88 },
    { name: "Divya", age: 20, marks: 76 },
    { name: "Manish", age: 21, marks: 54 },
    { name: "Isha", age: 22, marks: 97 },
    { name: "Varun", age: 23, marks: 83 },
    { name: "Meera", age: 20, marks: 71 },
    { name: "Ajay", age: 21, marks: 60 }
];


// TASK 2: DISPLAY ALL STUDENTS
// Display all 20 student records in the terminal.
// Use console.log().
console.log(students);

// TASK 3: FILTER STUDENTS
// Filter students who scored more than 70 marks.
// Use the filter() method.
// Store the result in a new variable.
// Display the filtered students.
console.log("Students who scored more than 70 marks:");
let s1 = students.filter(student => student.marks > 70);
console.log(s1);


// TASK 4: FIND HIGHEST-SCORING STUDENT
// Find the student who scored the highest marks.
// Use the reduce() method.
// Display the student's name and marks.
console.log("Highest-scoring student:");
let highestStudent = students.reduce((max, student) => (student.marks > max.marks ? student : max));
console.log(`Name: ${highestStudent.name}, Marks: ${highestStudent.marks}`);


// TASK 5: CALCULATE AVERAGE MARKS
// Calculate the average marks of all students.
// Use the reduce() method to calculate the total marks.
// Divide the total by the number of students.
// Display the average marks.
console.log("Average marks of all students:");
let totalMarks = students.reduce((total, student) => total + student.marks, 0);
let averageMarks = totalMarks / students.length;
console.log(averageMarks);

// TASK 6: SORT STUDENTS
// Sort all students according to their marks.
// Arrange them in descending order (highest to lowest).
// Use the sort() method.
// Display the sorted student records.
console.log("Students sorted by marks (highest to lowest):");
let sortedStudents = students.sort((a, b) => b.marks - a.marks);
console.log(sortedStudents);

// TASK 7: SEARCH STUDENT BY NAME
// Search for a student using their name.
// Use the find() method.
// If the student exists, display their details.
// Otherwise, display "Student not found".
console.log("Search for a student by name:");
let searchName = "Neha";    
let foundStudent = students.find(student => student.name === searchName);
if (foundStudent) {
    console.log("Student found:");
    console.log(foundStudent);
} else {
    console.log("Student not found");
}

// TASK 8: DISPLAY STUDENT NAMES
// Extract only the names of all students.
// Use the map() method.
// Store the result in a new array.
// Display the names.
console.log("Student names:");
let studentNames = students.map(student => student.name);
console.log(studentNames);


// ==================================================
// END OF ASSIGNMENT
// ==================================================