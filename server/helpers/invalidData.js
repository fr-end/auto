module.exports = function invalidData(type, form, email){
    var errors = [];
    var text;
    if (type === 'no user'){
        text = 'Нет пользователя с таким ' + email + ' e-mail';
        errors.push(new CustomError(type, text, form))
    } else if (type === 'user already exists') {
        text = 'Пользователь ' + email + ' уже существует. Пожалуйста, войдите в аккаунт.';
        errors.push(new CustomError(type, text, form))
    } else if (type === 'wrong password') {
        text = 'Неверный пароль для пользователя ' +  email;
        errors.push(new CustomError(type, text, form))
    }
    console.log('errors in invalidData func ',errors);
    return errors;
};

function CustomError(type, text, form){
    this.type = type;
    this.text = text;
    this.form = form;
}
