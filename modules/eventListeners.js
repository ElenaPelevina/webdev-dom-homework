import { commentsArr } from "./commentsList.js";
import { renderComments } from "./render.js";
import { replaceTag } from "./replaceFunctions.js";

export const likeComments = () => {
    const likeButtons = document.querySelectorAll('.like-button');
   
    for (const likeButton of likeButtons ) {
    const index = likeButton.dataset.index;
    
    likeButton.addEventListener('click', (event) => {
    event.stopPropagation();
    if (commentsArr[index].isLike === false) {
    commentsArr[index].counter += 1 
    commentsArr[index].isLike = true 
   } else { 
    commentsArr[index].counter -= 1 
    commentsArr[index].isLike = false
    }
    renderComments()})
    }
   }

   export const doQuote = () => {
    const commentBodies = document.querySelectorAll('.comment');
    
    for (const commentBody of commentBodies) {
    const info = commentBody.dataset.info
    commentBody.addEventListener('click', () => {
    comment.value = `quote Пользователь ${commentsArr[info].name} сказал:
    "${commentsArr[info].text}" unqoute`
    console.log(`${info} done`)
    renderComments();
    })
    }
    };

    export const addComment = () => {
        const button = document.getElementById('button');
        const input = document.getElementById('input');
        const comment = document.getElementById('comment');
        
    button.addEventListener('click', () => {
      const currentDate = new Date;
      const options = {
            hour: 'numeric', 
            minute: 'numeric'
          };
      const commentDate = currentDate.toLocaleDateString('ru-RU', options);
      input.classList.remove('error');
      comment.classList.remove('error');
    
     if (input.value === "" && comment.value === "") {
     input.classList.add('error');
     comment.classList.add('error');
     return
     } else if (input.value === "") {
     input.classList.add('error');
     return
     } else if (comment.value === "") {
     comment.classList.add('error');
     return
     } 
     const newComment = {name: replaceTag(input.value),
       date: commentDate,
       text: replaceTag(comment.value),
       counter: 0,
       isLike: false
      };
      commentsArr.push(newComment);
       input.value = "";
       comment.value = "";
       renderComments();
       }
    )
    }