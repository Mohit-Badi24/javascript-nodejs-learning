const http = require('http');
const fs = require('fs');
const path = require('path');

function loadStudents() {
    try {
        const filePath = path.join(__dirname, 'students.json');
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error loading students:', error);
        return [];
    }
}

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, World!');
    } else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is the about page.');
    }else if (req.url === '/students' && req.method === 'GET') {
        const students = loadStudents();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(students));
    } else if (req.url.startsWith('/students/') && req.method === 'GET') {
        const urlParts = req.url.split('/');
        if (urlParts.length !== 3) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid URL.');
            return;
        }
        const id = urlParts[2];
        const studentId = Number(id);
        if (!Number.isInteger(studentId) || studentId <= 0) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid student ID.');
            return;
        }
        const student = getStudentById(studentId);
        if (student) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(student));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Student not found.');
        }
    } else if (req.url.startsWith('/students') && req.method === 'GET') {
        const url = new URL(req.url, "http://localhost:3000");
        const nameQuery = url.searchParams.get('name');
        if (nameQuery) {
            const students = loadStudents();
            const filteredStudents = students.filter(student => 
                student.name.toLowerCase().includes(nameQuery.toLowerCase())
            );
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(filteredStudents));
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid request.');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found.');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})

function getStudentById(id) {
    const students = loadStudents();
    const student = students.find(student => student.id === id);
    return student;
}

