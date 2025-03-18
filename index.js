'use strict'

import { renderComments } from './modules/render.js'
import { addComment } from './modules/eventListeners.js'
import { updateComments } from './modules/commentsList.js'

document.querySelector('.comments').innerHTML =
    'Пожалуйста, подождите. Загружаю комментарии...'

export const getComment = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/elena-pelevina/comments', {
        method: 'GET',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Сетевой ответ не в порядке')
            }
            return response.json()
        })
        .then((data) => {
            console.log(data)

            updateComments(data.comments)
            renderComments()
        })
        .catch((error) => {
            console.error('Возникла проблема с операцией fetch:', error)
        })
}
getComment()
addComment()
