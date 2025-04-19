'use strict'

import { getComment } from './modules/api.js'

document.querySelector('.comments').innerHTML =
    'Пожалуйста, подождите. Загружаю комментарии...'

const containerLogin = document.querySelector('.add-form')
const loginLinkHtml = `<div style = "display: flex; flex-direction: column; align-items: center; justify-content: center;"><p>Авторизуйтесь, чтобы оставить комментарий </p><button id = "enter" class = "add-form-button">Войти</button></div>`
containerLogin.innerHTML = loginLinkHtml

getComment()
