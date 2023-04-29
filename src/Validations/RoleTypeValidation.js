export function RoleTypeValidation(role) {
    let error = "";
    if (!role) {
        error = "Please select role type.";
    } else {
        error = "";
    }
    return error;
};