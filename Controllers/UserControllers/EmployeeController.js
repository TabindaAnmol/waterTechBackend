require("../../Database/dbConfig");
const employeeModal = require("../../Models/UserModals/EmployeeModal");

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
const viewAllEmployeesWithStatus = async (status) => {
  const result = await employeeModal.find({ status: status });
  return await result;
};
const updateEmployeeProfile = async (updatedUser) => {
  const result = await employeeModal.updateOne(
    { _id: updatedUser._id },
    { $set: updatedUser }
  );
  console.log(result);
  console.log(result.acknowledged);
  console.log(result.modifiedCount);
  return result.modifiedCount;
};
module.exports = {
  createEmployee,
  isEmployeeLoggedin,
  viewAllEmployeesWithStatus,
  updateEmployeeProfile,
};
