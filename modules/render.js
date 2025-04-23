import { commentsArr } from './commentsList.js'
import { likeComments, doQuote } from './eventListeners.js'
import { replaceQuote } from './replaceFunctions.js'
import { token, setToken, getComment, setName, name } from './api.js'
import { addComment } from './eventListeners.js'
import { login } from './api.js'

export const renderComments = () => {
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: '2-digit',
    }
    const commentsList = document.getElementById('comments')
    const commentsHtml = commentsArr
        .map((comment, index) => {
            return `<li data-info = "${index}"  class = "comment">
         <div class = "comment-header">
           <div>${comment.author.name}</div>
           <div>${new Date(Date.parse(comment.date)).toLocaleDateString(
               'ru-RU',
               options,
           )}</div>
         </div>
         <div class = "comment-body">
           <div class = "comment-text">
             ${replaceQuote(comment.text)}
           </div>
         </div>
         <div class = "comment-footer">
           <div class = "likes">
             <span class = "likes-counter">${comment.likes}</span>
             <button class = "like-button ${comment.isLiked ? '-active-like' : ''}" data-index = "${index}"></button>
           </div>
         </div>
       </li>`
        })
        .join('')
    commentsList.innerHTML = commentsHtml

    const addCommentForm = `
      <input
          id='input'
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          readonly
          value = '${name}'
        />
        <textarea
          id="comment"
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="button" class="add-form-button">Написать</button>
        </div>
    `

    const loginLinkHtml = `<div style = "display: flex; flex-direction: column; align-items: center; justify-content: center;"><p>Авторизуйтесь, чтобы оставить комментарий </p><button id = "enter" class = "add-form-button">Войти</button></div>`

    const renderLogin = () => {
        const containerLogin = document.querySelector('.add-form')
        const loginHtml = `
    
          <input
          style = "align-self: center"
            id='login'
            type="text"
            class="add-form-name"
            placeholder="Введите Ваш логин"
            reguired
          /><br>
          <input
          style = "align-self: center"
            id='password'
            type="text"
            class="add-form-name"
            placeholder="Введите Ваш пароль"
            reguired
          />
          <button id = "enterButton" class = "add-form-button">Войти</button>
          <button class = "add-form-button">Зарегистрироваться</button>
          
          `
        containerLogin.innerHTML = loginHtml
        const loginEl = document.getElementById('login')
        const password = document.getElementById('password')
        const buttonEnter = document.getElementById('enterButton')

        buttonEnter.addEventListener('click', () => {
            login(loginEl.value, password.value).then((data) => {
                setToken(data.user.token)
                setName(data.user.name)
                getComment()
            })
        })
    }

    const mainContainer = document.querySelector('.container')
    mainContainer.innerHTML = `<ul id='comments' class="comments">${commentsHtml} </ul>
     <div class="add-form">${token ? addCommentForm : loginLinkHtml}</div>`

    if (token) {
        likeComments()
        doQuote()
        addComment()
    } else {
        const buttonEnter = document.getElementById('enter')
        buttonEnter.addEventListener('click', () => {
            document.querySelector('.comments').style.display = 'none'
            renderLogin()
        })
    }
}
