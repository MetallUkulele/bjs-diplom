'use strict'

let userForm = new UserForm();
userForm.loginFormCallback = data => 
  ApiConnector.login (data, response => {
    console.log (response);
    
    if (response.success === false) {
      return userForm.setLoginErrorMessage(`Ошибка логина: ${data.login} или пароля: ${data.password}`)
    } else if (response.success === true) {
      return userForm.loginFormAction(location.reload());
    }
  })

userForm.registerFormCallback = data => ApiConnector.register(data, response => {
  if (response.success === false) {
    return userForm.setRegisterErrorMessage(`Ошибка регистрации, пользователь с логином ${data.login} существует`)
  } else if (response.success === true) {
    return userForm.registerFormAction(location.reload());
  }
})