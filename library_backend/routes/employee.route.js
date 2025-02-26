const express = require("express");
const employeeControllers = require("../controllers/employee.controller") ;

const router = express.Router();

router.route("/")
    .get(employeeControllers.getEmployees)
    .post(employeeControllers.addEmployee)
    .delete(employeeControllers.deleteAllEmployees)

router.route("/:employeeId")
    .get(employeeControllers.getEmployee)
    .put(employeeControllers.updateEmployee)
    .delete(employeeControllers.deleteEmployee)

module.exports = router;