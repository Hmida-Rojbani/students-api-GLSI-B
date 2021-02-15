const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

var students = [
    {id : 1, name : "student 1"},
    {id : 2, name : "student 2"},
    {id : 3, name : "student 3"}
];

app.get('/api/students', (req,res)=>{
    res.send(students);
});

app.listen(port, () => console.log(`Server on ${port}...`))
