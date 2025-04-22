'use strict'

import { renderComments } from './render.js'
import { updateComments } from './commentsList.js'

export const authorizationURL = 'https://wedev-api.sky.pro/api/user'
export let token = ''

export const setToken = (newToken) => {
    token = newToken
}

export let name = ''

export const setName = (newName) => {
    name = newName
}

export const getComment = () => {
    return fetch('https://wedev-api.sky.pro/api/v2/elena-pelevina/comments', {
        method: 'GET',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Сетевой ответ не в порядке')
            } else if (response.status === 500) {
                throw new Error('Ошибка сервера')
            }
            return response.json()
        })
        .then((data) => {
            console.log(data)
            // document.querySelector('.add-form').style.display = 'flex'
            updateComments(data.comments)
            renderComments()
        })
        .catch((error) => {
            if (error.massage === 'Ошибка сервера') {
                alert(error.message)
            } else {
                alert('Сетевой ответ не в порядке')
            }
            console.error(error.message)
        })
}

export const login = (login, password) => {
    return fetch(authorizationURL + '/login', {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                if (response.status === 400) {
                    alert('Ошибка в логине или пароле!')
                    throw new Error('Неверный логин или пароль')
                } else throw new Error('Ошибка...')
            }
        })
        .catch((error) => {
            if (error.massage === 'Неверный логин или пароль') {
                alert('Ошибка в логине или пароле')
            }
        })
}
