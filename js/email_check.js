var fields = {};

document.addEventListener("DOMContentLoaded", function () {
    fields.fullName = document.getElementById('fullName');
    fields.emailAddress = document.getElementById('emailAddress');
    fields.subject = document.getElementById('subject');
    fields.message = document.getElementById('message');
})


function isNotEmpty(value) {
    if (value == null || typeof value == 'undefined') return false;
    return (value.length > 0);
}

function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
}

function fieldValidation(field, validationFunction) {
    if (field == null) return false;

    let isFieldValid = validationFunction(field.value);
    if (!isFieldValid) {
        field.className = 'placeholderRed';
    } else {
        field.className = '';
    }

    return isFieldValid;
}

function isValid() {
    var valid = true;

    valid &= fieldValidation(fields.fullName, isNotEmpty);
    valid &= fieldValidation(fields.emailAddress, isNotEmpty);
    valid &= fieldValidation(fields.subject, isNotEmpty);
    valid &= fieldValidation(fields.message, isNotEmpty);

    return valid;
}

function validateFields() {
    if (isValid()) {
        return true;
    }
    else {
        alert("Please correctly fill in all the remaining fields.")
    }
}