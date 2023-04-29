export function EmployeeIDValidation(employeeID) {
    let error = "";
    if (!employeeID) {
        error = "Please enter a Employee ID.";
    } else if (!(/^EMP-[0-9]{4}$/.test(employeeID))) {
        error = "Please enter valid Employee ID.";
    } else {
        error = "";
    }
    return error;
};