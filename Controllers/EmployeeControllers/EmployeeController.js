require("../../Database/dbConfig");
const employeeModal = require("../../Models/EmployeeModals/EmployeeModal");

const createEmployee = async (user) => {
  console.log(user);
  const result = await employeeModal.create(user);
  return result;
};
const isEmployeeLoggedin = async (user) => {
  console.log(user);
  const employee = await employeeModal.findOne(user);
  return employee;
};

module.exports = {
  createEmployee,
  isEmployeeLoggedin,
};
