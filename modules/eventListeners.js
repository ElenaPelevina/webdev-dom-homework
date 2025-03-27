import { commentsArr } from './commentsList.js'
import { renderComments } from './render.js'
import { replaceTag } from './replaceFunctions.js'
import { getComment } from '../index.js'

export const likeComments = () => {
    const likeButtons = document.querySelectorAll('.like-button')

    for (const likeButton of likeButtons) {
        const index = likeButton.dataset.index

        likeButton.addEventListener('click', (event) => {
            event.stopPropagation()
            if (commentsArr[index].isLiked === false) {
                commentsArr[index].likes += 1
                commentsArr[index].isLiked = true
            } else {
                commentsArr[index].likes -= 1
                commentsArr[index].isLiked = false
            }
            renderComments()
        })
    }
}

export const doQuote = () => {
    const commentBodies = document.querySelectorAll('.comment')
    const comment = document.getElementById('comment')

    for (const commentBody of commentBodies) {
        const info = commentBody.dataset.info
        commentBody.addEventListener('click', () => {
            comment.value = `quote Пользователь ${commentsArr[info].author.name} сказал:
    "${commentsArr[info].text}" unqoute`
            console.log(`${info} done`)
            renderComments()
        })
    }
}

export const addComment = () => {
    const button = document.getElementById('button')
    const input = document.getElementById('input')
    const comment = document.getElementById('comment')

    button.addEventListener('click', () => {
        input.classList.remove('error')
        comment.classList.remove('error')
        document.querySelector('.add-form').style.display = 'none'
        const newText = document.createElement('p')
        document.getElementById('comments').append(newText)
        newText.textContent = 'Загружаю комментарий...'
        newText.style.textAlign = 'center'

        const newComment = {
            text: replaceTag(comment.value),
            name: replaceTag(input.value),
        }

        fetch('https://wedev-api.sky.pro/api/v1/elena-pelevina/comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
        })
            .then((response) => {
                if (response.status === 201) {
                    input.value = ''
                    comment.value = ''
                    return getComment()
                } else {
                    if (response.status === 500) {
                        throw new Error('Ошибка сервера')
                    } else if (response.status === 400) {
                        throw new Error('Ошибка ввода данных')
                    }
                }
            })
            .catch((error) => {
                if (error.message === 'Ошибка сервера') {
                    newText.hidden = true
                    document.querySelector('.add-form').style.display = 'flex'
                    alert(error.message)
                } else if (
                    error.message === 'Ошибка ввода данных' &&
                    input.value === '' &&
                    comment.value === ''
                ) {
                    newText.hidden = true
                    document.querySelector('.add-form').style.display = 'flex'
                    input.classList.add('error')
                    comment.classList.add('error')
                    alert('Не заполнены поля ввода имени и комментария')
                } else if (
                    error.message === 'Ошибка ввода данных' &&
                    input.value === ''
                ) {
                    newText.hidden = true
                    document.querySelector('.add-form').style.display = 'flex'
                    input.classList.add('error')
                    alert('Не заполнено поля ввода имени')
                } else if (
                    error.message === 'Ошибка ввода данных' &&
                    comment.value === ''
                ) {
                    newText.hidden = true
                    document.querySelector('.add-form').style.display = 'flex'
                    comment.classList.add('error')
                    alert('Не заполнено поле ввода комментария')
                } else if (
                    error.message === 'Ошибка ввода данных' &&
                    input.value.length < 3 &&
                    comment.value.length < 3
                ) {
                    newText.hidden = true
                    document.querySelector('.add-form').style.display = 'flex'
                    input.classList.add('error')
                    comment.classList.add('error')
                    alert(
                        'Длинна имени и комментария должна содержать хотя бы 3 символа',
                    )
                } else if (
                    error.message === 'Ошибка ввода данных' &&
                    comment.value.length < 3
                ) {
                    newText.hidden = true
                    document.querySelector('.add-form').style.display = 'flex'
                    comment.classList.add('error')
                    alert(
                        'Длинна комментария должна содержать хотя бы 3 символа',
                    )
                } else if (
                    error.message === 'Ошибка ввода данных' &&
                    input.value.length < 3
                ) {
                    newText.hidden = true
                    document.querySelector('.add-form').style.display = 'flex'
                    input.classList.add('error')
                    alert('Длинна имени должна содержать хотя бы 3 символа')
                } else {
                    newText.hidden = true
                    document.querySelector('.add-form').style.display = 'flex'
                    alert('Кажется, у вас сломался интернет, попробуйте позже')
                }
            })
    })
}
