const express = require('express')
const router = express.Router()
const { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee } = require('../../controllers/employeeControllers')


router.route('/')
    .get(getAllEmployees)
    .post(createNewEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee)

router.route('/:id')
    .get(getEmployee)

module.exports = router