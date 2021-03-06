const express = require('express');
const Joi = require('joi');
const router = express.Router()

var students = [
    {id : 1, name : "student 1"},
    {id : 2, name : "student 2"},
    {id : 3, name : "student 3"}
];

router.get('', (req,res)=>{
    res.send(students);
});

router.get('/:id', (req,res)=>{
    let student = students.find(s => s.id === parseInt(req.params.id))
    if(!student)
        return res.status(404).send('Student with this id is not found');
    res.send(student);
});



const validation_schema = {
    name : Joi.string().max(50).min(3).required()
}
router.post('', (req,res)=>{
    // if(!req.body.name || req.body.name.length < 3)
    //     return res.status(400).send('Student name must exist with at least 3 charcters long.')
    let validation_result = Joi.validate(req.body, validation_schema);
    if(validation_result.error)
        return res.status(400).send(validation_result.error.details[0].message);
    let student = {
        id : students.length + 1,
        name : req.body.name
    }
    students.push(student);
    res.send(student);
});

router.put('/:id', (req,res)=>{
    let student = students.find(s => s.id === parseInt(req.params.id))
    if(!student)
        return res.status(404).send('Student with this id is not found');
    let validation_result = Joi.validate(req.body, validation_schema);
    if(validation_result.error)
        return res.status(400).send(validation_result.error.details[0].message);
    student.name = req.body.name;

    res.send(student);
});

router.delete('/:id', (req,res)=>{
    let student = students.find(s => s.id === parseInt(req.params.id))
    if(!student)
        return res.status(404).send('Student with this id is not found');
    students = students.filter(s => s.id !== parseInt(req.params.id))
    res.send(student);
});

module.exports=router;