const Employee = require('../models/employee.model');

const getEmployees = async (req, res) => {
  try {
      const employees = await Employee.find();
      res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      employeeId: req.params.employeeId,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee does not exist!" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEmployee = async (req, res) => {
  try {
      const newEmployee = await Employee.create(req.body);
      res.status(201).json({message: "New employee has been added successfully!", data: newEmployee});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { employeeId: req.params.employeeId },
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee does not exist!" });
    }
    res.status(200).json({ message: `Employee has been updated successfully!`, data: updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findOneAndDelete({
      employeeId: req.params.employeeId,
    });
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee does not exist!" });
    }
    res
      .status(200)
      .json({ message: `Deleted employee: ${deletedEmployee.fullName}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllEmployees = async (req, res) => {
  try {
    await Employee.deleteMany({});
    res.status(200).json({ message: "All employees has been deleted!" });
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  deleteAllEmployees,
}