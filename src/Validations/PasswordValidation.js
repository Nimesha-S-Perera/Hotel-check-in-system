export function PasswordValidation(password) {
    let error = "";
    if (!password) {
        error = "Please enter a password.";
    } else {
        error = "";
    }
    return error;
};