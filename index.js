const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

var students = [
    {id : 1, name : "student 1"},
    {id : 2, name : "student 2"},
    {id : 3, name : "student 3"}
];

app.get('/api/students', (req,res)=>{
    res.send(students);
});

app.get('/api/students/:id', (req,res)=>{
    let student = students.find(s => s.id === parseInt(req.params.id))
    if(!student)
        return res.status(404).send('Student with this id is not found');
    res.send(student);
});

app.post('/api/students', (req,res)=>{
    let student = {
        id : students.length + 1,
        name : req.body.name
    }
    students.push(student);
    res.send(student);
});

app.listen(port, () => console.log(`Server on ${port}...`));
