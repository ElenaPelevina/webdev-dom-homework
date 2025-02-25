import { commentsArr } from './commentsList.js'
import { likeComments, doQuote } from './eventlisteners.js'
import { replaceQuote } from './replaceFunctions.js'

export const renderComments = () => {
    const commentsList = document.getElementById('comments')
    const commentsHtml = commentsArr
        .map((comment, index) => {
            return `<li data-info = "${index}"  class = "comment">
         <div class = "comment-header">
           <div>${comment.name}</div>
           <div>${comment.date}</div>
         </div>
         <div class = "comment-body">
           <div class = "comment-text">
             ${replaceQuote(comment.text)}
           </div>
         </div>
         <div class = "comment-footer">
           <div class = "likes">
             <span class = "likes-counter">${comment.counter}</span>
             <button class = "like-button ${comment.isLike ? '-active-like' : ''}" data-index = "${index}"></button>
           </div>
         </div>
       </li>`
        })
        .join('')
    commentsList.innerHTML = commentsHtml

    likeComments()
    doQuote()
}
