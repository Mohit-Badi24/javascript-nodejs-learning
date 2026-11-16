
const fs = require('fs');
const path = require('path');

const studentsFilePath = path.join(__dirname, 'students.json');

function loadStudents() {
    try {
        if (!fs.existsSync(studentsFilePath)) {
            fs.writeFileSync(studentsFilePath, JSON.stringify({ students: [] }, null, 2));
        }

        const data = fs.readFileSync(studentsFilePath, 'utf8');
        const result = JSON.parse(data);

        if (!result || !Array.isArray(result.students)) {
            throw new Error('Invalid students data.');
        }

        return result.students;
    } catch (error) {
        throw new Error(`Unable to load students: ${error.message}`);
    }
}

function saveStudents(students) {
    try {
        const data = JSON.stringify({ students }, null, 2);
        fs.writeFileSync(studentsFilePath, data);
    } catch (error) {
        throw new Error(`Unable to save students: ${error.message}`);
    }
}

function validateStudentData(student) {
    if (!student || typeof student !== 'object' || Array.isArray(student)) {
        throw new Error('Invalid student data.');
    }

    if (!Number.isInteger(student.id) || student.id <= 0) {
        throw new Error('Student ID must be a positive integer.');
    }

    if (typeof student.name !== 'string' || !student.name.trim()) {
        throw new Error('Student name is required.');
    }

    if (!Number.isInteger(student.age) || student.age <= 0) {
        throw new Error('Age must be a positive integer.');
    }

    if (
        typeof student.marks !== 'number' ||
        !Number.isFinite(student.marks) ||
        student.marks < 0 ||
        student.marks > 100
    ) {
        throw new Error('Marks must be between 0 and 100.');
    }
}

function addStudent(newStudent) {
    const students = loadStudents();

    validateStudentData(newStudent);

    const existingStudent = students.some(student => student.id === newStudent.id);

    if (existingStudent) {
        throw new Error('Student ID already exists.');
    }

    students.push({
        id: newStudent.id,
        name: newStudent.name.trim(),
        age: newStudent.age,
        marks: newStudent.marks
    });

    saveStudents(students);
    console.log('Student added successfully.');
}

function viewStudents() {
    const students = loadStudents();

    if (students.length === 0) {
        console.log('No students found.');
        return;
    }

    console.log('Student Records:');

    students.forEach(student => {
        console.log(`ID: ${student.id}, Name: ${student.name}, Age: ${student.age}, Marks: ${student.marks}`);
    });
}

function searchStudent(searchValue) {
    const students = loadStudents();
    let foundStudents;

    if (typeof searchValue === 'number') {
        const student = students.find(student => student.id === searchValue);
        foundStudents = student ? [student] : [];
    } else if (typeof searchValue === 'string' && searchValue.trim()) {
        foundStudents = students.filter(
            student => student.name.toLowerCase() === searchValue.trim().toLowerCase()
        );
    } else {
        throw new Error('Enter a valid student ID or name.');
    }

    if (foundStudents.length === 0) {
        console.log('Student not found.');
        return;
    }

    foundStudents.forEach(student => {
        console.log(student);
    });
}

function updateStudent(id, updatedData) {
    const students = loadStudents();

    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        console.log('Student ID not found.');
        return;
    }

    const updatedStudent = {
        ...students[studentIndex],
        ...updatedData
    };

    validateStudentData(updatedStudent);

    students[studentIndex] = {
        id: updatedStudent.id,
        name: updatedStudent.name.trim(),
        age: updatedStudent.age,
        marks: updatedStudent.marks
    };

    saveStudents(students);
    console.log('Student updated successfully.');
}

function deleteStudent(id) {
    const students = loadStudents();

    const existingStudent = students.some(student => student.id === id);

    if (!existingStudent) {
        console.log('Student ID not found.');
        return;
    }

    const updatedStudents = students.filter(student => student.id !== id);

    saveStudents(updatedStudents);
    console.log('Student deleted successfully.');
}

try {
    addStudent({ id: 1, name: 'Rahul', age: 21, marks: 85 });
    addStudent({ id: 2, name: 'Priya', age: 22, marks: 92 });

    viewStudents();

    searchStudent(1);
    searchStudent('Priya');

    updateStudent(1, { marks: 95 });

    deleteStudent(2);

    console.log('Final Student Records:');
    viewStudents();

} catch (error) {
    console.log('Error:', error.message);
}
