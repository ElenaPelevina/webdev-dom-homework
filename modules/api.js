'use strict'

import { renderComments } from './render.js'
import { updateComments } from './commentsList.js'

export const getComment = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/elena-pelevina/comments', {
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
            document.querySelector('.add-form').style.display = 'flex'
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
