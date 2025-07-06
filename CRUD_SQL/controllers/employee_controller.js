const express = require('express');
router = express.Router();

const service = require('../services/employee_service');

router.get('/', async(req,res) => {
    const employees = await service.getAllEmployees()
    .catch(err => console.log(err));
res.send(employees);
})

router.get('/:id', async(req,res) => {
    const employee = await service.getEmployeeById(req.params.id)
    if(employee == undefined){
        res.status(404).json('No record with given id : ' + req.params.id)
    } else {
        res.send(employee)
    }
})

router.delete('/:id', async(req,res) => {
    const affectedRows = await service.deleteEmployee(req.params.id)
    if(affectedRows == 0){
        res.status(404).json('No record with given id : ' + req.params.id)
    } else {
        res.send('deleted successfully')
    }
})

router.post('/', async(req,res) => {
    const affectedRows = await service.addOrEditEmployee(req.body)
    res.status(201).send('Created successfully.')
})

router.put('/:id', async(req,res) => {
    const affectedRows = await service.addOrEditEmployee(req.body, req.params.id)
    if(affectedRows == 0){
        res.status(404).json('No record with given id : ' + req.params.id)
    } else {
        res.send('updated successfully')
    }
})

module.exports = router;