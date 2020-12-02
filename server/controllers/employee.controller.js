const EmployeeCtrl = {};
const Employee = require('../models/employee')

// Get employees
EmployeeCtrl.getEmployees = async ( req, res) => {
    
        const employees = await Employee.find();
        res.json(employees)      
}

// Create employee
EmployeeCtrl.createEmployee = async ( req, res) => {

    const employee = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    await employee.save();
    res.json({
        status: 'Employee saved'
    })
}

// Get employee by id

EmployeeCtrl.getEmployee = async ( req, res) => {

   const employee = await Employee.findById(req.params.id);
   res.json(employee);

}

// Edit employee by id

EmployeeCtrl.editEmployee = async ( req, res) => {

    const { id } = req.params;
    const employee = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    }

    await Employee.findByIdAndUpdate(id, {$set: employee}, {new: true});
    res.json({
        status: 'Updated'
    })

}

// Delete employee by id

EmployeeCtrl.deleteEmployee = async ( req, res) => {

    await Employee.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Employee was deleted'
    })

}

module.exports = EmployeeCtrl;