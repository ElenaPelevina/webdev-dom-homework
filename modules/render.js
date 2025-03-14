import { commentsArr } from './commentsList.js'
import { likeComments, doQuote } from './eventListeners.js'
import { replaceQuote } from './replaceFunctions.js'

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

    likeComments()
    doQuote()
}
