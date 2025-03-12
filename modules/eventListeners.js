import { commentsArr, updateComments } from './commentsList.js'
import { renderComments } from './render.js'
import { replaceTag } from './replaceFunctions.js'

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
        //const currentDate = new Date()
        //const options = {
        //     hour: 'numeric',
        //     minute: 'numeric',
        //     day: 'numeric',
        //     month: 'numeric',
        //     year: '2-digit',
        // }
        //const commentDate = currentDate.toLocaleDateString('ru-RU', options)
        input.classList.remove('error')
        comment.classList.remove('error')

        if (input.value === '' && comment.value === '') {
            input.classList.add('error')
            comment.classList.add('error')
            return
        } else if (input.value === '') {
            input.classList.add('error')
            return
        } else if (comment.value === '') {
            comment.classList.add('error')
            return
        }
        // const newComment = {
        //     author: { name: replaceTag(input.value)},
        //     id: index,
        //     date: commentDate,
        //     likes: 0,
        //     isLiked: false,
        //     text: replaceTag(comment.value),
        // }
        const newComment = {
            text: replaceTag(comment.value),
            name: replaceTag(input.value),
        }

        fetch('https://wedev-api.sky.pro/api/v1/elena-pelevina/comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                updateComments(data.comments)
                renderComments()
            })
        //commentsArr.push(newComment)
        input.value = ''
        comment.value = ''
        //renderComments()
    })
}
